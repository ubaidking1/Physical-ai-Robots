import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import logging

from qdrant_client import QdrantClient, models

# Set up basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()
logger.info("Attempting to load environment variables.")

# Get the API key from the environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Check if the API key is available
if not GEMINI_API_KEY or GEMINI_API_KEY == "YOUR_GEMINI_API_KEY":
    logger.error("GEMINI_API_KEY not found or is set to the placeholder value.")
    model = None
    embedding_model = None
else:
    logger.info("GEMINI_API_KEY loaded successfully.")
    # Configure the generative AI model
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        embedding_model = "models/embedding-001" # Gemini Embedding model
        logger.info("Google AI Studio models configured successfully.")
    except Exception as e:
        logger.error(f"Error configuring Google AI Studio: {e}")
        model = None
        embedding_model = None

app = FastAPI()

# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Qdrant Client (in-memory for demonstration)
qdrant_client = QdrantClient(":memory:")
COLLECTION_NAME = "rag_knowledge_base"

# Placeholder for documents - In a real RAG system, these would come from a database or files
DOCUMENTS = [
    {"id": 0, "text": "The Physical AI and Humanoid Robotics Textbook covers ROS 2 fundamentals.", "source": "textbook"},
    {"id": 1, "text": "Humanoid robotics involves mechanical design, actuators, sensors, and control systems.", "source": "textbook"},
    {"id": 2, "text": "ROS 2 is an industry-standard framework for robot software development.", "source": "textbook"},
    {"id": 3, "text": "Digital Twin simulation uses tools like Gazebo and Isaac Sim to test robots in virtual environments.", "source": "textbook"},
    {"id": 4, "text": "Vision-Language-Action systems build AI models that understand vision, language, and generate actions.", "source": "textbook"},
    {"id": 5, "text": "The Capstone Project integrates all concepts to build a complete AI-robot pipeline.", "source": "textbook"},
    {"id": 6, "text": "Gemini is a family of multimodal large language models developed by Google AI.", "source": "Gemini docs"},
    {"id": 7, "text": "RAG stands for Retrieval Augmented Generation, a technique that enhances LLMs with external knowledge.", "source": "AI Glossary"},
]

async def create_embeddings(texts: list[str]):
    """Generates embeddings for a list of texts using the Gemini embedding model."""
    if not embedding_model:
        raise Exception("Embedding model not configured.")
    
    try:
        response = await genai.embed_content_async(
            model=embedding_model,
            content=texts,
            task_type="RETRIEVAL_DOCUMENT"
        )
        return [item['embedding'] for item in response['embedding']]
    except Exception as e:
        logger.error(f"Error generating embeddings: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate embeddings.")

async def initialize_qdrant():
    """Initializes Qdrant collection and ingests documents."""
    logger.info("Initializing Qdrant collection and ingesting documents.")
    
    # Create collection if it doesn't exist
    qdrant_client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE), # Gemini embeddings are 768 dim
    )

    texts = [doc["text"] for doc in DOCUMENTS]
    
    try:
        embeddings = await create_embeddings(texts)
    except Exception as e:
        logger.error(f"Failed to create embeddings for initial documents: {e}")
        return # Skip ingestion if embeddings fail

    points = [
        models.PointStruct(id=doc["id"], vector=embedding, payload=doc)
        for doc, embedding in zip(DOCUMENTS, embeddings)
    ]
    
    qdrant_client.upsert(
        collection_name=COLLECTION_NAME,
        wait=True,
        points=points,
    )
    logger.info(f"Ingested {len(DOCUMENTS)} documents into Qdrant collection '{COLLECTION_NAME}'.")

# Initialize Qdrant on startup
@app.on_event("startup")
async def startup_event():
    await initialize_qdrant()

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def rag_chat_endpoint(req: ChatRequest):
    """
    Handles RAG chat requests: retrieves relevant context and generates a response.
    """
    logger.info(f"Received RAG chat request with message: {req.message}")

    if not model or not embedding_model:
        logger.error("Backend is not configured with valid Gemini models.")
        raise HTTPException(status_code=500, detail="The server is not configured with valid AI models.")

    try:
        # 1. Retrieval
        query_embedding = (await create_embeddings([req.message]))[0]
        
        search_result = qdrant_client.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_embedding,
            limit=2, # Retrieve top 2 most relevant documents
        )
        
        context = ""
        if search_result:
            for hit in search_result:
                context += hit.payload["text"] + "\n"
        
        logger.info(f"Retrieved context: {context}")

        # 2. Augmentation & Generation
        if context:
            prompt = f"Answer the following question based on the provided context. If the answer cannot be found in the context, say 'I don't have enough information to answer that based on the provided documents.'\n\nContext: {context}\n\nQuestion: {req.message}\nAnswer:"
        else:
            prompt = f"Answer the following question: {req.message}"
            logger.warning("No context retrieved, answering directly using LLM.")
        
        logger.info(f"Generating content with Gemini model using prompt: {prompt[:200]}...") # Log first 200 chars
        response = await model.generate_content_async(prompt)
        
        if response and response.text:
            logger.info(f"Sending RAG reply: {response.text}")
            return {"reply": response.text}
        else:
            logger.warning("Gemini response was empty for RAG query.")
            return {"reply": "I am sorry, I could not generate a response based on the available information."}
            
    except Exception as e:
        logger.error(f"An error occurred during RAG chat generation: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="An internal error occurred while processing your RAG request.")

@app.get("/")
def home():
    """
    A simple endpoint to check if the server is running.
    """
    logger.info("Home endpoint was called.")
    return {"message": "The server is running."}

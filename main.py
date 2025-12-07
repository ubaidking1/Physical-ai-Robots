# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace "*" with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(msg: Message):
    user_msg = msg.message.lower()

    # Simple rules-based response (replace with OpenAI or another AI later)
    if "hello" in user_msg or "hi" in user_msg:
        reply = "Hello! I am your Physical AI assistant 🤖"
    elif "robot" in user_msg:
        reply = "I can answer questions about humanoid robots and Physical AI."
    else:
        reply = "I can answer questions about the textbook. Ask me anything!"

    return {"reply": reply}

# Run with: uvicorn main:app --reload --port 8000

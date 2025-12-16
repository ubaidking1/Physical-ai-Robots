from qdrant_client import QdrantClient
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("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"))

qdrant = QdrantClient(
    url=os.getenv("https://8c8bc9b9-880a-4fb7-9c9c-658a6cf4f7db.europe-west3-0.gcp.cloud.qdrant.io"),
    api_key=os.getenv("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.BaujlFyp-7KWCLtQWdtULpAhdBUx0dFOVEhbbmCOyF4")
)

COLLECTION = "physical-ai-book"

qdrant.recreate_collection(
    collection_name=COLLECTION,
    vectors_config={"size": 1536, "distance": "Cosine"}
)

with open("book.txt", "r", encoding="utf-8") as f:
    chunks = f.read().split("\n\n")

for i, chunk in enumerate(chunks):
    emb = client.embeddings.create(
        model="text-embedding-3-small",
        input=chunk
    ).data[0].embedding

    qdrant.upsert(
        collection_name=COLLECTION,
        points=[{
            "id": i,
            "vector": emb,
            "payload": {"text": chunk}
        }]
    )

print("✅ Book indexed successfully")

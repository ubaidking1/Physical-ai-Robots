from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    user_message = req.message.lower()

    # ✅ FIXED REPLIES (NO API)
    if "hello" in user_message or "hi" in user_message:
        reply = "Hello! I am your Physical AI assistant 🤖"
    elif "salam" in user_message:
        reply = "Walikum Salam 😊"
    elif "robot" in user_message:
        reply = "I can help you with Physical AI and robotics."
    else:
        reply = "I can answer questions about the textbook. Ask me anything!"

    return {"reply": reply}

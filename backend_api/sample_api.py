# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

app = FastAPI()

# --------------------------
# Load GPT4All model locally
# --------------------------
tokenizer = AutoTokenizer.from_pretrained("nomic-ai/gpt4all-j")
model = AutoModelForCausalLM.from_pretrained("nomic-ai/gpt4all-j")

# --------------------------
# Load translation pipeline (English -> Urdu)
# --------------------------
translator = pipeline("translation_en_to_ur", model="Helsinki-NLP/opus-mt-en-ur")

# --------------------------
# Request schemas
# --------------------------
class Message(BaseModel):
    text: str

class Translation(BaseModel):
    text: str

# --------------------------
# Chat endpoint
# --------------------------
@app.post("/chat")
def chat(msg: Message):
    # Encode input text
    inputs = tokenizer(msg.text, return_tensors="pt")
    
    # Generate response
    outputs = model.generate(**inputs, max_new_tokens=200)
    
    # Decode generated text
    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return {"reply": reply}

# --------------------------
# Translation endpoint
# --------------------------
@app.post("/api/translate")
async def translate_text(payload: Translation):
    # Use translator pipeline
    translated = translator(payload.text)[0]["translation_text"]
    return {"translated": translated}

# --------------------------
# Run with:
# uvicorn main:app --reload --port 8000
# --------------------------

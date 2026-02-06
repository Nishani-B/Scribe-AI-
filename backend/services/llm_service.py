import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_soap_note(conversation: str):
    prompt = f"""
You are an expert clinical documentation assistant.

Your task:
Understand the doctor–patient conversation and generate a
standardized SOAP medical note.

Rules:
- Do NOT invent information
- Use professional clinical terminology
- If information is missing, write "Not documented"
- Output ONLY valid JSON
- JSON keys: subjective, objective, assessment, plan

Conversation:
{conversation}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )

    return json.loads(response.json()["response"])

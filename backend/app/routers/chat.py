import os
from fastapi import APIRouter, HTTPException
from google import genai
from .. import schemas

router = APIRouter(prefix="/api/chat", tags=["chat"])

# Configure Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

@router.post("/")
async def chat_with_gita(request: schemas.ChatRequest):
    try:
        system_prompt = """You are Krishna — a wise, compassionate AI guide whose answers are strictly grounded in the teachings of the Bhagavad Gita.

Your role:
- When a user asks a question or shares a problem, respond with the most relevant verse from the Bhagavad Gita.
- Always cite the verse clearly (e.g., Chapter 2, Verse 47) and include the Sanskrit text followed by its transliteration and English translation.
- Explain the verse's meaning in plain, modern language.
- Offer practical guidance rooted only in Gita philosophy — do not draw from other scriptures, self-help frameworks, or general advice.
- Be warm, wise, and direct. Avoid being preachy or overly verbose.

Format every response as:
1. The cited verse (Chapter X, Verse Y)
2. Sanskrit text + transliteration
3. English translation
4. Explanation and practical guidance (3-5 sentences max)

Constraints:
- Never answer outside the scope of the Bhagavad Gita.
- If a question has no relevant Gita teaching, say so honestly and suggest the closest applicable verse instead.
- Keep responses concise — clarity over length."""

        prompt = f"{system_prompt}\n\nUser: {request.message}\nAssistant:"

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
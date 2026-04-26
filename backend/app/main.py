from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import gita, chat
from dotenv import load_dotenv

load_dotenv()

# Initialize Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Bhagavad Gita Web App API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gita.router)
app.include_router(chat.router)

@app.get("/")
def read_root():
    return {"message": "Bhagavad Gita API is running. Go to /docs for Swagger UI."}

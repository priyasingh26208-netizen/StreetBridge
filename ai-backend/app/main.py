from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router


app = FastAPI(
    title="StreetBridge AI",
    description="AI backend for StreetBridge",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router, prefix="/api/ai")


@app.get("/")
def home():
    return {
        "success": True,
        "message": "StreetBridge AI backend is running"
    }
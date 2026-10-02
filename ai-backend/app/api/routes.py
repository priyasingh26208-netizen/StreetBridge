from fastapi import APIRouter
from pydantic import BaseModel

from app.model.model import ask_vendor_ai
from app.model.notice_decoder import decode_notice
from app.model.grievance_generator import generate_grievance
from app.model.smart_alerts import create_alert
from app.model.rag import get_rag_answer
from app.voice.voice_assistant import process_voice_text

router = APIRouter()


class VendorQuestion(BaseModel):
    message: str


@router.post("/chat")
def chat(request: VendorQuestion):

    result = ask_vendor_ai(request.message)

    return result

class NoticeRequest(BaseModel):
    notice: str


@router.post("/decode-notice")
def decode_notice_api(request: NoticeRequest):

    result = decode_notice(request.notice)

    return {
        "success": True,
        "data": result
    }

class GrievanceRequest(BaseModel):
    problem: str
    vendor_name: str = ""
    location: str = ""
    authority: str = ""
    date: str = ""


@router.post("/generate-grievance")
def generate_grievance_api(request: GrievanceRequest):

    result = generate_grievance(
        problem=request.problem,
        vendor_name=request.vendor_name,
        location=request.location,
        authority=request.authority,
        date=request.date
    )

    return result

class AlertRequest(BaseModel):
    title: str
    message: str
    alert_type: str = "general"
    deadline: str = None


@router.post("/create-alert")
def create_alert_api(request: AlertRequest):

    result = create_alert(
        title=request.title,
        message=request.message,
        alert_type=request.alert_type,
        deadline=request.deadline
    )

    return {
        "success": True,
        "data": result
    }

class KnowledgeRequest(BaseModel):
    query: str


@router.post("/knowledge")
def knowledge_api(request: KnowledgeRequest):
    result = get_rag_answer(request.query)

    return result

class VoiceRequest(BaseModel):
    text: str


@router.post("/voice")
def voice_api(request: VoiceRequest):
    return process_voice_text(request.text)
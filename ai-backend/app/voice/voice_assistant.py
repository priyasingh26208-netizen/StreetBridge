from app.model.model import ask_vendor_ai


def process_voice_text(text):
    """
    Voice assistant ke liye text ko StreetBridge AI
    ke through process karta hai.
    """

    if not text or not text.strip():
        return {
            "success": False,
            "message": "Please kuch bolkar try karein."
        }

    result = ask_vendor_ai(text)

    return {
        "success": result.get("success", False),
        "input_text": text,
        "intent": result.get("intent"),
        "confidence": result.get("confidence"),
        "title": result.get("title"),
        "reply": result.get("reply"),
        "suggested_action": result.get("suggested_action")
    }
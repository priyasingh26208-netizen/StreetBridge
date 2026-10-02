import pickle

from app.utils.preprocess import get_response, normalize_text


MODEL_PATH = "app/model/vendor_intent_model.pkl"


with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)


SUGGESTED_ACTIONS = {
    "registration": "Check your vendor registration status and required application steps.",
    "certificate": "Check the vendor certificate application process and eligibility.",
    "documents": "Check the required documents for your vendor application.",
    "notice": "Share the notice text to decode its deadline, authority and required action.",
    "grievance": "Provide your problem, location and authority details to generate a grievance draft.",
    "scheme": "Check the latest applicable government schemes through official sources.",
    "digital_payment": "Check the available UPI or digital payment setup options.",
}


def predict_intent(text):
    text = normalize_text(text)

    probabilities = model.predict_proba([text])[0]

    best_index = probabilities.argmax()

    intent = model.classes_[best_index]

    confidence = probabilities[best_index]

    return {
        "intent": intent,
        "confidence": round(float(confidence), 3)
    }


def ask_vendor_ai(text):
    result = predict_intent(text)

    intent = result["intent"]
    confidence = result["confidence"]

    if intent == "unknown":
        return {
            "success": False,
            "intent": "unknown",
            "confidence": confidence,
            "title": "Question Not Supported",
            "reply": (
                "Ye question StreetBridge vendor services se related nahi lag raha. "
                "Please vendor registration, documents, certificate, notice, "
                "grievance, government schemes ya digital payment se related "
                "question poochiye."
            ),
            "suggested_action": "Ask a StreetBridge vendor-related question."
        }

    if confidence < 0.25:
        return {
            "success": False,
            "intent": intent,
            "confidence": confidence,
            "message": (
                "Mujhe aapka question clearly samajh nahi aaya. "
                "Please thoda aur detail mein bataiye."
            ),
            "suggested_action": "Provide more details about your problem."
        }

    response = get_response(intent)

    return {
        "success": True,
        "intent": intent,
        "confidence": confidence,
        "title": response["title"],
        "reply": response["response"],
        "suggested_action": SUGGESTED_ACTIONS.get(
            intent,
            "Please provide more details."
        )
    }


if __name__ == "__main__":

    questions = [
        "Main apni dukaan ka registration karwana chahta hoon",
        "Mujhe authority ko kaun kaun se papers dene honge",
        "Mujhe nagar nigam ka letter mila hai",
        "Meri complaint par abhi tak koi response nahi aaya",
        "Kya street vendors ko sarkar se financial help milti hai",
        "Customer QR scan karke payment kaise karega",
        "Mujhe vendor certificate banwana hai",
        "Hello",
        "Delhi mein weather kaisa hai",
        "Mujhe pizza order karna hai",
        "How are you",
        "XYZ random question"
    ]

    for question in questions:

        result = ask_vendor_ai(question)

        print("\nQuestion:", question)
        print("Result:", result)
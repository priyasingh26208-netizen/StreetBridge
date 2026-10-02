import re


def normalize_text(text):
    """
    Basic normalization for Hindi/Hinglish vendor queries.
    """
    text = str(text).lower().strip()

    # Common spelling variations
    replacements = {
    # English / Hinglish corrections
    "registation": "registration",
    "registrashan": "registration",
    "regestration": "registration",
    "certificat": "certificate",
    "certifcate": "certificate",
    "documnt": "document",
    "documants": "documents",
    "notis": "notice",
    "notce": "notice",
    "complaint": "grievance",
    "compliant": "grievance",

    # Hindi Devanagari → StreetBridge keywords
    "वेंडर": "vendor",
    "विक्रेता": "vendor",

    "रजिस्ट्रेशन": "registration",
    "पंजीकरण": "registration",

    "सर्टिफिकेट": "certificate",
    "प्रमाणपत्र": "certificate",

    "दस्तावेज": "documents",
    "दस्तावेज़": "documents",
    "कागजात": "documents",

    "नोटिस": "notice",
    "सूचना": "notice",

    "शिकायत": "grievance",
    "शिकायतें": "grievance",

    "योजना": "scheme",
    "योजनाएं": "scheme",
    "योजनाएँ": "scheme",

    "भुगतान": "payment",
    "डिजिटल": "digital",
    "यूपीआई": "upi",

    "नगर": "municipal",
    "निगम": "municipal",

    "आवेदन": "application",
    "प्रक्रिया": "process",
}

    for old, new in replacements.items():
        text = text.replace(old, new)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    return text

RESPONSES = {

    "registration": {
        "title": "Vendor Registration",
        "response": (
            "Vendor registration ke liye aapko apne local municipal "
            "authority ya relevant vending authority ke process ko follow "
            "karna hoga. Required documents aur application process "
            "local authority se verify karein."
        )
    },

    "certificate": {
        "title": "Vendor Certificate",
        "response": (
            "Vendor certificate ke liye relevant local authority ke "
            "certificate application process ko check karein. Required "
            "documents aur eligibility local authority se verify karein."
        )
    },

    "documents": {
        "title": "Required Documents",
        "response": (
            "Required documents application aur local authority ke "
            "rules par depend kar sakte hain. Official authority se "
            "current document list verify karein."
        )
    },

    "notice": {
        "title": "Government Notice",
        "response": (
            "Agar aapko government ya municipal notice mila hai, "
            "notice ka text share karein. Main usme diye gaye "
            "important points, dates aur required action ko simple "
            "language mein explain kar sakta hoon."
        )
    },

    "grievance": {
        "title": "Grievance Support",
        "response": (
            "Aap apni problem, date, location aur relevant authority "
            "ki details bata sakte hain. Main aapke liye ek clear "
            "aur respectful grievance draft prepare kar sakta hoon."
        )
    },

    "scheme": {
        "title": "Government Schemes",
        "response": (
            "Street vendors ke liye available government schemes "
            "time aur location ke according different ho sakti hain. "
            "Current scheme details official government source se "
            "verify karna important hai."
        )
    },

    "digital_payment": {
        "title": "Digital Payments",
        "response": (
            "Aap UPI jaise digital payment methods use kar sakte hain. "
            "Payment setup karne ke liye apne bank ya authorised "
            "payment service provider ki current instructions follow karein."
        )
    }
}


def get_response(intent):

    return RESPONSES.get(
        intent,
        {
            "title": "StreetBridge AI",
            "response": (
                "Sorry, mujhe aapka question clearly samajh nahi aaya. "
                "Please thoda aur detail mein bataiye."
            )
        }
    )
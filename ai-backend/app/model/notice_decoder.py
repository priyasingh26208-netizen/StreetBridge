import re


def decode_notice(text):
    text = str(text).strip()

    result = {
        "notice_type": "Government / Municipal Notice",
        "summary": None,
        "deadline": None,
        "action_required": None,
        "authority": None,
        "reference_number": None,
        "important_points": []
    }

    # -------------------------
    # Reference number
    # -------------------------
    reference_patterns = [
        r"(?:ref(?:erence)?\.?\s*(?:no|number)?|notice\s*(?:no|number)?)"
        r"\s*[:#-]?\s*([A-Za-z0-9/-]+)"
    ]

    for pattern in reference_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            result["reference_number"] = match.group(1)
            break

    # -------------------------
    # Deadline
    # -------------------------
    date_patterns = [
        r"\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b",
        r"\b\d{1,2}\s+(?:January|February|March|April|May|June|July|"
        r"August|September|October|November|December)\s+\d{4}\b"
    ]

    for pattern in date_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            result["deadline"] = match.group(0)
            break

    # -------------------------
    # Authority
    # -------------------------
    authority_keywords = [
        "municipality",
        "municipal corporation",
        "nagar nigam",
        "municipal authority",
        "vending authority",
        "government authority"
    ]

    text_lower = text.lower()

    for authority in authority_keywords:
        if authority in text_lower:
            result["authority"] = authority.title()
            break

    # -------------------------
    # Action required
    # -------------------------
    action_keywords = [
        "submit documents",
        "submit",
        "apply",
        "renew",
        "pay",
        "appear",
        "remove",
        "respond",
        "contact"
    ]

    for action in action_keywords:
        if action in text_lower:
            result["action_required"] = action.title()
            break

    # -------------------------
    # Important points
    # -------------------------
    if result["deadline"]:
        result["important_points"].append(
            f"Deadline: {result['deadline']}"
        )

    if result["action_required"]:
        result["important_points"].append(
            f"Action required: {result['action_required']}"
        )

    if result["authority"]:
        result["important_points"].append(
            f"Issuing authority: {result['authority']}"
        )

    if result["reference_number"]:
        result["important_points"].append(
            f"Reference number: {result['reference_number']}"
        )

    # -------------------------
    # Summary
    # -------------------------
    summary_parts = []

    if result["authority"]:
        summary_parts.append(
            f"This notice was issued by {result['authority']}."
        )

    if result["action_required"]:
        summary_parts.append(
            f"The required action is to {result['action_required'].lower()}."
        )

    if result["deadline"]:
        summary_parts.append(
            f"The mentioned deadline is {result['deadline']}."
        )

    if summary_parts:
        result["summary"] = " ".join(summary_parts)
    else:
        result["summary"] = (
            "This appears to be a government or municipal notice. "
            "Please review the notice details carefully."
        )

    return result
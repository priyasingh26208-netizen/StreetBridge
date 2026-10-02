import json
import os
import re


KNOWLEDGE_BASE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "knowledge",
    "knowledge_base.json"
)


with open(KNOWLEDGE_BASE_PATH, "r", encoding="utf-8") as file:
    KNOWLEDGE_BASE = json.load(file)


STOP_WORDS = {
    "the", "is", "are", "a", "an", "to", "for", "of",
    "and", "in", "on", "ka", "ke", "ki", "kya", "hai",
    "hain", "mujhe", "mein", "se", "ko", "par", "how",
    "can", "do", "kare", "kya", "mila", "mili"
}


IMPORTANT_KEYWORDS = {
    "registration",
    "register",
    "certificate",
    "certification",
    "document",
    "documents",
    "notice",
    "grievance",
    "complaint",
    "scheme",
    "payment",
    "upi",
    "digital"
}


def tokenize(text):
    text = str(text).lower()

    words = re.findall(r"\b\w+\b", text)

    return {
        word
        for word in words
        if word not in STOP_WORDS
    }


def calculate_score(query_words, item):
    title_words = tokenize(item["title"])
    topic_words = tokenize(item["topic"])
    content_words = tokenize(item["content"])

    score = 0

    for word in query_words:

        if word in title_words:
            score += 5

        elif word in topic_words:
            score += 4

        elif word in IMPORTANT_KEYWORDS and word in content_words:
            score += 3

        elif word in content_words:
            score += 1

    return score


def search_knowledge(query, top_k=3):
    query_words = tokenize(query)

    results = []

    for item in KNOWLEDGE_BASE:

        score = calculate_score(query_words, item)

        if score > 0:
            results.append({
                "id": item["id"],
                "topic": item["topic"],
                "title": item["title"],
                "content": item["content"],
                "score": score
            })

    results.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return results[:top_k]


def get_rag_answer(query):
    results = search_knowledge(query)

    if not results:
        return {
            "success": False,
            "query": query,
            "answer": (
                "Knowledge base mein is question se related "
                "information nahi mili."
            ),
            "sources": []
        }

    best_result = results[0]

    return {
        "success": True,
        "query": query,
        "answer": best_result["content"],
        "sources": [
            {
                "title": item["title"],
                "topic": item["topic"],
                "score": item["score"]
            }
            for item in results
        ]
    }


if __name__ == "__main__":

    questions = [
        "vendor registration kaise kare",
        "vendor certificate ke documents kya hain",
        "mujhe government notice mila hai",
        "street vendor grievance kaise kare",
        "digital payment kaise setup kare",
        "government scheme for vendors"
    ]

    for question in questions:

        print("\nQuestion:", question)

        result = get_rag_answer(question)

        print("Result:", result)
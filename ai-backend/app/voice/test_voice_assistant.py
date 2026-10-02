from app.voice.voice_assistant import process_voice_text


questions = [
    "Mujhe vendor registration karwana hai",
    "Mera certificate kaise banega",
    "Mujhe ek government notice mila hai"
]


for question in questions:

    result = process_voice_text(question)

    print("\nVoice Input:", question)
    print("Voice Assistant Result:", result)
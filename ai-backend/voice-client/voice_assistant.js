const API_URL = "http://127.0.0.1:8000/api/ai/voice";

let recognition = null;

function startVoiceAssistant(onResult, onError) {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        onError("Speech recognition browser mein supported nahi hai.");
        return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            });

            const data = await response.json();

            onResult(data);

            if (data.reply) {
                speakResponse(data.reply);
            }

        } catch (error) {
            onError("StreetBridge AI server se connection nahi ho paya.");
        }
    };

    recognition.onerror = (event) => {
        onError(`Voice recognition error: ${event.error}`);
    };

    recognition.start();
}


function speakResponse(text) {
    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}


function stopVoiceAssistant() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}


export {
    startVoiceAssistant,
    stopVoiceAssistant,
    speakResponse
};
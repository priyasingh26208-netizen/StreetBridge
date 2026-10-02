const AI_BASE_URL = "http://127.0.0.1:8000/api/ai";

async function postAi(path, payload, failureMessage) {
  try {
    const response = await fetch(`${AI_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(failureMessage);
    }

    const result = await response.json();

    if (!result || typeof result !== "object" || Array.isArray(result)) {
      throw new Error(failureMessage);
    }

    return result;
  } catch {
    throw new Error(failureMessage);
  }
}

export function askVendorAI(message) {
  if (!message?.trim()) {
    return Promise.reject(new Error("Please enter a question."));
  }

  return postAi("/chat", { message: message.trim() }, "AI service is currently unavailable. Please try again.");
}

export function decodeNotice(notice) {
  if (!notice?.trim()) {
    return Promise.reject(new Error("Please enter the notice text."));
  }

  return postAi("/decode-notice", { notice: notice.trim() }, "AI service is currently unavailable. Please try again.");
}

export function generateGrievance(data) {
  if (!data?.problem?.trim()) {
    return Promise.reject(new Error("Please describe the issue before preparing a draft."));
  }

  return postAi("/generate-grievance", data, "AI service is currently unavailable. Please try again.");
}

export function createAlert(data) {
  if (!data?.title?.trim() || !data?.message?.trim()) {
    return Promise.reject(new Error("Please enter an alert title and message."));
  }

  return postAi("/create-alert", data, "AI service is currently unavailable. Please try again.");
}

export function getKnowledge(query) {
  if (!query?.trim()) {
    return Promise.reject(new Error("Please enter a question."));
  }

  return postAi("/knowledge", { query: query.trim() }, "AI service is currently unavailable. Please try again.");
}

export function processVoice(text) {
  if (!text?.trim()) {
    return Promise.reject(new Error("No speech was recognized. Please try again."));
  }

  return postAi("/voice", { text: text.trim() }, "AI service is currently unavailable. Please try again.");
}
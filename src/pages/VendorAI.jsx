import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  Languages,
  FileText,
  MapPin,
  ShieldCheck,
  Loader2,
  ArrowRight,
  RotateCcw,
  ClipboardList,
  ChevronLeft,
  CheckCircle2,
  Download,
  Edit3,
} from "lucide-react";
import VendorNavbar from "../components/VendorNavbar";

const suggestedQuestions = [
  "What does my latest notice mean?",
  "Which documents are still missing?",
  "How can I update my vendor information?",
];

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Namaste! I’m StreetBridge Assistant. I can help you understand notices, organise your records, and guide you through general vendor-related procedures.",
  },
];

const languageMap = {
  English: "en-IN",
  Hindi: "hi-IN",
  Punjabi: "pa-IN",
  Bengali: "bn-IN",
};

const initialGrievance = {
  issue: "",
  date: "",
  location: "",
  description: "",
  noticeReceived: "No",
  supportingRecord: "No",
  request: "",
};

export default function VendorAI() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);
  const [playingId, setPlayingId] = useState(null);

  const [mode, setMode] = useState("chat");

  const [grievanceStep, setGrievanceStep] = useState(1);
  const [grievance, setGrievance] =
    useState(initialGrievance);

  const [grievanceDraft, setGrievanceDraft] =
    useState("");

  const [draftGenerated, setDraftGenerated] =
    useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ---------------------------------------------------------
  // VOICE INPUT
  // ---------------------------------------------------------

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang =
      languageMap[language] || "en-IN";

    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // ---------------------------------------------------------
  // VOICE OUTPUT
  // ---------------------------------------------------------

  const speakMessage = (messageId, text) => {
    if (!("speechSynthesis" in window)) {
      alert(
        "Voice playback is not supported in this browser."
      );
      return;
    }

    if (playingId === messageId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang =
      languageMap[language] || "en-IN";

    utterance.rate = 0.9;

    utterance.onend = () => {
      setPlayingId(null);
    };

    utterance.onerror = () => {
      setPlayingId(null);
    };

    window.speechSynthesis.speak(utterance);

    setPlayingId(messageId);
  };

  // ---------------------------------------------------------
  // DEMO AI RESPONSE
  // ---------------------------------------------------------

  const generateDemoResponse = (question) => {
    const q = question.toLowerCase();

    if (
      q.includes("notice") ||
      q.includes("meaning")
    ) {
      return "Aap apne Notices section mein notice upload karke uska text OCR se extract kar sakti hain. Uske baad StreetBridge us information ko simpler language mein explain karega.";
    }

    if (
      q.includes("document") ||
      q.includes("missing")
    ) {
      return "Aapke current demo records mein Vending Certificate abhi add nahi hai. Documents section mein jaakar us document ko upload kar sakti hain.";
    }

    if (
      q.includes("grievance") ||
      q.includes("complaint")
    ) {
      return "Bilkul. Grievance Preparation mode open karke incident ki basic details fill kijiye. Uske baad StreetBridge ek structured draft prepare karega jise aap review aur edit kar sakti hain.";
    }

    if (
      q.includes("location") ||
      q.includes("area")
    ) {
      return "Location section mein aap aaj ka working area select kar sakti hain. Is setting ka use area-related information ko personalise karne ke liye kiya ja sakta hai.";
    }

    return "Main aapko notices, documents, working-area information aur grievance preparation jaise StreetBridge features ko samajhne mein help kar sakta hoon.";
  };

  // ---------------------------------------------------------
  // SEND
  // ---------------------------------------------------------

  const sendMessage = (customText) => {
    const question =
      (customText ?? input).trim();

    if (!question || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = generateDemoResponse(question);

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      setLoading(false);
    }, 900);
  };

  // ---------------------------------------------------------
  // RESET CHAT
  // ---------------------------------------------------------

  const resetChat = () => {
    window.speechSynthesis?.cancel();

    setMessages(initialMessages);
    setInput("");
    setPlayingId(null);
    setLoading(false);
  };

  // ---------------------------------------------------------
  // GRIEVANCE
  // ---------------------------------------------------------

  const updateGrievance = (field, value) => {
    setGrievance((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (grievanceStep < 4) {
      setGrievanceStep(
        (prev) => prev + 1
      );
    }
  };

  const previousStep = () => {
    if (grievanceStep > 1) {
      setGrievanceStep(
        (prev) => prev - 1
      );
    }
  };

  const generateGrievanceDraft = () => {
    const date = grievance.date || "the date provided";
    const location =
      grievance.location || "the location provided";

    const draft = `Subject: Request regarding vendor-related issue

I am submitting this grievance regarding ${grievance.issue || "a vendor-related issue"}.

Date of incident: ${date}
Location: ${location}

Description:
${grievance.description || "The incident details are provided above."}

Notice received:
${grievance.noticeReceived}

Supporting record available:
${grievance.supportingRecord}

Requested action:
${grievance.request || "I request that the concerned authority review the matter and provide appropriate information or assistance."}

I have provided the information available to me and request that the matter be reviewed accordingly.

Name: Priya Singh
`;

    setGrievanceDraft(draft);
    setDraftGenerated(true);
    setGrievanceStep(4);
  };

  const resetGrievance = () => {
    setGrievance(initialGrievance);
    setGrievanceStep(1);
    setGrievanceDraft("");
    setDraftGenerated(false);
  };

  const downloadDraft = () => {
    if (!grievanceDraft) return;

    const blob = new Blob(
      [grievanceDraft],
      {
        type: "text/plain",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download =
      "streetbridge-grievance-draft.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">
      <VendorNavbar />

      <main className="px-5 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 pb-8 border-b border-[#E8DCD2]">

            <div>
              <p className="text-[12px] uppercase tracking-[0.22em] font-semibold text-[#C97B63] mb-3">
                StreetBridge Assistant
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31]">
                Ask. Understand. Act.
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
                Get help with notices, documents and vendor records — or
                prepare a structured grievance draft from your own information.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="relative">
                <Languages
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8678]"
                />

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="appearance-none pl-9 pr-8 py-2.5 border border-[#DED1C6] rounded-lg bg-white text-sm text-[#5A4638] outline-none"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Punjabi</option>
                  <option>Bengali</option>
                </select>
              </div>

              <button
                onClick={
                  mode === "chat"
                    ? resetChat
                    : resetGrievance
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DED1C6] rounded-lg text-sm font-medium text-[#665347] hover:bg-[#FFF9F4]"
              >
                <RotateCcw size={15} />
                Reset
              </button>

            </div>
          </div>

          {/* MODE SWITCH */}

          <div className="flex gap-2 mt-8 border-b border-[#E8DCD2]">

            <button
              onClick={() => setMode("chat")}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                mode === "chat"
                  ? "border-[#C97B63] text-[#C97B63]"
                  : "border-transparent text-[#8A7567]"
              }`}
            >
              AI Assistant
            </button>

            <button
              onClick={() => setMode("grievance")}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                mode === "grievance"
                  ? "border-[#C97B63] text-[#C97B63]"
                  : "border-transparent text-[#8A7567]"
              }`}
            >
              Grievance Preparation
            </button>

          </div>

          {/* ================================================= */}
          {/* CHAT MODE */}
          {/* ================================================= */}

          {mode === "chat" && (
            <div className="grid lg:grid-cols-[1fr_300px] gap-8 mt-8">

              <section className="border border-[#E4D7CC] rounded-2xl overflow-hidden">

                <div className="px-5 md:px-6 py-4 bg-[#FBF6F0] border-b border-[#E4D7CC] flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                      <Bot
                        size={20}
                        className="text-[#C97B63]"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-[#4E3C31]">
                        StreetBridge AI
                      </p>

                      <p className="text-xs text-[#8A7567] mt-0.5">
                        Vendor support assistant
                      </p>
                    </div>

                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-xs text-[#71816F]">
                    <span className="w-2 h-2 rounded-full bg-[#718E75]" />
                    Ready
                  </div>

                </div>

                <div className="h-[570px] overflow-y-auto px-5 md:px-8 py-7">

                  {messages.length === 1 && (
                    <div className="max-w-2xl mb-8">

                      <p className="text-sm text-[#8A7567] mb-3">
                        You can ask:
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2">

                        {suggestedQuestions.map(
                          (question) => (
                            <button
                              key={question}
                              onClick={() =>
                                sendMessage(
                                  question
                                )
                              }
                              className="text-left px-4 py-3 bg-[#FFF9F4] border border-[#E8DCD2] rounded-xl text-sm text-[#665347] hover:border-[#D8B5A3] transition"
                            >
                              <span className="flex items-center justify-between gap-3">

                                <span>
                                  {question}
                                </span>

                                <ArrowRight
                                  size={14}
                                  className="text-[#C97B63]"
                                />

                              </span>
                            </button>
                          )
                        )}

                        <button
                          onClick={() =>
                            setMode("grievance")
                          }
                          className="sm:col-span-2 text-left px-4 py-3 bg-[#FBE8DE] border border-[#E6CABC] rounded-xl text-sm text-[#A45D45] font-semibold hover:bg-[#F8E1D6] transition"
                        >
                          <span className="flex items-center justify-between gap-3">

                            <span className="flex items-center gap-2">
                              <ClipboardList size={15} />
                              Prepare a grievance
                            </span>

                            <ArrowRight size={14} />

                          </span>
                        </button>

                      </div>
                    </div>
                  )}

                  <div className="space-y-6">

                    {messages.map((message) => {

                      const isUser =
                        message.role === "user";

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isUser
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >

                          <div className="max-w-[85%] md:max-w-[75%]">

                            {!isUser && (
                              <div className="flex items-center gap-2 mb-2">

                                <div className="w-6 h-6 rounded-full bg-[#FBE8DE] flex items-center justify-center">

                                  <Bot
                                    size={13}
                                    className="text-[#C97B63]"
                                  />

                                </div>

                                <span className="text-xs font-semibold text-[#9A8678]">
                                  StreetBridge AI
                                </span>

                              </div>
                            )}

                            <div
                              className={`px-4 py-3.5 rounded-2xl ${
                                isUser
                                  ? "bg-[#C97B63] text-white rounded-br-md"
                                  : "bg-[#FBF6F0] border border-[#E8DCD2] text-[#5F4D42] rounded-bl-md"
                              }`}
                            >
                              <p className="text-sm md:text-base leading-7 whitespace-pre-line">
                                {message.content}
                              </p>
                            </div>

                            {!isUser && (
                              <button
                                onClick={() =>
                                  speakMessage(
                                    message.id,
                                    message.content
                                  )
                                }
                                className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#9A8678] hover:text-[#C97B63]"
                              >
                                <Volume2 size={14} />

                                {playingId ===
                                message.id
                                  ? "Stop"
                                  : "Listen"}
                              </button>
                            )}

                          </div>
                        </div>
                      );
                    })}

                    {loading && (
                      <div className="flex justify-start">

                        <div className="bg-[#FBF6F0] border border-[#E8DCD2] px-4 py-3.5 rounded-2xl rounded-bl-md">

                          <div className="flex items-center gap-2 text-sm text-[#8A7567]">
                            <Loader2
                              size={16}
                              className="animate-spin text-[#C97B63]"
                            />
                            Thinking...
                          </div>

                        </div>
                      </div>
                    )}

                  </div>

                  <div ref={chatEndRef} />

                </div>

                {/* INPUT */}

                <div className="border-t border-[#E4D7CC] p-4 md:p-5">

                  <div className="flex items-end gap-2 border border-[#DCCFC4] rounded-xl bg-white focus-within:border-[#C97B63]">

                    <textarea
                      value={input}
                      onChange={(e) =>
                        setInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey
                        ) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      rows={2}
                      placeholder="Ask StreetBridge anything..."
                      className="flex-1 resize-none px-4 py-3 text-sm text-[#5A4638] placeholder:text-[#AA9789] outline-none bg-transparent"
                    />

                    <button
                      onClick={
                        listening
                          ? stopListening
                          : startListening
                      }
                      className={`mb-2 w-9 h-9 mr-1 rounded-lg flex items-center justify-center ${
                        listening
                          ? "bg-[#FBE8DE] text-[#B76358]"
                          : "text-[#8A7567] hover:bg-[#F8EEE7]"
                      }`}
                    >
                      {listening ? (
                        <MicOff size={17} />
                      ) : (
                        <Mic size={17} />
                      )}
                    </button>

                    <button
                      onClick={() =>
                        sendMessage()
                      }
                      disabled={
                        !input.trim() || loading
                      }
                      className="mb-2 mr-2 w-10 h-9 rounded-lg bg-[#C97B63] text-white flex items-center justify-center disabled:opacity-30"
                    >
                      <Send size={16} />
                    </button>

                  </div>

                </div>

              </section>

              {/* RIGHT */}

              <aside className="space-y-5">

                <div className="border border-[#E4D7CC] rounded-2xl overflow-hidden">

                  <div className="px-5 py-4 bg-[#FBF6F0] border-b border-[#E4D7CC]">
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                      I can help with
                    </p>
                  </div>

                  <div>

                    {[
                      {
                        icon: FileText,
                        title: "Notices",
                        text: "Understand difficult notice content.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Documents",
                        text: "Organise and review your records.",
                      },
                      {
                        icon: MapPin,
                        title: "Working area",
                        text: "Understand your location settings.",
                      },
                      {
                        icon: ClipboardList,
                        title: "Grievance",
                        text: "Prepare a structured draft.",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex items-start gap-3 px-5 py-4 border-b border-[#EEE5DE] last:border-b-0"
                        >
                          <Icon
                            size={18}
                            className="text-[#C97B63] mt-0.5"
                          />

                          <div>
                            <p className="text-sm font-semibold text-[#5A4638]">
                              {item.title}
                            </p>

                            <p className="text-xs leading-5 text-[#8A7567] mt-1">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>

                <button
                  onClick={() =>
                    setMode("grievance")
                  }
                  className="w-full text-left border border-[#D9B6A4] bg-[#FFF8F3] rounded-2xl p-5 hover:bg-[#FDF1E9] transition"
                >
                  <div className="flex items-center justify-between">

                    <div className="w-10 h-10 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                      <ClipboardList
                        size={18}
                        className="text-[#C97B63]"
                      />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-[#C97B63]"
                    />

                  </div>

                  <p className="mt-4 font-semibold text-[#4E3C31]">
                    Need to prepare a grievance?
                  </p>

                  <p className="text-sm leading-6 text-[#8A7567] mt-2">
                    Go through a simple guided form and create a draft.
                  </p>
                </button>

              </aside>

            </div>
          )}

          {/* ================================================= */}
          {/* GRIEVANCE MODE */}
          {/* ================================================= */}

          {mode === "grievance" && (
            <section className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

              <div className="grid lg:grid-cols-[300px_1fr] min-h-[650px]">

                {/* STEPS */}

                <aside className="bg-[#FBF6F0] border-b lg:border-b-0 lg:border-r border-[#E4D7CC] p-6">

                  <div className="flex items-center gap-3 mb-8">

                    <div className="w-10 h-10 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                      <ClipboardList
                        size={19}
                        className="text-[#C97B63]"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-[#4E3C31]">
                        Grievance Preparation
                      </p>

                      <p className="text-xs text-[#8A7567] mt-1">
                        Step {grievanceStep} of 4
                      </p>
                    </div>

                  </div>

                  <div className="space-y-2">

                    {[
                      "Issue",
                      "When & Where",
                      "Details",
                      "Review Draft",
                    ].map((step, index) => {

                      const number = index + 1;
                      const active =
                        grievanceStep === number;
                      const completed =
                        grievanceStep > number;

                      return (
                        <div
                          key={step}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg ${
                            active
                              ? "bg-white border border-[#DAB6A4]"
                              : ""
                          }`}
                        >

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              completed
                                ? "bg-[#EAF1EA] text-[#607864]"
                                : active
                                ? "bg-[#FBE8DE] text-[#C97B63]"
                                : "bg-[#F0E8E1] text-[#9A8678]"
                            }`}
                          >
                            {completed ? (
                              <CheckCircle2 size={16} />
                            ) : (
                              number
                            )}
                          </div>

                          <p
                            className={`text-sm ${
                              active
                                ? "font-semibold text-[#5A4638]"
                                : "text-[#8A7567]"
                            }`}
                          >
                            {step}
                          </p>

                        </div>
                      );
                    })}

                  </div>

                  <div className="mt-10 pt-6 border-t border-[#E6DCD4]">

                    <p className="text-xs leading-5 text-[#8A7567]">
                      StreetBridge creates a draft from the information you
                      provide. Review and edit everything before using it.
                    </p>

                  </div>

                </aside>

                {/* FORM */}

                <div className="p-6 md:p-8 lg:p-10">

                  {/* STEP 1 */}

                  {grievanceStep === 1 && (
                    <div className="max-w-2xl">

                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-bold">
                        Step 01
                      </p>

                      <h2 className="text-3xl font-semibold text-[#4E3C31] mt-2">
                        What is the issue?
                      </h2>

                      <p className="text-sm leading-6 text-[#8A7567] mt-3">
                        Start by describing the main issue in simple words.
                      </p>

                      <label className="block text-sm font-semibold text-[#5A4638] mt-8">
                        Issue
                      </label>

                      <input
                        value={grievance.issue}
                        onChange={(e) =>
                          updateGrievance(
                            "issue",
                            e.target.value
                          )
                        }
                        placeholder="Example: Issue related to vending area"
                        className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                      />

                      <label className="block text-sm font-semibold text-[#5A4638] mt-6">
                        Did you receive a notice?
                      </label>

                      <div className="flex gap-3 mt-2">

                        {["Yes", "No"].map(
                          (option) => (
                            <button
                              key={option}
                              onClick={() =>
                                updateGrievance(
                                  "noticeReceived",
                                  option
                                )
                              }
                              className={`px-5 py-2.5 rounded-lg border text-sm ${
                                grievance.noticeReceived ===
                                option
                                  ? "bg-[#FBE8DE] border-[#D9B6A4] text-[#A45D45] font-semibold"
                                  : "border-[#DED1C6] text-[#756052]"
                              }`}
                            >
                              {option}
                            </button>
                          )
                        )}

                      </div>

                      <button
                        onClick={nextStep}
                        className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                      >
                        Continue
                        <ArrowRight size={15} />
                      </button>

                    </div>
                  )}

                  {/* STEP 2 */}

                  {grievanceStep === 2 && (
                    <div className="max-w-2xl">

                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-bold">
                        Step 02
                      </p>

                      <h2 className="text-3xl font-semibold text-[#4E3C31] mt-2">
                        When and where?
                      </h2>

                      <div className="grid md:grid-cols-2 gap-5 mt-8">

                        <div>
                          <label className="text-sm font-semibold text-[#5A4638]">
                            Date
                          </label>

                          <input
                            type="date"
                            value={grievance.date}
                            onChange={(e) =>
                              updateGrievance(
                                "date",
                                e.target.value
                              )
                            }
                            className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-[#5A4638]">
                            Location
                          </label>

                          <input
                            value={grievance.location}
                            onChange={(e) =>
                              updateGrievance(
                                "location",
                                e.target.value
                              )
                            }
                            placeholder="Market / area"
                            className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                          />
                        </div>

                      </div>

                      <div className="flex gap-3 mt-8">

                        <button
                          onClick={previousStep}
                          className="inline-flex items-center gap-2 px-5 py-3 border border-[#DED1C6] rounded-lg text-sm font-semibold text-[#665347]"
                        >
                          <ChevronLeft size={15} />
                          Back
                        </button>

                        <button
                          onClick={nextStep}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                        >
                          Continue
                          <ArrowRight size={15} />
                        </button>

                      </div>

                    </div>
                  )}

                  {/* STEP 3 */}

                  {grievanceStep === 3 && (
                    <div className="max-w-2xl">

                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-bold">
                        Step 03
                      </p>

                      <h2 className="text-3xl font-semibold text-[#4E3C31] mt-2">
                        Tell us what happened.
                      </h2>

                      <textarea
                        value={grievance.description}
                        onChange={(e) =>
                          updateGrievance(
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe the incident in your own words..."
                        rows={7}
                        className="w-full mt-8 border border-[#DED1C6] rounded-xl px-4 py-4 text-sm leading-6 outline-none focus:border-[#C97B63] resize-none"
                      />

                      <label className="block text-sm font-semibold text-[#5A4638] mt-6">
                        Do you have a supporting photo/document?
                      </label>

                      <div className="flex gap-3 mt-2">

                        {["Yes", "No"].map(
                          (option) => (
                            <button
                              key={option}
                              onClick={() =>
                                updateGrievance(
                                  "supportingRecord",
                                  option
                                )
                              }
                              className={`px-5 py-2.5 rounded-lg border text-sm ${
                                grievance.supportingRecord ===
                                option
                                  ? "bg-[#FBE8DE] border-[#D9B6A4] text-[#A45D45] font-semibold"
                                  : "border-[#DED1C6] text-[#756052]"
                              }`}
                            >
                              {option}
                            </button>
                          )
                        )}

                      </div>

                      <label className="block text-sm font-semibold text-[#5A4638] mt-6">
                        What would you like to request?
                      </label>

                      <textarea
                        value={grievance.request}
                        onChange={(e) =>
                          updateGrievance(
                            "request",
                            e.target.value
                          )
                        }
                        placeholder="Example: I would like the concerned authority to review this matter."
                        rows={4}
                        className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm leading-6 outline-none focus:border-[#C97B63] resize-none"
                      />

                      <div className="flex gap-3 mt-8">

                        <button
                          onClick={previousStep}
                          className="inline-flex items-center gap-2 px-5 py-3 border border-[#DED1C6] rounded-lg text-sm font-semibold text-[#665347]"
                        >
                          <ChevronLeft size={15} />
                          Back
                        </button>

                        <button
                          onClick={generateGrievanceDraft}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                        >
                          <Sparkles size={15} />
                          Prepare Draft
                        </button>

                      </div>

                    </div>
                  )}

                  {/* STEP 4 */}

                  {grievanceStep === 4 && (
                    <div className="max-w-3xl">

                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-bold">
                            Step 04
                          </p>

                          <h2 className="text-3xl font-semibold text-[#4E3C31] mt-2">
                            Review your draft
                          </h2>

                          <p className="text-sm text-[#8A7567] mt-2">
                            Review and edit the draft before using it.
                          </p>
                        </div>

                        {draftGenerated && (
                          <CheckCircle2
                            size={24}
                            className="text-[#718E75]"
                          />
                        )}

                      </div>

                      <textarea
                        value={grievanceDraft}
                        onChange={(e) =>
                          setGrievanceDraft(
                            e.target.value
                          )
                        }
                        rows={18}
                        className="w-full mt-7 border border-[#DED1C6] rounded-xl px-5 py-4 text-sm leading-7 text-[#5F4D42] outline-none focus:border-[#C97B63] resize-y"
                      />

                      <div className="flex flex-wrap gap-3 mt-5">

                        <button
                          onClick={() =>
                            setGrievanceStep(3)
                          }
                          className="inline-flex items-center gap-2 px-5 py-3 border border-[#DED1C6] rounded-lg text-sm font-semibold text-[#665347]"
                        >
                          <Edit3 size={15} />
                          Edit details
                        </button>

                        <button
                          onClick={downloadDraft}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                        >
                          <Download size={15} />
                          Download Draft
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
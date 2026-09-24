import React, { useMemo, useState } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  Volume2,
  Languages,
  CalendarDays,
  MapPin,
  ArrowRight,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Clock3,
  Loader2,
  ScanText,
  Brain,
  Play,
  RotateCcw,
} from "lucide-react";
import { createWorker } from "tesseract.js";
import VendorNavbar from "../components/VendorNavbar";

const initialNotices = [
  {
    id: 1,
    title: "Vendor Registration Drive",
    type: "Registration",
    date: "18 Sep 2026",
    source: "Municipal Zone Office",
    status: "New",
    location: "Sector 18",
    original:
      "All street vendors are informed that a registration and documentation facilitation camp will be conducted in Sector 18 Market.",
    summary:
      "A registration and documentation camp is being organised for street vendors in Sector 18 Market. The camp can be used to check, update or submit vendor-related documents.",
    action:
      "Visit the facilitation camp with the identity and vendor-related documents you currently have.",
    importantDate: "18 Sep 2026",
  },
  {
    id: 2,
    title: "Documentation Verification Notice",
    type: "Documentation",
    date: "15 Sep 2026",
    source: "Town Vending Committee",
    status: "Reviewed",
    location: "Sector 18 Market",
    original:
      "Vendors are requested to ensure that the documents submitted for vendor registration are complete and legible.",
    summary:
      "The notice asks vendors to check whether their submitted documents are complete and readable. Missing or unclear documents may need to be updated.",
    action:
      "Open your Documents section and check whether any submitted document is missing or needs to be replaced.",
    importantDate: "Not specified",
  },
  {
    id: 3,
    title: "Market Area Public Information",
    type: "Information",
    date: "11 Sep 2026",
    source: "Local Administration",
    status: "Reviewed",
    location: "Sector 18",
    original:
      "An informational notice regarding activities and arrangements in the designated market area has been issued.",
    summary:
      "This notice contains general information about activities and arrangements taking place in your market area.",
    action:
      "Read the complete notice to understand the dates and area-specific information.",
    importantDate: "Not specified",
  },
];

const typeStyles = {
  Registration: {
    badge: "bg-[#FBE8DE] text-[#A45D45]",
    dot: "bg-[#C97B63]",
  },
  Documentation: {
    badge: "bg-[#EFEAE5] text-[#756052]",
    dot: "bg-[#958170]",
  },
  Information: {
    badge: "bg-[#EAF1EA] text-[#58705E]",
    dot: "bg-[#718E75]",
  },
  Relocation: {
    badge: "bg-[#F3EADB] text-[#8B6E3E]",
    dot: "bg-[#A98B56]",
  },
  Enforcement: {
    badge: "bg-[#F7E5E1] text-[#A94F45]",
    dot: "bg-[#B76358]",
  },
  Survey: {
    badge: "bg-[#E8EDF2] text-[#5E7183]",
    dot: "bg-[#70879B]",
  },
};

const languageMap = {
  English: "en-IN",
  Hindi: "hi-IN",
  Punjabi: "pa-IN",
  Bengali: "bn-IN",
};

export default function VendorNotices() {
  const [notices, setNotices] = useState(initialNotices);
  const [selectedNotice, setSelectedNotice] = useState(initialNotices[0]);

  const [showUpload, setShowUpload] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [ocrLanguage, setOcrLanguage] = useState("eng");

  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);

  const [decodedText, setDecodedText] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const [aiLoading, setAiLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [error, setError] = useState("");

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(search.toLowerCase()) ||
        notice.type.toLowerCase().includes(search.toLowerCase()) ||
        notice.source.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || notice.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [notices, search, filter]);

  const openUpload = () => {
    setError("");
    setDecodedText("");
    setSelectedFileName("");
    setOcrProgress(0);
    setProcessingStep("");
    setShowUpload(true);
  };

  const closeUpload = () => {
    if (processing) return;

    setShowUpload(false);
    setError("");
    setDecodedText("");
    setSelectedFileName("");
    setOcrProgress(0);
    setProcessingStep("");
  };

  // ------------------------------------------------------------
  // OCR
  // ------------------------------------------------------------

  const runOCR = async (file) => {
    let worker;

    try {
      worker = await createWorker(ocrLanguage);

      const result = await worker.recognize(file, {
        logger: (message) => {
          if (message.status === "recognizing text") {
            setOcrProgress(Math.round((message.progress || 0) * 100));
          }
        },
      });

      return result.data.text?.trim() || "";
    } finally {
      if (worker) {
        await worker.terminate();
      }
    }
  };

  // ------------------------------------------------------------
  // AI API
  // ------------------------------------------------------------

  const analyzeWithAI = async (text, language = selectedLanguage) => {
    const response = await fetch("/api/analyze-notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        language,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI analysis failed.");
    }

    return data;
  };

  // ------------------------------------------------------------
  // UPLOAD + OCR + AI
  // ------------------------------------------------------------

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSelectedFileName(file.name);

    // Currently OCR is handled for image notices.
    if (!file.type.startsWith("image/")) {
      setError(
        "Please upload a JPG, PNG or WEBP notice image for OCR."
      );
      return;
    }

    try {
      setProcessing(true);
      setProcessingStep("ocr");
      setOcrProgress(0);
      setDecodedText("");

      // STEP 1 — OCR
      const extractedText = await runOCR(file);

      if (!extractedText || extractedText.length < 10) {
        throw new Error(
          "OCR could not extract enough text. Please upload a clearer notice image."
        );
      }

      setDecodedText(extractedText);

      // STEP 2 — AI
      setProcessingStep("ai");

      const aiResult = await analyzeWithAI(
        extractedText,
        selectedLanguage
      );

      const today = new Date();

      const newNotice = {
        id: `uploaded-${Date.now()}`,
        title: aiResult.title || "Uploaded Notice",
        type: aiResult.type || "Information",
        date: today.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        source: aiResult.source || "Extracted from notice",
        status: "New",
        location: aiResult.location || "Not specified",
        original: extractedText,
        summary:
          aiResult.summary ||
          "The notice has been processed successfully.",
        action:
          aiResult.action ||
          "Review the original notice for the complete instructions.",
        importantDate:
          aiResult.importantDate || "Not specified",
      };

      setNotices((prev) => [newNotice, ...prev]);
      setSelectedNotice(newNotice);

      setProcessingStep("complete");

      setTimeout(() => {
        setShowUpload(false);
        setProcessing(false);
        setProcessingStep("");
        setSelectedFileName("");
        setOcrProgress(0);
        setDecodedText("");
      }, 900);
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong while processing the notice."
      );

      setProcessing(false);
      setProcessingStep("");
    }
  };

  // ------------------------------------------------------------
  // LANGUAGE CHANGE
  // ------------------------------------------------------------

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    setIsPlaying(false);

    if (!selectedNotice?.original) return;

    try {
      setAiLoading(true);
      setError("");

      const result = await analyzeWithAI(
        selectedNotice.original,
        language
      );

      const updatedNotice = {
        ...selectedNotice,
        title: result.title || selectedNotice.title,
        type: result.type || selectedNotice.type,
        source: result.source || selectedNotice.source,
        location: result.location || selectedNotice.location,
        summary: result.summary || selectedNotice.summary,
        action: result.action || selectedNotice.action,
        importantDate:
          result.importantDate || selectedNotice.importantDate,
      };

      setSelectedNotice(updatedNotice);

      setNotices((prev) =>
        prev.map((notice) =>
          notice.id === updatedNotice.id
            ? updatedNotice
            : notice
        )
      );
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Could not translate/analyse this notice."
      );
    } finally {
      setAiLoading(false);
    }
  };

  // ------------------------------------------------------------
  // TEXT TO SPEECH
  // ------------------------------------------------------------

  const handleListen = () => {
    if (!selectedNotice) return;

    if (!("speechSynthesis" in window)) {
      alert("Voice playback is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const speechText = `${selectedNotice.title}. ${selectedNotice.summary}. Next step: ${selectedNotice.action}`;

    const utterance = new SpeechSynthesisUtterance(speechText);

    utterance.lang =
      languageMap[selectedLanguage] || "en-IN";

    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const activeTypeStyle =
    typeStyles[selectedNotice?.type] ||
    typeStyles.Information;

  const unreadCount = notices.filter(
    (notice) => notice.status === "New"
  ).length;

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">
      <VendorNavbar />

      <main className="px-5 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 pb-8 border-b border-[#E8DCD2]">

            <div>
              <p className="text-[12px] uppercase tracking-[0.22em] font-semibold text-[#C97B63] mb-3">
                Vendor Notice Centre
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31]">
                Your notices, made clearer.
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
                Upload an official notice and let StreetBridge read it,
                understand it and explain the important information in
                simpler language.
              </p>
            </div>

            <button
              onClick={openUpload}
              className="inline-flex items-center justify-center gap-2 bg-[#C97B63] hover:bg-[#B86D56] text-white font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              <ScanText size={18} />
              Decode a Notice
            </button>
          </div>

          {/* ================================================= */}
          {/* PROCESS STRIP */}
          {/* ================================================= */}

          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E8DCD2]">

            <div className="py-6 pr-5 border-r border-[#E8DCD2]">
              <div className="flex items-center gap-2">
                <ScanText size={16} className="text-[#C97B63]" />
                <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                  Step 01
                </p>
              </div>

              <p className="text-lg font-semibold text-[#4E3C31] mt-2">
                OCR
              </p>

              <p className="text-xs text-[#8A7567] mt-1">
                Read the notice
              </p>
            </div>

            <div className="py-6 px-5 border-r border-[#E8DCD2]">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-[#C97B63]" />
                <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                  Step 02
                </p>
              </div>

              <p className="text-lg font-semibold text-[#4E3C31] mt-2">
                AI
              </p>

              <p className="text-xs text-[#8A7567] mt-1">
                Understand the content
              </p>
            </div>

            <div className="py-6 px-5 border-r border-[#E8DCD2]">
              <div className="flex items-center gap-2">
                <Languages size={16} className="text-[#C97B63]" />
                <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                  Step 03
                </p>
              </div>

              <p className="text-lg font-semibold text-[#4E3C31] mt-2">
                Translate
              </p>

              <p className="text-xs text-[#8A7567] mt-1">
                Your preferred language
              </p>
            </div>

            <div className="py-6 pl-5">
              <div className="flex items-center gap-2">
                <Volume2 size={16} className="text-[#C97B63]" />
                <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                  Step 04
                </p>
              </div>

              <p className="text-lg font-semibold text-[#4E3C31] mt-2">
                Voice
              </p>

              <p className="text-xs text-[#8A7567] mt-1">
                Listen to the explanation
              </p>
            </div>

          </div>

          {/* ================================================= */}
          {/* WORKSPACE */}
          {/* ================================================= */}

          <div className="mt-10 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="grid lg:grid-cols-[370px_1fr] min-h-[720px]">

              {/* ============================================= */}
              {/* LEFT */}
              {/* ============================================= */}

              <aside className="bg-[#FBF6F0] border-b lg:border-b-0 lg:border-r border-[#E4D7CC]">

                <div className="p-5 md:p-6">

                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                        Inbox
                      </p>

                      <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                        Recent Notices
                      </h2>
                    </div>

                    <span className="text-sm text-[#9A8678]">
                      {notices.length}
                    </span>

                  </div>

                  {/* SEARCH */}

                  <div className="relative mb-3">

                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A08E81]"
                    />

                    <input
                      type="text"
                      placeholder="Search notices..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="w-full bg-white border border-[#E2D5CA] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#5A4638] placeholder:text-[#AA9789] outline-none focus:border-[#C97B63]"
                    />
                  </div>

                  {/* FILTER */}

                  <div className="flex items-center gap-2 mb-6">
                    <SlidersHorizontal
                      size={14}
                      className="text-[#9A8678]"
                    />

                    <select
                      value={filter}
                      onChange={(e) =>
                        setFilter(e.target.value)
                      }
                      className="bg-transparent text-sm text-[#756052] outline-none cursor-pointer"
                    >
                      <option value="All">All notices</option>
                      <option value="Registration">
                        Registration
                      </option>
                      <option value="Documentation">
                        Documentation
                      </option>
                      <option value="Information">
                        Information
                      </option>
                      <option value="Relocation">
                        Relocation
                      </option>
                      <option value="Enforcement">
                        Enforcement
                      </option>
                      <option value="Survey">
                        Survey
                      </option>
                    </select>
                  </div>

                  {/* NOTICE LIST */}

                  <div className="space-y-2">

                    {filteredNotices.length === 0 ? (
                      <div className="py-12 text-center">
                        <Search
                          size={25}
                          className="mx-auto text-[#B8A79A]"
                        />

                        <p className="mt-3 text-sm text-[#8A7567]">
                          No notices found.
                        </p>
                      </div>
                    ) : (
                      filteredNotices.map((notice) => {

                        const active =
                          selectedNotice.id === notice.id;

                        const style =
                          typeStyles[notice.type] ||
                          typeStyles.Information;

                        return (
                          <button
                            key={notice.id}
                            onClick={() => {
                              setSelectedNotice(notice);
                              setIsPlaying(false);

                              if (
                                "speechSynthesis" in window
                              ) {
                                window.speechSynthesis.cancel();
                              }
                            }}
                            className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                              active
                                ? "bg-white border-[#D8B5A3] shadow-[0_3px_12px_rgba(90,70,56,0.06)]"
                                : "bg-transparent border-transparent hover:bg-white hover:border-[#E7DCD3]"
                            }`}
                          >

                            <div className="flex items-start gap-3">

                              <div
                                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${style.dot}`}
                              />

                              <div className="min-w-0 flex-1">

                                <div className="flex items-center gap-2 mb-1.5">

                                  <span
                                    className={`text-[10px] font-semibold px-2 py-1 rounded-full ${style.badge}`}
                                  >
                                    {notice.type}
                                  </span>

                                  {notice.status === "New" && (
                                    <span className="text-[10px] font-bold text-[#C97B63]">
                                      NEW
                                    </span>
                                  )}

                                </div>

                                <h3 className="text-[15px] font-semibold text-[#58463A] leading-5">
                                  {notice.title}
                                </h3>

                                <div className="flex items-center justify-between mt-2">

                                  <span className="text-xs text-[#9A8678]">
                                    {notice.date}
                                  </span>

                                  <ChevronRight
                                    size={15}
                                    className={
                                      active
                                        ? "text-[#C97B63]"
                                        : "text-[#B5A397]"
                                    }
                                  />

                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })
                    )}

                  </div>
                </div>
              </aside>

              {/* ============================================= */}
              {/* RIGHT */}
              {/* ============================================= */}

              <section className="bg-white">

                <div className="p-6 md:p-8 lg:p-10">

                  {/* TITLE */}

                  <div className="pb-7 border-b border-[#EAE1DA]">

                    <div className="flex flex-wrap items-center gap-2 mb-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${activeTypeStyle.badge}`}
                      >
                        {selectedNotice.type}
                      </span>

                      {selectedNotice.status === "New" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A45D45]">
                          <AlertCircle size={14} />
                          Needs your attention
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667A69]">
                          <CheckCircle2 size={14} />
                          Reviewed
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#4E3C31] max-w-3xl">
                      {selectedNotice.title}
                    </h2>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-[#8A7567]">

                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={15} />
                        {selectedNotice.date}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <MapPin size={15} />
                        {selectedNotice.location}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <FileText size={15} />
                        {selectedNotice.source}
                      </span>

                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* AI SECTION */}
                  {/* ========================================= */}

                  <div className="py-8 border-b border-[#EAE1DA]">

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                      <div>
                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                            <Sparkles
                              size={16}
                              className="text-[#C97B63]"
                            />
                          </div>

                          <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#C97B63]">
                            AI Decoded
                          </p>

                        </div>

                        <h3 className="text-2xl font-semibold text-[#4E3C31] mt-3">
                          What this notice means
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">

                        <div className="relative">

                          <Languages
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8678]"
                          />

                          <select
                            value={selectedLanguage}
                            onChange={(e) =>
                              handleLanguageChange(
                                e.target.value
                              )
                            }
                            disabled={aiLoading}
                            className="appearance-none pl-9 pr-8 py-2 border border-[#DED1C6] rounded-lg bg-white text-sm text-[#5A4638] outline-none cursor-pointer disabled:opacity-60"
                          >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Punjabi</option>
                            <option>Bengali</option>
                          </select>

                        </div>

                        <button
                          onClick={handleListen}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-medium transition ${
                            isPlaying
                              ? "bg-[#FBE9DF] border-[#DDB8A7] text-[#A45D45]"
                              : "border-[#DED1C6] text-[#665347] hover:bg-[#FFF9F4]"
                          }`}
                        >
                          {isPlaying ? (
                            <Volume2 size={15} />
                          ) : (
                            <Play size={14} />
                          )}

                          {isPlaying
                            ? "Stop"
                            : "Listen"}
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 max-w-3xl">

                      {aiLoading ? (
                        <div className="flex items-center gap-3 py-5 text-[#8A7567]">
                          <Loader2
                            size={19}
                            className="animate-spin text-[#C97B63]"
                          />
                          <span>
                            Translating and re-analysing this
                            notice...
                          </span>
                        </div>
                      ) : (
                        <p className="text-lg leading-8 text-[#665246]">
                          {selectedNotice.summary}
                        </p>
                      )}

                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* IMPORTANT INFO */}
                  {/* ========================================= */}

                  <div className="grid md:grid-cols-2 border-b border-[#EAE1DA]">

                    <div className="py-7 md:pr-8 md:border-r border-[#EAE1DA]">

                      <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                        Important date
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <CalendarDays
                          size={19}
                          className="text-[#C97B63]"
                        />

                        <p className="text-lg font-semibold text-[#5A4638]">
                          {selectedNotice.importantDate ||
                            "Not specified"}
                        </p>
                      </div>

                    </div>

                    <div className="py-7 md:pl-8">

                      <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                        Notice location
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <MapPin
                          size={19}
                          className="text-[#C97B63]"
                        />

                        <p className="text-lg font-semibold text-[#5A4638]">
                          {selectedNotice.location ||
                            "Not specified"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* ========================================= */}
                  {/* ACTION */}
                  {/* ========================================= */}

                  <div className="py-8 border-b border-[#EAE1DA]">

                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-full bg-[#F8EEE7] flex items-center justify-center flex-shrink-0">
                        <ArrowRight
                          size={17}
                          className="text-[#C97B63]"
                        />
                      </div>

                      <div className="max-w-3xl">

                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                          What you can do
                        </p>

                        <p className="mt-2 text-base md:text-lg leading-7 text-[#5F4D42]">
                          {selectedNotice.action}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ========================================= */}
                  {/* ORIGINAL OCR TEXT */}
                  {/* ========================================= */}

                  <div className="pt-8">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                          OCR Output
                        </p>

                        <h3 className="text-xl font-semibold text-[#4E3C31] mt-1">
                          Original notice text
                        </h3>
                      </div>

                      <ScanText
                        size={19}
                        className="text-[#B39F91]"
                      />
                    </div>

                    <div className="mt-5 pl-5 border-l-2 border-[#D8B5A3] max-w-4xl">

                      <p className="text-sm md:text-base leading-7 text-[#78665A] whitespace-pre-line">
                        {selectedNotice.original}
                      </p>

                    </div>

                    <button
                      onClick={openUpload}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#C97B63] hover:text-[#A45D45]"
                    >
                      <RotateCcw size={15} />
                      Decode another notice
                    </button>

                  </div>

                </div>
              </section>
            </div>
          </div>

          {/* ================================================= */}
          {/* FOOT NOTE */}
          {/* ================================================= */}

          <div className="flex items-start gap-3 max-w-3xl py-7">

            <Clock3
              size={16}
              className="text-[#9A8678] mt-1 flex-shrink-0"
            />

            <p className="text-sm leading-6 text-[#8A7567]">
              StreetBridge simplifies the text extracted from an uploaded
              notice. For official dates, instructions and decisions, the
              original notice or issuing authority remains the reference.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="fixed bottom-5 right-5 z-[120] max-w-md bg-white border border-[#E4C7BD] shadow-xl rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle
                  size={18}
                  className="text-[#B76358] mt-0.5 flex-shrink-0"
                />

                <div>
                  <p className="font-semibold text-[#5A4638]">
                    Notice processing failed
                  </p>

                  <p className="text-sm text-[#8A7567] mt-1 leading-6">
                    {error}
                  </p>
                </div>

                <button
                  onClick={() => setError("")}
                  className="text-[#9A8678] hover:text-[#5A4638]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ===================================================== */}
      {/* UPLOAD MODAL */}
      {/* ===================================================== */}

      {showUpload && (
        <div className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DCD2]">

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#C97B63]">
                  StreetBridge AI
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Decode your notice
                </h2>
              </div>

              <button
                onClick={closeUpload}
                disabled={processing}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F8EEE7] transition disabled:opacity-40"
              >
                <X size={19} />
              </button>

            </div>

            <div className="p-6">

              {!processing ? (
                <>
                  {/* OCR LANGUAGE */}

                  <div className="mb-5">

                    <label className="text-sm font-semibold text-[#5A4638]">
                      Notice language
                    </label>

                    <p className="text-xs text-[#9A8678] mt-1 mb-2">
                      Choose the language written in the notice for better OCR.
                    </p>

                    <select
                      value={ocrLanguage}
                      onChange={(e) =>
                        setOcrLanguage(e.target.value)
                      }
                      className="w-full border border-[#DED1C6] rounded-lg px-3 py-2.5 bg-white text-sm text-[#5A4638] outline-none"
                    >
                      <option value="eng">
                        English
                      </option>
                      <option value="hin">
                        Hindi
                      </option>
                    </select>

                  </div>

                  {/* UPLOAD */}

                  <label
                    htmlFor="notice-upload"
                    className="block border-2 border-dashed border-[#DCCABE] rounded-2xl p-10 text-center cursor-pointer hover:border-[#C97B63] hover:bg-[#FFF9F4] transition-all"
                  >

                    <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE8DE] flex items-center justify-center">
                      <Upload
                        size={25}
                        className="text-[#C97B63]"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[#57463A] mt-5">
                      Upload notice image
                    </h3>

                    <p className="text-sm text-[#9A8678] mt-2">
                      JPG, PNG or WEBP
                    </p>

                    <div className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold">
                      <Upload size={15} />
                      Choose File
                    </div>

                    <input
                      id="notice-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />

                  </label>

                  {selectedFileName && (
                    <p className="text-sm text-[#756052] mt-4">
                      Selected:{" "}
                      <span className="font-semibold">
                        {selectedFileName}
                      </span>
                    </p>
                  )}

                  {/* FLOW */}

                  <div className="grid md:grid-cols-3 gap-5 mt-7">

                    <div className="border-t border-[#E8DCD2] pt-3">
                      <div className="flex items-center gap-2">
                        <ScanText
                          size={16}
                          className="text-[#C97B63]"
                        />
                        <p className="text-sm font-semibold text-[#5A4638]">
                          OCR
                        </p>
                      </div>

                      <p className="text-xs text-[#9A8678] mt-1">
                        Extract words from the notice image
                      </p>
                    </div>

                    <div className="border-t border-[#E8DCD2] pt-3">
                      <div className="flex items-center gap-2">
                        <Brain
                          size={16}
                          className="text-[#C97B63]"
                        />
                        <p className="text-sm font-semibold text-[#5A4638]">
                          AI Analysis
                        </p>
                      </div>

                      <p className="text-xs text-[#9A8678] mt-1">
                        Understand and simplify the content
                      </p>
                    </div>

                    <div className="border-t border-[#E8DCD2] pt-3">
                      <div className="flex items-center gap-2">
                        <Volume2
                          size={16}
                          className="text-[#C97B63]"
                        />
                        <p className="text-sm font-semibold text-[#5A4638]">
                          Voice
                        </p>
                      </div>

                      <p className="text-xs text-[#9A8678] mt-1">
                        Listen in your preferred language
                      </p>
                    </div>

                  </div>
                </>
              ) : (
                /* =========================================== */
                /* PROCESSING STATE */
                /* =========================================== */

                <div className="py-4">

                  <div className="text-center">

                    <div className="w-16 h-16 mx-auto rounded-full bg-[#FBE8DE] flex items-center justify-center">
                      {processingStep === "ocr" ? (
                        <ScanText
                          size={27}
                          className="text-[#C97B63]"
                        />
                      ) : processingStep === "ai" ? (
                        <Brain
                          size={27}
                          className="text-[#C97B63]"
                        />
                      ) : (
                        <CheckCircle2
                          size={27}
                          className="text-[#6F8A73]"
                        />
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-[#4E3C31] mt-5">
                      {processingStep === "ocr" &&
                        "Reading your notice"}

                      {processingStep === "ai" &&
                        "Understanding your notice"}

                      {processingStep === "complete" &&
                        "Notice decoded successfully"}
                    </h3>

                    <p className="text-sm text-[#8A7567] mt-2">
                      {processingStep === "ocr" &&
                        "OCR is extracting the text from the image."}

                      {processingStep === "ai" &&
                        "AI is turning the extracted text into simpler information."}

                      {processingStep === "complete" &&
                        "Opening your decoded notice..."}
                    </p>
                  </div>

                  {/* PROGRESS */}

                  {processingStep === "ocr" && (
                    <div className="mt-8">

                      <div className="flex items-center justify-between text-xs text-[#8A7567] mb-2">
                        <span>OCR progress</span>
                        <span>{ocrProgress}%</span>
                      </div>

                      <div className="h-2 bg-[#F1E8E0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C97B63] transition-all duration-300"
                          style={{
                            width: `${ocrProgress}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* EXTRACTED TEXT PREVIEW */}

                  {decodedText && (
                    <div className="mt-7">

                      <div className="flex items-center gap-2 mb-3">
                        <ScanText
                          size={16}
                          className="text-[#C97B63]"
                        />

                        <p className="text-sm font-semibold text-[#5A4638]">
                          OCR extracted text
                        </p>
                      </div>

                      <div className="bg-[#FBF6F0] border border-[#E8DCD2] rounded-xl p-4 max-h-40 overflow-y-auto">
                        <p className="text-sm leading-6 text-[#756052] whitespace-pre-line">
                          {decodedText}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* LOADER */}

                  {processingStep === "ai" && (
                    <div className="flex items-center justify-center gap-2 mt-7 text-sm text-[#8A7567]">
                      <Loader2
                        size={17}
                        className="animate-spin text-[#C97B63]"
                      />
                      Generating summary...
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
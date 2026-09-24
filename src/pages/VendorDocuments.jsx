import React, { useMemo, useState } from "react";
import {
  Upload,
  FileText,
  Search,
  ChevronRight,
  CheckCircle2,
  Clock3,
  AlertCircle,
  X,
  Eye,
  Download,
  Replace,
  Trash2,
  ShieldCheck,
  UserRound,
  MapPin,
  BadgeCheck,
  ReceiptText,
  FolderOpen,
  Image as ImageIcon,
  File,
  Plus,
  Camera,
  ClipboardList,
  CalendarDays,
  Navigation,
} from "lucide-react";
import VendorNavbar from "../components/VendorNavbar";

const initialDocuments = [
  {
    id: 1,
    name: "Identity Proof",
    description:
      "Government-issued identity document added to your StreetBridge records.",
    status: "Added",
    category: "Identity",
    fileName: "identity-proof.pdf",
    fileType: "PDF",
    uploadedOn: "18 Sep 2026",
    size: "1.2 MB",
    icon: UserRound,
  },
  {
    id: 2,
    name: "Address Proof",
    description:
      "Document used to maintain your address record.",
    status: "Added",
    category: "Address",
    fileName: "address-proof.jpg",
    fileType: "Image",
    uploadedOn: "18 Sep 2026",
    size: "845 KB",
    icon: MapPin,
  },
  {
    id: 3,
    name: "Vending Certificate",
    description:
      "Add your vending-related certificate or available supporting record.",
    status: "Not Added",
    category: "Vending Proof",
    fileName: "",
    fileType: "",
    uploadedOn: "",
    size: "",
    icon: BadgeCheck,
  },
  {
    id: 4,
    name: "Application / Registration Receipt",
    description:
      "Receipt or acknowledgement related to your vendor application or registration.",
    status: "Pending Review",
    category: "Application",
    fileName: "registration-receipt.pdf",
    fileType: "PDF",
    uploadedOn: "16 Sep 2026",
    size: "620 KB",
    icon: ReceiptText,
  },
  {
    id: 5,
    name: "Other Supporting Document",
    description:
      "Store any additional document that may be useful for your records.",
    status: "Not Added",
    category: "Other",
    fileName: "",
    fileType: "",
    uploadedOn: "",
    size: "",
    icon: FolderOpen,
  },
];

const initialRecords = [
  {
    id: 1,
    title: "Market-area incident",
    date: "20 Sep 2026",
    time: "04:15 PM",
    location: "Sector 18 Market",
    description:
      "Personal record created regarding an incident at the selected vending area.",
    hasImage: true,
    relatedNotice: "Vendor Registration Drive",
  },
  {
    id: 2,
    title: "Notice-related record",
    date: "18 Sep 2026",
    time: "11:20 AM",
    location: "Sector 18",
    description:
      "A personal record linked to a notice received by the vendor.",
    hasImage: false,
    relatedNotice: "Documentation Verification Notice",
  },
];

const statusStyles = {
  Added: {
    badge: "bg-[#EAF1EA] text-[#5D765F]",
    icon: CheckCircle2,
  },
  "Pending Review": {
    badge: "bg-[#F4ECDE] text-[#8C713E]",
    icon: Clock3,
  },
  "Not Added": {
    badge: "bg-[#F4ECE7] text-[#9A7766]",
    icon: AlertCircle,
  },
};

const categoryFilters = [
  "All",
  "Identity",
  "Address",
  "Vending Proof",
  "Application",
  "Other",
];

export default function VendorDocuments() {
  const [activeTab, setActiveTab] =
    useState("documents");

  const [documents, setDocuments] =
    useState(initialDocuments);

  const [records, setRecords] =
    useState(initialRecords);

  const [selectedDocument, setSelectedDocument] =
    useState(initialDocuments[0]);

  const [selectedRecord, setSelectedRecord] =
    useState(initialRecords[0]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showUpload, setShowUpload] =
    useState(false);

  const [uploadTarget, setUploadTarget] =
    useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [showIncident, setShowIncident] =
    useState(false);

  const [incident, setIncident] =
    useState({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      relatedNotice: "",
      image: null,
    });

  const [viewFile, setViewFile] =
    useState(false);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        doc.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        doc.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [documents, search, category]);

  const addedCount = documents.filter(
    (doc) => doc.status === "Added"
  ).length;

  const pendingCount = documents.filter(
    (doc) =>
      doc.status === "Pending Review"
  ).length;

  const missingCount = documents.filter(
    (doc) => doc.status === "Not Added"
  ).length;

  const openUpload = (document) => {
    setUploadTarget(document);
    setSelectedFile(null);
    setShowUpload(true);
  };

  const closeUpload = () => {
    setShowUpload(false);
    setUploadTarget(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const saveDocument = () => {
    if (!selectedFile || !uploadTarget) return;

    const fileType = selectedFile.type.includes(
      "pdf"
    )
      ? "PDF"
      : "Image";

    const updated = {
      ...uploadTarget,
      status: "Pending Review",
      fileName: selectedFile.name,
      fileType,
      uploadedOn:
        new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      size:
        selectedFile.size <
        1024 * 1024
          ? `${Math.round(
              selectedFile.size / 1024
            )} KB`
          : `${(
              selectedFile.size /
              (1024 * 1024)
            ).toFixed(1)} MB`,
    };

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === updated.id
          ? updated
          : doc
      )
    );

    setSelectedDocument(updated);
    closeUpload();
  };

  const removeDocument = (document) => {
    const updated = {
      ...document,
      status: "Not Added",
      fileName: "",
      fileType: "",
      uploadedOn: "",
      size: "",
    };

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === document.id
          ? updated
          : doc
      )
    );

    setSelectedDocument(updated);
  };

  const updateIncident = (
    field,
    value
  ) => {
    setIncident((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveIncident = () => {
    if (
      !incident.title ||
      !incident.description
    ) {
      alert(
        "Please add an incident title and description."
      );
      return;
    }

    const newRecord = {
      id: Date.now(),
      title: incident.title,
      date:
        incident.date ||
        new Date().toLocaleDateString(
          "en-IN"
        ),
      time:
        incident.time || "Time not added",
      location:
        incident.location ||
        "Location not added",
      description:
        incident.description,
      hasImage: !!incident.image,
      relatedNotice:
        incident.relatedNotice ||
        "None linked",
    };

    setRecords((prev) => [
      newRecord,
      ...prev,
    ]);

    setSelectedRecord(newRecord);
    setIncident({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      relatedNotice: "",
      image: null,
    });

    setShowIncident(false);
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
                Records & Documents
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31]">
                Keep your records in one place.
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
                Manage your documents and maintain a private record of
                incidents, notes and supporting information.
              </p>
            </div>

            {activeTab === "documents" ? (
              <button
                onClick={() =>
                  openUpload(selectedDocument)
                }
                className="inline-flex items-center justify-center gap-2 bg-[#C97B63] text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#B86D56]"
              >
                <Upload size={18} />
                Upload Document
              </button>
            ) : (
              <button
                onClick={() =>
                  setShowIncident(true)
                }
                className="inline-flex items-center justify-center gap-2 bg-[#C97B63] text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#B86D56]"
              >
                <Plus size={18} />
                Add Incident Record
              </button>
            )}
          </div>

          {/* TABS */}

          <div className="flex gap-2 mt-7 border-b border-[#E8DCD2]">

            <button
              onClick={() =>
                setActiveTab("documents")
              }
              className={`px-5 py-3 text-sm font-semibold border-b-2 ${
                activeTab === "documents"
                  ? "border-[#C97B63] text-[#C97B63]"
                  : "border-transparent text-[#8A7567]"
              }`}
            >
              Documents
            </button>

            <button
              onClick={() =>
                setActiveTab("records")
              }
              className={`px-5 py-3 text-sm font-semibold border-b-2 ${
                activeTab === "records"
                  ? "border-[#C97B63] text-[#C97B63]"
                  : "border-transparent text-[#8A7567]"
              }`}
            >
              My Records
            </button>

          </div>

          {/* ================================================= */}
          {/* DOCUMENTS */}
          {/* ================================================= */}

          {activeTab === "documents" && (
            <>
              {/* STATUS */}

              <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E8DCD2]">

                <div className="py-6 pr-5 border-r border-[#E8DCD2]">
                  <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                    Documents
                  </p>
                  <p className="text-3xl font-semibold text-[#4E3C31] mt-1">
                    {documents.length
                      .toString()
                      .padStart(2, "0")}
                  </p>
                </div>

                <div className="py-6 px-5 border-r border-[#E8DCD2]">
                  <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                    Added
                  </p>
                  <p className="text-3xl font-semibold text-[#607864] mt-1">
                    {addedCount
                      .toString()
                      .padStart(2, "0")}
                  </p>
                </div>

                <div className="py-6 px-5 border-r border-[#E8DCD2]">
                  <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                    Pending
                  </p>
                  <p className="text-3xl font-semibold text-[#9A8678] mt-1">
                    {pendingCount
                      .toString()
                      .padStart(2, "0")}
                  </p>
                </div>

                <div className="py-6 pl-5">
                  <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                    Not Added
                  </p>
                  <p className="text-3xl font-semibold text-[#A27662] mt-1">
                    {missingCount
                      .toString()
                      .padStart(2, "0")}
                  </p>
                </div>

              </div>

              {/* NOTE */}

              <div className="flex items-start gap-3 mt-7 max-w-3xl">
                <ShieldCheck
                  size={18}
                  className="text-[#C97B63] mt-0.5"
                />

                <p className="text-sm leading-6 text-[#8A7567]">
                  “Added” only means that a document file has been stored in
                  StreetBridge. It does not by itself mean that the document
                  has been officially verified.
                </p>
              </div>

              {/* DOCUMENT WORKSPACE */}

              <div className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

                <div className="grid lg:grid-cols-[370px_1fr] min-h-[680px]">

                  {/* LEFT */}

                  <aside className="bg-[#FBF6F0] border-b lg:border-b-0 lg:border-r border-[#E4D7CC]">

                    <div className="p-5 md:p-6">

                      <div className="flex items-center justify-between mb-5">

                        <div>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678]">
                            Vault
                          </p>

                          <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                            Documents
                          </h2>
                        </div>

                        <span className="text-sm text-[#9A8678]">
                          {documents.length}
                        </span>

                      </div>

                      <div className="relative mb-4">

                        <Search
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A08E81]"
                        />

                        <input
                          value={search}
                          onChange={(e) =>
                            setSearch(e.target.value)
                          }
                          placeholder="Search documents..."
                          className="w-full bg-white border border-[#E2D5CA] rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#C97B63]"
                        />

                      </div>

                      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">

                        {categoryFilters.map(
                          (item) => (
                            <button
                              key={item}
                              onClick={() =>
                                setCategory(item)
                              }
                              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold ${
                                category === item
                                  ? "bg-[#C97B63] text-white"
                                  : "bg-white border border-[#E2D5CA] text-[#7A6658]"
                              }`}
                            >
                              {item}
                            </button>
                          )
                        )}

                      </div>

                      <div className="space-y-2">

                        {filteredDocuments.map(
                          (document) => {

                            const active =
                              selectedDocument.id ===
                              document.id;

                            const Icon =
                              document.icon ||
                              FileText;

                            const Status =
                              statusStyles[
                                document.status
                              ];

                            return (
                              <button
                                key={document.id}
                                onClick={() =>
                                  setSelectedDocument(
                                    document
                                  )
                                }
                                className={`w-full text-left px-4 py-4 rounded-xl border transition ${
                                  active
                                    ? "bg-white border-[#D8B5A3]"
                                    : "border-transparent hover:bg-white hover:border-[#E7DCD3]"
                                }`}
                              >

                                <div className="flex items-start gap-3">

                                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DCD2] flex items-center justify-center">
                                    <Icon
                                      size={17}
                                      className="text-[#C97B63]"
                                    />
                                  </div>

                                  <div className="flex-1">

                                    <p className="text-sm font-semibold text-[#58463A]">
                                      {document.name}
                                    </p>

                                    <div className="flex items-center justify-between mt-2">

                                      <span
                                        className={`text-[10px] font-semibold px-2 py-1 rounded-full ${Status.badge}`}
                                      >
                                        {document.status}
                                      </span>

                                      <ChevronRight
                                        size={15}
                                        className="text-[#B5A397]"
                                      />

                                    </div>

                                  </div>
                                </div>

                              </button>
                            );
                          }
                        )}

                      </div>

                    </div>
                  </aside>

                  {/* RIGHT */}

                  <section className="bg-white">

                    <div className="p-6 md:p-8 lg:p-10">

                      <div className="flex flex-col md:flex-row md:justify-between gap-6 pb-7 border-b border-[#EAE1DA]">

                        <div>

                          <span
                            className={`inline-flex text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyles[selectedDocument.status].badge}`}
                          >
                            {selectedDocument.status}
                          </span>

                          <h2 className="text-3xl md:text-4xl font-semibold text-[#4E3C31] mt-4">
                            {selectedDocument.name}
                          </h2>

                          <p className="mt-3 max-w-2xl text-[#8A7567] leading-7">
                            {selectedDocument.description}
                          </p>

                        </div>

                        <div className="w-12 h-12 rounded-xl bg-[#FBE8DE] flex items-center justify-center">
                          {React.createElement(
                            selectedDocument.icon ||
                              FileText,
                            {
                              size: 22,
                              className:
                                "text-[#C97B63]",
                            }
                          )}
                        </div>

                      </div>

                      {/* FILE */}

                      <div className="py-8 border-b border-[#EAE1DA]">

                        {selectedDocument.fileName ? (
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                            <div className="flex items-center gap-4">

                              <div className="w-12 h-12 rounded-xl bg-[#F7F0E9] flex items-center justify-center">

                                {selectedDocument.fileType ===
                                "Image" ? (
                                  <ImageIcon
                                    size={21}
                                    className="text-[#8A7567]"
                                  />
                                ) : (
                                  <File
                                    size={21}
                                    className="text-[#8A7567]"
                                  />
                                )}

                              </div>

                              <div>

                                <p className="font-semibold text-[#5A4638]">
                                  {selectedDocument.fileName}
                                </p>

                                <p className="text-sm text-[#9A8678] mt-1">
                                  {selectedDocument.fileType} ·{" "}
                                  {selectedDocument.size} ·{" "}
                                  {selectedDocument.uploadedOn}
                                </p>

                              </div>

                            </div>

                            <div className="flex gap-2">

                              <button
                                onClick={() =>
                                  setViewFile(true)
                                }
                                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DED1C6] rounded-lg text-sm"
                              >
                                <Eye size={16} />
                                Preview
                              </button>

                              <button
                                onClick={() =>
                                  openUpload(
                                    selectedDocument
                                  )
                                }
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                              >
                                <Replace size={16} />
                                Replace
                              </button>

                            </div>

                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-[#DCCABE] rounded-2xl p-10 text-center">

                            <div className="w-14 h-14 mx-auto rounded-full bg-[#FBE8DE] flex items-center justify-center">
                              <Upload
                                size={22}
                                className="text-[#C97B63]"
                              />
                            </div>

                            <h3 className="text-lg font-semibold text-[#57463A] mt-4">
                              No document added yet
                            </h3>

                            <p className="text-sm text-[#9A8678] mt-2">
                              Add the file to keep it with your records.
                            </p>

                            <button
                              onClick={() =>
                                openUpload(
                                  selectedDocument
                                )
                              }
                              className="mt-5 px-5 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                            >
                              Upload Document
                            </button>

                          </div>
                        )}

                      </div>

                      {/* INFO */}

                      <div className="py-8">

                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                          Document information
                        </p>

                        <div className="grid md:grid-cols-3 mt-4">

                          <div className="py-4 md:pr-6 border-b md:border-b-0 md:border-r border-[#EAE1DA]">
                            <p className="text-xs text-[#9A8678]">
                              Category
                            </p>

                            <p className="font-semibold mt-1">
                              {selectedDocument.category}
                            </p>
                          </div>

                          <div className="py-4 md:px-6 border-b md:border-b-0 md:border-r border-[#EAE1DA]">
                            <p className="text-xs text-[#9A8678]">
                              File
                            </p>

                            <p className="font-semibold mt-1">
                              {selectedDocument.fileType ||
                                "Not available"}
                            </p>
                          </div>

                          <div className="py-4 md:pl-6">
                            <p className="text-xs text-[#9A8678]">
                              Updated
                            </p>

                            <p className="font-semibold mt-1">
                              {selectedDocument.uploadedOn ||
                                "—"}
                            </p>
                          </div>

                        </div>

                        {selectedDocument.fileName && (
                          <button
                            onClick={() =>
                              removeDocument(
                                selectedDocument
                              )
                            }
                            className="mt-7 inline-flex items-center gap-2 text-sm text-[#8D6E61] hover:text-[#A45D45]"
                          >
                            <Trash2 size={15} />
                            Remove document
                          </button>
                        )}

                      </div>

                    </div>
                  </section>
                </div>
              </div>
            </>
          )}

          {/* ================================================= */}
          {/* MY RECORDS */}
          {/* ================================================= */}

          {activeTab === "records" && (
            <section className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

              <div className="grid lg:grid-cols-[370px_1fr] min-h-[680px]">

                {/* LEFT RECORD LIST */}

                <aside className="bg-[#FBF6F0] border-b lg:border-b-0 lg:border-r border-[#E4D7CC] p-5 md:p-6">

                  <div className="flex items-center justify-between mb-6">

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678]">
                        Private records
                      </p>

                      <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                        My Records
                      </h2>
                    </div>

                    <span className="text-sm text-[#9A8678]">
                      {records.length}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      setShowIncident(true)
                    }
                    className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-[#D5BBAA] rounded-xl text-sm font-semibold text-[#A26751] hover:bg-white mb-5"
                  >
                    <Plus size={15} />
                    Add incident record
                  </button>

                  <div className="space-y-2">

                    {records.map((record) => {

                      const active =
                        selectedRecord.id ===
                        record.id;

                      return (
                        <button
                          key={record.id}
                          onClick={() =>
                            setSelectedRecord(record)
                          }
                          className={`w-full text-left p-4 rounded-xl border transition ${
                            active
                              ? "bg-white border-[#D8B5A3]"
                              : "border-transparent hover:bg-white hover:border-[#E7DCD3]"
                          }`}
                        >

                          <div className="flex items-start gap-3">

                            <div className="w-9 h-9 rounded-lg bg-[#FBE8DE] flex items-center justify-center">
                              <Camera
                                size={17}
                                className="text-[#C97B63]"
                              />
                            </div>

                            <div className="flex-1">

                              <p className="text-sm font-semibold text-[#58463A]">
                                {record.title}
                              </p>

                              <p className="text-xs text-[#9A8678] mt-1">
                                {record.date}
                              </p>

                              <div className="flex items-center justify-between mt-2">

                                <span className="text-[10px] px-2 py-1 rounded-full bg-[#F1ECE6] text-[#756052]">
                                  {record.hasImage
                                    ? "Photo attached"
                                    : "No photo"}
                                </span>

                                <ChevronRight
                                  size={14}
                                  className="text-[#B5A397]"
                                />

                              </div>

                            </div>

                          </div>

                        </button>
                      );
                    })}

                  </div>

                </aside>

                {/* RIGHT RECORD DETAIL */}

                <section className="bg-white">

                  <div className="p-6 md:p-8 lg:p-10">

                    <div className="pb-7 border-b border-[#EAE1DA]">

                      <div className="flex items-center gap-2 mb-4">

                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FBE8DE] text-[#A45D45]">
                          Personal Record
                        </span>

                      </div>

                      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#4E3C31]">
                        {selectedRecord.title}
                      </h2>

                      <div className="flex flex-wrap gap-5 mt-5 text-sm text-[#8A7567]">

                        <span className="inline-flex items-center gap-2">
                          <CalendarDays size={15} />
                          {selectedRecord.date}
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <Clock3 size={15} />
                          {selectedRecord.time}
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <MapPin size={15} />
                          {selectedRecord.location}
                        </span>

                      </div>

                    </div>

                    <div className="py-8 border-b border-[#EAE1DA]">

                      <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                        What happened
                      </p>

                      <p className="mt-4 text-lg leading-8 text-[#665246] max-w-3xl">
                        {selectedRecord.description}
                      </p>

                    </div>

                    <div className="grid md:grid-cols-2 border-b border-[#EAE1DA]">

                      <div className="py-7 md:pr-8 md:border-r border-[#EAE1DA]">

                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                          Supporting record
                        </p>

                        <div className="flex items-center gap-3 mt-3">

                          <ImageIcon
                            size={18}
                            className="text-[#C97B63]"
                          />

                          <p className="font-semibold text-[#5A4638]">
                            {selectedRecord.hasImage
                              ? "Photo attached"
                              : "No photo attached"}
                          </p>

                        </div>

                      </div>

                      <div className="py-7 md:pl-8">

                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                          Related notice
                        </p>

                        <div className="flex items-center gap-3 mt-3">

                          <FileText
                            size={18}
                            className="text-[#C97B63]"
                          />

                          <p className="font-semibold text-[#5A4638]">
                            {selectedRecord.relatedNotice}
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="pt-8">

                      <div className="flex items-start gap-3 max-w-3xl">

                        <ShieldCheck
                          size={17}
                          className="text-[#9A8678] mt-1"
                        />

                        <p className="text-sm leading-6 text-[#8A7567]">
                          This is a personal record created by the vendor. It
                          does not by itself determine whether an incident,
                          action or claim is legally established.
                        </p>

                      </div>

                    </div>

                  </div>
                </section>

              </div>
            </section>
          )}

          {/* FOOTNOTE */}

          <div className="flex items-start gap-3 max-w-3xl py-7">

            <AlertCircle
              size={16}
              className="text-[#9A8678] mt-1"
            />

            <p className="text-sm leading-6 text-[#8A7567]">
              Frontend demo data is stored only in the current browser
              session. Permanent storage can be connected later through your
              backend.
            </p>

          </div>

        </div>
      </main>

      {/* ================================================= */}
      {/* DOCUMENT UPLOAD MODAL */}
      {/* ================================================= */}

      {showUpload && (
        <div className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DCD2]">

              <div>

                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#C97B63]">
                  Document Vault
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Upload{" "}
                  {uploadTarget?.name ||
                    "document"}
                </h2>

              </div>

              <button
                onClick={closeUpload}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F8EEE7]"
              >
                <X size={19} />
              </button>

            </div>

            <div className="p-6">

              <label
                htmlFor="document-upload"
                className="block border-2 border-dashed border-[#DCCABE] rounded-2xl p-10 text-center cursor-pointer hover:border-[#C97B63] hover:bg-[#FFF9F4]"
              >

                <div className="w-14 h-14 mx-auto rounded-full bg-[#FBE8DE] flex items-center justify-center">

                  <Upload
                    size={23}
                    className="text-[#C97B63]"
                  />

                </div>

                <h3 className="text-lg font-semibold text-[#57463A] mt-5">
                  {selectedFile
                    ? selectedFile.name
                    : "Choose a document"}
                </h3>

                <p className="text-sm text-[#9A8678] mt-2">
                  PDF, JPG, PNG or WEBP
                </p>

                <div className="inline-flex mt-5 px-5 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold">
                  Browse files
                </div>

                <input
                  id="document-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

              </label>

              <button
                onClick={saveDocument}
                disabled={!selectedFile}
                className="w-full mt-6 py-3.5 bg-[#C97B63] text-white rounded-xl font-semibold disabled:opacity-40"
              >
                Save Document
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* INCIDENT MODAL */}
      {/* ================================================= */}

      {showIncident && (
        <div className="fixed inset-0 z-[110] bg-black/35 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DCD2]">

              <div>

                <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-semibold">
                  My Records
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Add incident record
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowIncident(false)
                }
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F8EEE7]"
              >
                <X size={19} />
              </button>

            </div>

            <div className="p-6">

              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="text-sm font-semibold text-[#5A4638]">
                    Record title
                  </label>

                  <input
                    value={incident.title}
                    onChange={(e) =>
                      updateIncident(
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Example: Market-area incident"
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#5A4638]">
                    Location
                  </label>

                  <input
                    value={incident.location}
                    onChange={(e) =>
                      updateIncident(
                        "location",
                        e.target.value
                      )
                    }
                    placeholder="Market / area"
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#5A4638]">
                    Date
                  </label>

                  <input
                    type="date"
                    value={incident.date}
                    onChange={(e) =>
                      updateIncident(
                        "date",
                        e.target.value
                      )
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#5A4638]">
                    Time
                  </label>

                  <input
                    type="time"
                    value={incident.time}
                    onChange={(e) =>
                      updateIncident(
                        "time",
                        e.target.value
                      )
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

              </div>

              <div className="mt-5">

                <label className="text-sm font-semibold text-[#5A4638]">
                  What happened?
                </label>

                <textarea
                  value={incident.description}
                  onChange={(e) =>
                    updateIncident(
                      "description",
                      e.target.value
                    )
                  }
                  rows={6}
                  placeholder="Describe what happened in your own words..."
                  className="w-full mt-2 border border-[#DED1C6] rounded-xl px-4 py-3 text-sm leading-6 outline-none focus:border-[#C97B63] resize-none"
                />

              </div>

              <div className="mt-5">

                <label className="text-sm font-semibold text-[#5A4638]">
                  Related notice
                </label>

                <input
                  value={incident.relatedNotice}
                  onChange={(e) =>
                    updateIncident(
                      "relatedNotice",
                      e.target.value
                    )
                  }
                  placeholder="Optional"
                  className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                />

              </div>

              <div className="mt-5">

                <label
                  htmlFor="incident-photo"
                  className="block border-2 border-dashed border-[#DCCABE] rounded-xl p-6 text-center cursor-pointer hover:bg-[#FFF9F4] hover:border-[#C97B63]"
                >

                  <Camera
                    size={25}
                    className="mx-auto text-[#C97B63]"
                  />

                  <p className="text-sm font-semibold text-[#5A4638] mt-3">
                    {incident.image
                      ? incident.image.name
                      : "Attach a photo"}
                  </p>

                  <p className="text-xs text-[#9A8678] mt-1">
                    Optional
                  </p>

                  <input
                    id="incident-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      updateIncident(
                        "image",
                        e.target.files?.[0] ||
                          null
                      )
                    }
                  />

                </label>

              </div>

              <button
                onClick={saveIncident}
                className="w-full mt-6 py-3.5 bg-[#C97B63] text-white rounded-xl font-semibold hover:bg-[#B86D56]"
              >
                Save Record
              </button>

            </div>
          </div>
        </div>
      )}

      {/* PREVIEW */}

      {viewFile &&
        selectedDocument.fileName && (
          <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DCD2]">

                <h2 className="font-semibold text-[#4E3C31]">
                  {selectedDocument.fileName}
                </h2>

                <button
                  onClick={() =>
                    setViewFile(false)
                  }
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F8EEE7]"
                >
                  <X size={18} />
                </button>

              </div>

              <div className="p-6">

                <div className="min-h-[350px] bg-[#FBF6F0] border border-[#E8DCD2] rounded-xl flex items-center justify-center text-center p-8">

                  <div>

                    <FileText
                      size={45}
                      className="mx-auto text-[#B5A397]"
                    />

                    <p className="font-semibold mt-4 text-[#5A4638]">
                      Document Preview
                    </p>

                    <p className="text-sm text-[#9A8678] mt-2">
                      Actual file preview can be connected when storage is
                      integrated.
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setViewFile(false)
                  }
                  className="mt-5 w-full py-3 border border-[#DED1C6] rounded-lg text-sm font-semibold"
                >
                  Close
                </button>

              </div>
            </div>
          </div>
        )}
    </div>
  );
}
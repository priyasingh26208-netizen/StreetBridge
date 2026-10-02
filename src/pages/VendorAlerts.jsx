import React, { useMemo, useState } from "react";
import {
  Bell,
  MapPin,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
  FileText,
  Clock3,
  Search,
  X,
  Check,
  SlidersHorizontal,
  Megaphone,
  ShieldAlert,
  UserRound,
  Plus,
  Loader2,
} from "lucide-react";
import VendorNavbar from "../components/VendorNavbar";
import { createAlert as requestCreateAlert } from "../services/aiApi";

const initialAlerts = [
  {
    id: 1,
    title: "Registration camp near your working area",
    type: "Area Update",
    source: "Municipal Zone Office",
    date: "18 Sep 2026",
    time: "10:00 AM",
    location: "Sector 18 Market",
    status: "Unread",
    priority: "Important",
    tag: "Public Information",
    message:
      "A vendor registration and documentation facilitation camp has been announced for the Sector 18 Market area.",
    action:
      "Check the official notice in the Notices section for the event details and documents mentioned there.",
  },
  {
    id: 2,
    title: "Your registration receipt is still pending review",
    type: "Document",
    source: "StreetBridge",
    date: "16 Sep 2026",
    time: "4:20 PM",
    location: "Your records",
    status: "Unread",
    priority: "Reminder",
    tag: "Your Account",
    message:
      "The application / registration receipt in your document vault is currently marked as Pending Review.",
    action:
      "Open Documents to review the uploaded file and replace it if the document is unclear or incorrect.",
  },
  {
    id: 3,
    title: "Market-area information update",
    type: "Information",
    source: "Local Administration",
    date: "14 Sep 2026",
    time: "12:15 PM",
    location: "Sector 18",
    status: "Read",
    priority: "Normal",
    tag: "Public Information",
    message:
      "A public information update has been issued for activities and arrangements in your selected working area.",
    action:
      "Open the related notice and review the dates and instructions provided by the issuing authority.",
  },
  {
    id: 4,
    title: "Document reminder",
    type: "Document",
    source: "StreetBridge",
    date: "12 Sep 2026",
    time: "9:30 AM",
    location: "Your records",
    status: "Read",
    priority: "Reminder",
    tag: "Your Account",
    message:
      "Your document vault currently shows one document as Not Added.",
    action:
      "Open Documents and check whether you have a relevant vending-related record to upload.",
  },
  {
    id: 5,
    title: "Community-reported activity in market area",
    type: "Community",
    source: "Community Report",
    date: "10 Sep 2026",
    time: "6:40 PM",
    location: "Sector 18 Market",
    status: "Read",
    priority: "Normal",
    tag: "Community Report",
    message:
      "A community member reported activity in the Sector 18 Market area through StreetBridge.",
    action:
      "Treat this as community-reported information and confirm important details through an official source.",
  },
];

const alertStyles = {
  "Area Update": {
    badge: "bg-[#FBE8DE] text-[#A45D45]",
    iconBg: "bg-[#FBE8DE]",
    icon: MapPin,
    iconColor: "text-[#C97B63]",
  },
  Document: {
    badge: "bg-[#F1ECE6] text-[#756052]",
    iconBg: "bg-[#F1ECE6]",
    icon: FileText,
    iconColor: "text-[#857264]",
  },
  Information: {
    badge: "bg-[#EAF1EA] text-[#58705E]",
    iconBg: "bg-[#EAF1EA]",
    icon: Info,
    iconColor: "text-[#718E75]",
  },
  Community: {
    badge: "bg-[#EEEAF3] text-[#6D6280]",
    iconBg: "bg-[#EEEAF3]",
    icon: Megaphone,
    iconColor: "text-[#81758F]",
  },
};

const filterOptions = [
  "All",
  "Area Update",
  "Document",
  "Information",
  "Community",
];

export default function VendorAlerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(
    initialAlerts[0]
  );

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [creatingAlert, setCreatingAlert] = useState(false);
  const [createError, setCreateError] = useState("");
  const [alertForm, setAlertForm] = useState({
    title: "",
    message: "",
    alert_type: "notice",
    deadline: "",
  });

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const searchMatch =
        alert.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        alert.type
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        alert.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const filterMatch =
        filter === "All" || alert.type === filter;

      return searchMatch && filterMatch;
    });
  }, [alerts, filter, search]);

  const unreadCount = alerts.filter(
    (alert) => alert.status === "Unread"
  ).length;

  const markAsRead = (alert) => {
    const updated = {
      ...alert,
      status: "Read",
    };

    setSelectedAlert(updated);

    setAlerts((prev) =>
      prev.map((item) =>
        item.id === alert.id ? updated : item
      )
    );
  };

  const markAllAsRead = () => {
    const updatedAlerts = alerts.map((alert) => ({
      ...alert,
      status: "Read",
    }));

    setAlerts(updatedAlerts);

    const selected = updatedAlerts.find(
      (alert) => alert.id === selectedAlert.id
    );

    if (selected) {
      setSelectedAlert(selected);
    }
  };

  const handleCreateAlert = async (event) => {
    event.preventDefault();

    const deadline = alertForm.deadline
      ? alertForm.deadline.split("-").reverse().join("/")
      : null;

    setCreateError("");
    setCreatingAlert(true);

    try {
      const response = await requestCreateAlert({
        ...alertForm,
        deadline,
      });
      const generated = response.data;

      if (!generated || typeof generated !== "object") {
        throw new Error("AI service is currently unavailable. Please try again.");
      }

      const typeLabels = {
        notice: "Information",
        document: "Document",
        area_update: "Area Update",
        general: "Information",
      };
      const date = new Date();
      const priority = generated.priority === "high" || generated.priority === "expired"
        ? "Important"
        : generated.priority === "medium"
        ? "Reminder"
        : "Normal";
      const newAlert = {
        id: `created-${Date.now()}`,
        title: generated.title || alertForm.title,
        type: typeLabels[generated.type] || "Information",
        source: "StreetBridge",
        date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: date.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
        }),
        location: "Sector 18",
        status: "Unread",
        priority,
        tag: "AI-generated alert",
        message: generated.message || alertForm.message,
        action: generated.deadline
          ? `Keep the ${generated.deadline} deadline in mind and confirm the instructions with the issuing authority.`
          : "Review the alert details and confirm important information with the issuing authority.",
      };

      setAlerts((prev) => [newAlert, ...prev]);
      setSelectedAlert(newAlert);
      setAlertForm({
        title: "",
        message: "",
        alert_type: "notice",
        deadline: "",
      });
      setShowCreateAlert(false);
    } catch (error) {
      setCreateError(error.message || "AI service is currently unavailable. Please try again.");
    } finally {
      setCreatingAlert(false);
    }
  };

  const selectAlert = (alert) => {
    setSelectedAlert(alert);

    if (alert.status === "Unread") {
      markAsRead(alert);
    }
  };

  const getIcon = (type) => {
    return alertStyles[type]?.icon || Bell;
  };

  const getIconColor = (type) => {
    return (
      alertStyles[type]?.iconColor ||
      "text-[#C97B63]"
    );
  };

  const getIconBg = (type) => {
    return (
      alertStyles[type]?.iconBg ||
      "bg-[#FBE8DE]"
    );
  };

  const selectedIcon = getIcon(selectedAlert.type);
  const SelectedIcon = selectedIcon;

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
                Alerts & Updates
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31]">
                Stay informed about what matters.
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
                See area-based information, document reminders and community
                updates connected to your StreetBridge account.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setCreateError("");
                  setShowCreateAlert((visible) => !visible);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C97B63] rounded-lg text-sm font-semibold text-white hover:bg-[#B86D56] transition"
              >
                <Plus size={16} />
                Create alert
              </button>

              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#DED1C6] rounded-lg text-sm font-semibold text-[#665347] hover:bg-[#FFF9F4] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Check size={16} />
                Mark all as read
              </button>
            </div>
          </div>

          {showCreateAlert && (
            <form
              onSubmit={handleCreateAlert}
              className="grid md:grid-cols-2 gap-4 py-6 border-b border-[#E8DCD2]"
            >
              <label className="text-sm font-semibold text-[#5A4638]">
                Alert title
                <input
                  required
                  value={alertForm.title}
                  onChange={(event) => setAlertForm((prev) => ({ ...prev, title: event.target.value }))}
                  className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm font-normal outline-none focus:border-[#C97B63]"
                />
              </label>

              <label className="text-sm font-semibold text-[#5A4638]">
                Alert type
                <select
                  value={alertForm.alert_type}
                  onChange={(event) => setAlertForm((prev) => ({ ...prev, alert_type: event.target.value }))}
                  className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm font-normal outline-none focus:border-[#C97B63]"
                >
                  <option value="notice">Notice</option>
                  <option value="document">Document</option>
                  <option value="area_update">Area update</option>
                  <option value="general">General</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-[#5A4638] md:col-span-2">
                Message
                <textarea
                  required
                  rows={3}
                  value={alertForm.message}
                  onChange={(event) => setAlertForm((prev) => ({ ...prev, message: event.target.value }))}
                  className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm font-normal leading-6 outline-none focus:border-[#C97B63] resize-y"
                />
              </label>

              <label className="text-sm font-semibold text-[#5A4638]">
                Deadline
                <input
                  type="date"
                  value={alertForm.deadline}
                  onChange={(event) => setAlertForm((prev) => ({ ...prev, deadline: event.target.value }))}
                  className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm font-normal outline-none focus:border-[#C97B63]"
                />
              </label>

              <div className="flex items-end gap-3">
                <button
                  type="submit"
                  disabled={creatingAlert || !alertForm.title.trim() || !alertForm.message.trim()}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {creatingAlert && <Loader2 size={15} className="animate-spin" />}
                  {creatingAlert ? "Creating..." : "Create alert"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateAlert(false)}
                  className="px-4 py-3 border border-[#DED1C6] rounded-lg text-sm font-semibold text-[#665347]"
                >
                  Cancel
                </button>
              </div>

              {createError && (
                <p role="alert" className="md:col-span-2 text-sm text-[#A94F45]">
                  {createError}
                </p>
              )}
            </form>
          )}

          {/* ================================================= */}
          {/* SUMMARY STRIP */}
          {/* ================================================= */}

          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E8DCD2]">

            <div className="py-6 pr-5 border-r border-[#E8DCD2]">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Total alerts
              </p>

              <p className="text-3xl font-semibold text-[#4E3C31] mt-1">
                {alerts.length.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="py-6 px-5 border-r border-[#E8DCD2]">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Unread
              </p>

              <p className="text-3xl font-semibold text-[#C97B63] mt-1">
                {unreadCount.toString().padStart(2, "0")}
              </p>
            </div>

            <div className="py-6 px-5 border-r border-[#E8DCD2]">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Working area
              </p>

              <p className="text-base font-semibold text-[#4E3C31] mt-2">
                Sector 18
              </p>
            </div>

            <div className="py-6 pl-5">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Delivery
              </p>

              <p className="text-sm font-semibold text-[#607564] mt-2">
                Location-aware
              </p>
            </div>

          </div>

          {/* ================================================= */}
          {/* HOW ALERTS WORK */}
          {/* ================================================= */}

          <section className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="px-6 md:px-8 py-6 bg-[#FBF6F0] border-b border-[#E4D7CC]">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                  <Bell
                    size={19}
                    className="text-[#C97B63]"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                    StreetBridge alerts
                  </p>

                  <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                    Information matched to your account
                  </h2>
                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div>
                  <p className="text-sm font-semibold text-[#5A4638]">
                    Area
                  </p>

                  <p className="text-xs text-[#8A7567] leading-5 mt-1">
                    Information connected to your selected working area.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#5A4638]">
                    Documents
                  </p>

                  <p className="text-xs text-[#8A7567] leading-5 mt-1">
                    Reminders related to your document records.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#5A4638]">
                    Public updates
                  </p>

                  <p className="text-xs text-[#8A7567] leading-5 mt-1">
                    Public information and clearly labelled community reports.
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* MAIN ALERT WORKSPACE */}
          {/* ================================================= */}

          <section className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="grid lg:grid-cols-[370px_1fr] min-h-[650px]">

              {/* ================================================= */}
              {/* LEFT */}
              {/* ================================================= */}

              <aside className="bg-[#FBF6F0] border-b lg:border-b-0 lg:border-r border-[#E4D7CC]">

                <div className="p-5 md:p-6">

                  <div className="flex items-center justify-between mb-5">

                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                        Inbox
                      </p>

                      <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                        Alerts
                      </h2>
                    </div>

                    <span className="text-sm text-[#9A8678]">
                      {alerts.length}
                    </span>

                  </div>

                  {/* SEARCH */}

                  <div className="relative">

                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A08E81]"
                    />

                    <input
                      type="text"
                      placeholder="Search alerts..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="w-full bg-white border border-[#E2D5CA] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#5A4638] placeholder:text-[#AA9789] outline-none focus:border-[#C97B63]"
                    />

                  </div>

                  {/* FILTER */}

                  <div className="flex items-center gap-2 mt-4 mb-5">

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
                      {filterOptions.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item === "All"
                            ? "All alerts"
                            : item}
                        </option>
                      ))}
                    </select>

                  </div>

                  {/* ALERT LIST */}

                  <div className="space-y-2">

                    {filteredAlerts.length === 0 ? (
                      <div className="text-center py-12">
                        <Bell
                          size={25}
                          className="mx-auto text-[#B8A79A]"
                        />

                        <p className="mt-3 text-sm text-[#8A7567]">
                          No alerts found.
                        </p>
                      </div>
                    ) : (
                      filteredAlerts.map((alert) => {

                        const active =
                          selectedAlert.id ===
                          alert.id;

                        const Icon = getIcon(
                          alert.type
                        );

                        return (
                          <button
                            key={alert.id}
                            onClick={() =>
                              selectAlert(alert)
                            }
                            className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${
                              active
                                ? "bg-white border-[#D8B5A3] shadow-[0_3px_12px_rgba(90,70,56,0.06)]"
                                : "border-transparent hover:bg-white hover:border-[#E7DCD3]"
                            }`}
                          >

                            <div className="flex items-start gap-3">

                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBg(
                                  alert.type
                                )}`}
                              >

                                <Icon
                                  size={17}
                                  className={getIconColor(
                                    alert.type
                                  )}
                                />

                              </div>

                              <div className="flex-1 min-w-0">

                                <div className="flex items-center gap-2 mb-1">

                                  {alert.status ===
                                    "Unread" && (
                                    <span className="w-2 h-2 rounded-full bg-[#C97B63]" />
                                  )}

                                  <span className="text-[10px] uppercase tracking-wide font-semibold text-[#9A8678]">
                                    {alert.type}
                                  </span>

                                </div>

                                <h3 className="text-[14px] font-semibold text-[#58463A] leading-5">
                                  {alert.title}
                                </h3>

                                <div className="flex items-center justify-between mt-2">

                                  <span className="text-xs text-[#9A8678]">
                                    {alert.date}
                                  </span>

                                  <ArrowRight
                                    size={14}
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

              {/* ================================================= */}
              {/* RIGHT */}
              {/* ================================================= */}

              <section className="bg-white">

                <div className="p-6 md:p-8 lg:p-10">

                  {/* HEADER */}

                  <div className="pb-7 border-b border-[#EAE1DA]">

                    <div className="flex flex-wrap items-center gap-2 mb-4">

                      <span
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                          alertStyles[
                            selectedAlert.type
                          ]?.badge ||
                          "bg-[#FBE8DE] text-[#A45D45]"
                        }`}
                      >
                        {selectedAlert.type}
                      </span>

                      {selectedAlert.priority ===
                        "Important" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A45D45]">
                          <AlertCircle size={14} />
                          Important update
                        </span>
                      )}

                      {selectedAlert.priority ===
                        "Reminder" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B715F]">
                          <Clock3 size={14} />
                          Reminder
                        </span>
                      )}

                    </div>

                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#4E3C31] max-w-3xl">
                      {selectedAlert.title}
                    </h2>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-[#8A7567]">

                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={15} />
                        {selectedAlert.date}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <Clock3 size={15} />
                        {selectedAlert.time}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <MapPin size={15} />
                        {selectedAlert.location}
                      </span>

                    </div>

                  </div>

                  {/* ================================================= */}
                  {/* SOURCE */}
                  {/* ================================================= */}

                  <div className="py-7 border-b border-[#EAE1DA]">

                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                      Source
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="w-9 h-9 rounded-lg bg-[#F8F1EB] flex items-center justify-center">

                        {selectedAlert.source ===
                        "StreetBridge" ? (
                          <ShieldAlert
                            size={17}
                            className="text-[#C97B63]"
                          />
                        ) : selectedAlert.source ===
                          "Community Report" ? (
                          <Megaphone
                            size={17}
                            className="text-[#81758F]"
                          />
                        ) : (
                          <FileText
                            size={17}
                            className="text-[#857264]"
                          />
                        )}

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-[#5A4638]">
                          {selectedAlert.source}
                        </p>

                        <p className="text-xs text-[#9A8678] mt-1">
                          {selectedAlert.tag}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ================================================= */}
                  {/* MESSAGE */}
                  {/* ================================================= */}

                  <div className="py-8 border-b border-[#EAE1DA]">

                    <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                      What this alert says
                    </p>

                    <p className="mt-4 text-lg leading-8 text-[#665246] max-w-3xl">
                      {selectedAlert.message}
                    </p>

                  </div>

                  {/* ================================================= */}
                  {/* NEXT STEP */}
                  {/* ================================================= */}

                  <div className="py-8 border-b border-[#EAE1DA]">

                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-full bg-[#FBE8DE] flex items-center justify-center flex-shrink-0">
                        <ArrowRight
                          size={17}
                          className="text-[#C97B63]"
                        />
                      </div>

                      <div className="max-w-3xl">

                        <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#9A8678]">
                          Suggested next step
                        </p>

                        <p className="mt-2 text-base md:text-lg leading-7 text-[#5F4D42]">
                          {selectedAlert.action}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ================================================= */}
                  {/* ACTIONS */}
                  {/* ================================================= */}

                  <div className="pt-8">

                    <div className="flex flex-wrap gap-3">

                      <button
                        onClick={() =>
                          markAsRead(
                            selectedAlert
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DED1C6] rounded-lg text-sm font-semibold text-[#665347] hover:bg-[#FFF9F4] transition"
                      >
                        <CheckCircle2
                          size={16}
                        />
                        Mark as read
                      </button>

                      <button
                        onClick={() => {
                          alert(
                            "In the backend version, this alert can be linked directly to the relevant notice, document or area page."
                          );
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold hover:bg-[#B86D56] transition"
                      >
                        Open related information
                        <ArrowRight size={15} />
                      </button>

                    </div>

                  </div>

                </div>
              </section>

            </div>

          </section>

          {/* ================================================= */}
          {/* TRUST NOTE */}
          {/* ================================================= */}

          <div className="flex items-start gap-3 max-w-3xl py-7">

            <ShieldAlert
              size={17}
              className="text-[#9A8678] mt-1 flex-shrink-0"
            />

            <p className="text-sm leading-6 text-[#8A7567]">
              Official/public information is shown with its source. Community
              reports are clearly labelled and should be independently
              confirmed before acting on important information.
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}
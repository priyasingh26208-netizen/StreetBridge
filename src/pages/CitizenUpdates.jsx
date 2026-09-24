import React, { useMemo, useState } from "react";
import {
  Search,
  Bell,
  CalendarDays,
  MapPin,
  FileText,
  Info,
  Users,
  Megaphone,
  Clock3,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react";

import CitizenNavbar from "../components/CitizenNavbar";

/* =========================================================
   DEMO UPDATE DATA
   Frontend-only data for now
========================================================= */

const updates = [
  {
    id: 1,
    title: "Documentation Help Camp",
    category: "Documentation",
    area: "Sector 18 Market",
    date: "28 Sep 2026",
    time: "10:00 AM – 2:00 PM",
    source: "Public Information Desk",
    sourceType: "official",
    short:
      "A local help desk will assist visitors with understanding and organizing commonly requested documents.",
    details:
      "A documentation support desk is scheduled for the market area. Visitors can use the desk to understand document requirements, organize their records and ask procedural questions.",
    tags: ["Documents", "Help Desk"],
  },
  {
    id: 2,
    title: "Local Registration Awareness Drive",
    category: "Registration",
    area: "Atta Market",
    date: "30 Sep 2026",
    time: "11:00 AM – 3:00 PM",
    source: "Community Information Centre",
    sourceType: "community",
    short:
      "An awareness session about local registration and application procedures.",
    details:
      "The session is intended to make residents and market users more aware of available registration-related processes and where to find relevant information.",
    tags: ["Registration", "Awareness"],
  },
  {
    id: 3,
    title: "Market Area Cleanliness Schedule",
    category: "Market Update",
    area: "Sector 16 Market",
    date: "29 Sep 2026",
    time: "7:00 AM onwards",
    source: "Area Information Bulletin",
    sourceType: "official",
    short:
      "Cleaning activity is planned around the market area during the morning hours.",
    details:
      "Visitors may notice temporary changes in movement around parts of the market while scheduled cleanliness activity is carried out.",
    tags: ["Market", "Public Information"],
  },
  {
    id: 4,
    title: "Vendor Documentation Awareness Session",
    category: "Awareness",
    area: "Sector 27 Market",
    date: "02 Oct 2026",
    time: "12:00 PM – 4:00 PM",
    source: "Community Information Centre",
    sourceType: "community",
    short:
      "An informational session covering document organization and where to seek procedural assistance.",
    details:
      "The session will focus on helping people understand commonly used records, application-related information and available support channels.",
    tags: ["Awareness", "Documents"],
  },
  {
    id: 5,
    title: "Temporary Market Access Update",
    category: "Area Update",
    area: "Sector 18",
    date: "27 Sep 2026",
    time: "6:00 AM – 12:00 PM",
    source: "Area Information Bulletin",
    sourceType: "official",
    short:
      "Temporary movement changes may affect one part of the market area.",
    details:
      "A temporary activity in the area may affect pedestrian movement during the mentioned period. Check local signs and on-ground instructions before visiting.",
    tags: ["Area", "Public Information"],
  },
  {
    id: 6,
    title: "Community Information Meet",
    category: "Community",
    area: "Sector 18 Market",
    date: "04 Oct 2026",
    time: "4:00 PM – 6:00 PM",
    source: "Community Desk",
    sourceType: "community",
    short:
      "A community meeting covering local concerns, information sharing and available support resources.",
    details:
      "Residents and local market users can attend the discussion to share general concerns and learn about available information and support resources.",
    tags: ["Community", "Support"],
  },
];

const filterOptions = [
  "All Updates",
  "Documentation",
  "Registration",
  "Awareness",
  "Market Update",
  "Area Update",
  "Community",
];

const areaOptions = [
  "All Areas",
  "Sector 18 Market",
  "Sector 18",
  "Atta Market",
  "Sector 16 Market",
  "Sector 27 Market",
];

/* =========================================================
   SOURCE LABEL
========================================================= */

function getSourceLabel(update) {
  if (update.sourceType === "community") {
    return "Community information";
  }

  return "Public information";
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CitizenUpdates() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All Updates");
  const [area, setArea] =
    useState("All Areas");

  const [selectedUpdate, setSelectedUpdate] =
    useState(null);

  const [readUpdates, setReadUpdates] =
    useState([]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredUpdates = useMemo(() => {
    return updates.filter((update) => {
      const query = search.toLowerCase();

      const matchesSearch =
        update.title
          .toLowerCase()
          .includes(query) ||
        update.area
          .toLowerCase()
          .includes(query) ||
        update.category
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All Updates" ||
        update.category === category;

      const matchesArea =
        area === "All Areas" ||
        update.area === area;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesArea
      );
    });
  }, [search, category, area]);

  /* =======================================================
     COUNTS
  ======================================================= */

  const communityCount = updates.filter(
    (item) => item.sourceType === "community"
  ).length;

  const publicCount = updates.filter(
    (item) => item.sourceType === "official"
  ).length;

  /* =======================================================
     MARK READ
  ======================================================= */

  const markAsRead = (id) => {
    setReadUpdates((previous) =>
      previous.includes(id)
        ? previous
        : [...previous, id]
    );
  };

  /* =======================================================
     OPEN UPDATE
  ======================================================= */

  const openUpdate = (update) => {
    setSelectedUpdate(update);
    markAsRead(update.id);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All Updates");
    setArea("All Areas");
  };

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">

      <CitizenNavbar />

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="bg-[#FDF4EA] border-b border-[#E8DCD2]">

        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-11">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>

              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#C97B63]">
                Local Updates
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31] mt-3">
                Stay informed about your local area.
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] leading-7">
                Find public information, community updates and
                awareness activities relevant to local market areas.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-white border border-[#E2D5CA] rounded-xl px-5 py-4 min-w-[130px]">

                <div className="flex items-center gap-2">

                  <Megaphone
                    size={16}
                    className="text-[#C97B63]"
                  />

                  <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                    Public
                  </p>

                </div>

                <p className="text-2xl font-semibold text-[#4E3C31] mt-2">
                  {publicCount}
                </p>

              </div>

              <div className="bg-white border border-[#E2D5CA] rounded-xl px-5 py-4 min-w-[130px]">

                <div className="flex items-center gap-2">

                  <Users
                    size={16}
                    className="text-[#C97B63]"
                  />

                  <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                    Community
                  </p>

                </div>

                <p className="text-2xl font-semibold text-[#4E3C31] mt-2">
                  {communityCount}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          FILTERS
      =================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

        <div className="py-6 border-b border-[#E8DCD2]">

          <div className="grid lg:grid-cols-[1fr_auto_auto_auto] gap-3">

            {/* SEARCH */}

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A08E81]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search updates..."
                className="w-full border border-[#DCCFC4] rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#C97B63]"
              />

            </div>

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border border-[#DCCFC4] rounded-xl px-4 py-3.5 bg-white text-sm outline-none lg:w-52"
            >

              {filterOptions.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}

            </select>

            {/* AREA */}

            <select
              value={area}
              onChange={(e) =>
                setArea(e.target.value)
              }
              className="border border-[#DCCFC4] rounded-xl px-4 py-3.5 bg-white text-sm outline-none lg:w-48"
            >

              {areaOptions.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}

            </select>

            {/* CLEAR */}

            {(search ||
              category !== "All Updates" ||
              area !== "All Areas") && (

              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#DCCFC4] rounded-xl text-sm font-semibold text-[#756052] hover:bg-[#FFF9F4]"
              >
                <X size={15} />
                Clear
              </button>

            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-9">

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">

          {/* =================================================
              UPDATE FEED
          ================================================= */}

          <div>

            <div className="flex items-end justify-between mb-5">

              <div>

                <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                  Information feed
                </p>

                <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                  Latest updates
                </h2>

              </div>

              <p className="text-xs text-[#9A8678]">
                {filteredUpdates.length} updates
              </p>

            </div>

            {filteredUpdates.length === 0 ? (

              <div className="border border-[#E5DAD2] rounded-2xl py-16 text-center">

                <Bell
                  size={28}
                  className="mx-auto text-[#B7A599]"
                />

                <p className="text-sm font-semibold text-[#5A4638] mt-4">
                  No updates found
                </p>

                <p className="text-xs text-[#9A8678] mt-2">
                  Try changing the search or filters.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-[#E7DDD5] border-y border-[#E7DDD5]">

                {filteredUpdates.map((update) => {

                  const isRead =
                    readUpdates.includes(
                      update.id
                    );

                  return (
                    <button
                      key={update.id}
                      onClick={() =>
                        openUpdate(update)
                      }
                      className="w-full text-left py-6 group hover:bg-[#FFF9F4] transition px-2"
                    >

                      <div className="flex gap-5">

                        {/* DATE */}

                        <div className="hidden sm:flex flex-col items-center w-14 flex-shrink-0">

                          <span className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                            Sep
                          </span>

                          <span className="text-2xl font-semibold text-[#4E3C31]">
                            {update.id === 1
                              ? "28"
                              : update.id === 2
                              ? "30"
                              : update.id === 3
                              ? "29"
                              : update.id === 4
                              ? "02"
                              : update.id === 5
                              ? "27"
                              : "04"}
                          </span>

                        </div>

                        {/* CONTENT */}

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#FBE8DE] text-[#A95E49]">
                              {update.category}
                            </span>

                            {!isRead && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C97B63]" />
                            )}

                          </div>

                          <h3 className="text-xl font-semibold text-[#4E3C31] mt-3 group-hover:text-[#C16951] transition">

                            {update.title}

                          </h3>

                          <p className="text-sm leading-6 text-[#806E61] mt-2 max-w-2xl">
                            {update.short}
                          </p>

                          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">

                            <span className="inline-flex items-center gap-1.5 text-xs text-[#8D7A6C]">

                              <MapPin size={13} />

                              {update.area}

                            </span>

                            <span className="inline-flex items-center gap-1.5 text-xs text-[#8D7A6C]">

                              <Clock3 size={13} />

                              {update.time}

                            </span>

                          </div>

                        </div>

                        <ChevronRight
                          size={18}
                          className="text-[#B8A79A] mt-2 group-hover:text-[#C97B63] transition flex-shrink-0"
                        />

                      </div>

                    </button>
                  );
                })}

              </div>

            )}

          </div>

          {/* =================================================
              SIDE INFORMATION
          ================================================= */}

          <aside>

            <div className="bg-[#FDF4EA] border border-[#E8DCD2] rounded-2xl p-6">

              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">

                <Info
                  size={18}
                  className="text-[#C97B63]"
                />

              </div>

              <h3 className="text-lg font-semibold text-[#4E3C31] mt-5">
                What are Local Updates?
              </h3>

              <p className="text-sm leading-6 text-[#806E61] mt-2">
                This section brings together public information and
                community updates that may be useful when visiting
                or using local market areas.
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">

                    <FileText
                      size={15}
                      className="text-[#C97B63]"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#5A4638]">
                      Public information
                    </p>

                    <p className="text-xs leading-5 text-[#8E7C70] mt-1">
                      Information published through a relevant
                      public or administrative source.
                    </p>

                  </div>

                </div>

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">

                    <Users
                      size={15}
                      className="text-[#C97B63]"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-semibold text-[#5A4638]">
                      Community information
                    </p>

                    <p className="text-xs leading-5 text-[#8E7C70] mt-1">
                      Shared community information is clearly
                      labelled and may need confirmation.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* PRIVACY / TRUST */}

            <div className="mt-5 border border-[#E5DAD2] rounded-2xl p-6">

              <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                StreetBridge principle
              </p>

              <h3 className="text-lg font-semibold text-[#4E3C31] mt-2">
                Inform, don't assume.
              </h3>

              <p className="text-sm leading-6 text-[#806E61] mt-2">
                Community-reported information is separated from
                public information so users can understand where
                an update came from.
              </p>

            </div>

          </aside>

        </div>

      </section>

      {/* ===================================================
          DETAIL MODAL
      =================================================== */}

      {selectedUpdate && (

        <div className="fixed inset-0 z-[1000] bg-[#3E3028]/35 backdrop-blur-sm flex items-center justify-center px-5">

          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* MODAL HEADER */}

            <div className="px-6 md:px-8 py-5 border-b border-[#E9DED6] flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="px-2.5 py-1 rounded-full bg-[#FBE8DE] text-[#A95E49] text-[10px] font-semibold uppercase tracking-wide">
                  {selectedUpdate.category}
                </span>

              </div>

              <button
                onClick={() =>
                  setSelectedUpdate(null)
                }
                className="w-9 h-9 rounded-lg hover:bg-[#FFF5EF] flex items-center justify-center"
              >

                <X
                  size={18}
                  className="text-[#806E61]"
                />

              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="px-6 md:px-8 py-7">

              <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                Local information
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-[#4E3C31] mt-2">
                {selectedUpdate.title}
              </h2>

              <p className="text-sm leading-7 text-[#806E61] mt-4">
                {selectedUpdate.details}
              </p>

              {/* META */}

              <div className="mt-7 grid sm:grid-cols-2 gap-3">

                <div className="bg-[#FDF7F2] border border-[#E9DED6] rounded-xl p-4">

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={16}
                      className="text-[#C97B63]"
                    />

                    <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                      Date
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedUpdate.date}
                  </p>

                </div>

                <div className="bg-[#FDF7F2] border border-[#E9DED6] rounded-xl p-4">

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={16}
                      className="text-[#C97B63]"
                    />

                    <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                      Time
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedUpdate.time}
                  </p>

                </div>

                <div className="bg-[#FDF7F2] border border-[#E9DED6] rounded-xl p-4">

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={16}
                      className="text-[#C97B63]"
                    />

                    <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                      Area
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedUpdate.area}
                  </p>

                </div>

                <div className="bg-[#FDF7F2] border border-[#E9DED6] rounded-xl p-4">

                  <div className="flex items-center gap-2">

                    <Info
                      size={16}
                      className="text-[#C97B63]"
                    />

                    <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                      Source type
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {getSourceLabel(
                      selectedUpdate
                    )}
                  </p>

                </div>

              </div>

              {/* SOURCE */}

              <div className="mt-6 border-t border-[#E9DED6] pt-5">

                <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                  Source
                </p>

                <p className="text-sm font-semibold text-[#5A4638] mt-1">
                  {selectedUpdate.source}
                </p>

              </div>

              {/* TAGS */}

              <div className="flex flex-wrap gap-2 mt-5">

                {selectedUpdate.tags.map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-[#FFF7F1] border border-[#E8DCD2] text-xs text-[#7C695C]"
                    >
                      {tag}
                    </span>
                  )
                )}

              </div>

              {/* COMMUNITY WARNING */}

              {selectedUpdate.sourceType ===
                "community" && (

                <div className="mt-6 border border-[#E7D8CB] bg-[#FFF9F4] rounded-xl p-4">

                  <div className="flex gap-2">

                    <Info
                      size={16}
                      className="text-[#C97B63] mt-0.5 flex-shrink-0"
                    />

                    <p className="text-xs leading-5 text-[#806E61]">
                      This is community-shared information. Please
                      confirm important details with the relevant
                      source before relying on it.
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* MODAL FOOTER */}

            <div className="px-6 md:px-8 py-5 border-t border-[#E9DED6] flex justify-between items-center">

              <span className="text-xs text-[#9A8678]">
                StreetBridge information feed
              </span>

              <button
                onClick={() =>
                  setSelectedUpdate(null)
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C97B63] text-white text-sm font-semibold hover:bg-[#B96B55]"
              >
                <ArrowLeft size={15} />
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
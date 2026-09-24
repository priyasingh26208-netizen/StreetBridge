import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Search,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  LocateFixed,
  X,
  ArrowRight,
  Store,
  CalendarDays,
} from "lucide-react";
import VendorNavbar from "../components/VendorNavbar";

const areaSuggestions = [
  {
    id: 1,
    name: "Sector 18 Market",
    area: "Noida",
    distance: "0.4 km",
  },
  {
    id: 2,
    name: "Atta Market",
    area: "Sector 27, Noida",
    distance: "1.2 km",
  },
  {
    id: 3,
    name: "Sector 16 Market",
    area: "Noida",
    distance: "2.1 km",
  },
  {
    id: 4,
    name: "Indirapuram Market",
    area: "Ghaziabad",
    distance: "6.4 km",
  },
];

export default function VendorLocation() {
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState({
    name: "Sector 18 Market",
    area: "Noida",
  });

  const [checkedIn, setCheckedIn] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [showAreaPicker, setShowAreaPicker] = useState(false);

  const filteredAreas = areaSuggestions.filter((area) => {
    const query = search.toLowerCase();

    return (
      area.name.toLowerCase().includes(query) ||
      area.area.toLowerCase().includes(query)
    );
  });

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Your browser does not support location detection. Please select your working area manually."
      );
      return;
    }

    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      () => {
        // Frontend-only demo:
        // We intentionally don't expose exact coordinates.
        setSelectedArea({
          name: "Current Area",
          area: "Location detected",
        });

        setDetecting(false);
        setCheckedIn(false);
      },
      () => {
        setDetecting(false);

        alert(
          "Location permission was not available. Please search and select your working area manually."
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const selectArea = (area) => {
    setSelectedArea({
      name: area.name,
      area: area.area,
    });

    setCheckedIn(false);
    setShowAreaPicker(false);
    setSearch("");
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

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
                Daily Working Area
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31]">
                Where are you vending today?
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
                Set your working area for today so StreetBridge can show
                relevant local information and alerts.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#71816F]">
              <CalendarDays size={16} />
              <span>
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* ================================================= */}
          {/* CURRENT LOCATION SUMMARY */}
          {/* ================================================= */}

          <section className="grid md:grid-cols-[1fr_0.8fr] border-b border-[#E8DCD2]">

            {/* LEFT */}
            <div className="py-9 md:pr-12 md:border-r border-[#E8DCD2]">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                  <MapPin
                    size={20}
                    className="text-[#C97B63]"
                  />
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                    Today's working area
                  </p>

                  <h2 className="text-2xl md:text-3xl font-semibold text-[#4E3C31] mt-1">
                    {selectedArea.name}
                  </h2>

                  <p className="text-sm text-[#8A7567] mt-1">
                    {selectedArea.area}
                  </p>
                </div>

              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">

                <button
                  onClick={() =>
                    setShowAreaPicker(true)
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold hover:bg-[#B86D56] transition"
                >
                  <Search size={16} />
                  Change area
                </button>

                <button
                  onClick={useCurrentLocation}
                  disabled={detecting}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#DCCFC4] rounded-lg text-sm font-semibold text-[#665347] hover:bg-[#FFF9F4] transition disabled:opacity-50"
                >
                  <LocateFixed size={16} />

                  {detecting
                    ? "Detecting..."
                    : "Use current location"}
                </button>

              </div>

            </div>

            {/* RIGHT */}
            <div className="py-9 md:pl-12">

              <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                Location status
              </p>

              <div className="flex items-center gap-3 mt-4">

                <div
                  className={`w-3 h-3 rounded-full ${
                    checkedIn
                      ? "bg-[#718E75]"
                      : "bg-[#C7A98F]"
                  }`}
                />

                <p className="text-lg font-semibold text-[#554337]">
                  {checkedIn
                    ? "Checked in for today"
                    : "Not checked in yet"}
                </p>

              </div>

              <p className="text-sm text-[#8A7567] leading-6 max-w-md mt-3">
                Your daily working area is used only as a location context
                for the StreetBridge experience.
              </p>

              {!checkedIn && (
                <button
                  onClick={handleCheckIn}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C97B63] hover:text-[#A45D45]"
                >
                  Check in at this area
                  <ArrowRight size={15} />
                </button>
              )}

            </div>
          </section>

          {/* ================================================= */}
          {/* MAIN MAP AREA */}
          {/* ================================================= */}

          <section className="mt-9 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="grid lg:grid-cols-[1fr_330px] min-h-[570px]">

              {/* ============================================= */}
              {/* MAP */}
              {/* ============================================= */}

              <div className="relative bg-[#F3EEE8] min-h-[500px] overflow-hidden">

                {/* MAP GRID */}

                <div className="absolute inset-0 opacity-50">

                  <div className="absolute top-[12%] left-[-5%] w-[120%] h-12 bg-[#E6DED5] rotate-[10deg]" />
                  <div className="absolute top-[36%] left-[-5%] w-[120%] h-16 bg-[#E6DED5] rotate-[-8deg]" />
                  <div className="absolute top-[66%] left-[-5%] w-[120%] h-14 bg-[#E6DED5] rotate-[6deg]" />

                  <div className="absolute left-[18%] top-[-10%] w-10 h-[120%] bg-[#E6DED5] rotate-[19deg]" />
                  <div className="absolute left-[49%] top-[-10%] w-14 h-[120%] bg-[#E6DED5] rotate-[-10deg]" />
                  <div className="absolute left-[77%] top-[-10%] w-9 h-[120%] bg-[#E6DED5] rotate-[20deg]" />

                  <div className="absolute w-[220px] h-[140px] rounded-full border-[18px] border-[#E3D8CD] left-[8%] top-[15%]" />
                  <div className="absolute w-[260px] h-[170px] rounded-full border-[15px] border-[#E3D8CD] right-[4%] bottom-[12%]" />

                </div>

                {/* MAP LABELS */}

                <span className="absolute top-[18%] left-[18%] text-xs font-medium text-[#8F7D70] rotate-[10deg]">
                  Market Road
                </span>

                <span className="absolute top-[44%] right-[14%] text-xs font-medium text-[#8F7D70] rotate-[-8deg]">
                  Main Road
                </span>

                <span className="absolute bottom-[19%] left-[28%] text-xs font-medium text-[#8F7D70] rotate-[5deg]">
                  Sector 18
                </span>

                {/* CURRENT AREA */}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                  <div className="relative">

                    {/* ripple */}
                    <div className="absolute -inset-9 rounded-full border border-[#C97B63]/20" />
                    <div className="absolute -inset-5 rounded-full border border-[#C97B63]/25" />

                    <div className="w-14 h-14 rounded-full bg-[#C97B63] border-4 border-white shadow-xl flex items-center justify-center">

                      <MapPin
                        size={24}
                        className="text-white"
                        fill="white"
                      />

                    </div>

                  </div>
                </div>

                {/* MAP TOP LABEL */}

                <div className="absolute top-5 left-5 bg-white border border-[#E2D6CC] rounded-lg px-4 py-3 shadow-sm">

                  <p className="text-[10px] uppercase tracking-widest font-semibold text-[#9A8678]">
                    Current area
                  </p>

                  <p className="text-sm font-semibold text-[#554337] mt-1">
                    {selectedArea.name}
                  </p>

                </div>

                {/* APPROXIMATE NOTICE */}

                <div className="absolute bottom-5 left-5 right-5">

                  <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur border border-[#E1D5CB] rounded-lg px-4 py-3 shadow-sm">

                    <ShieldCheck
                      size={16}
                      className="text-[#718E75]"
                    />

                    <p className="text-xs text-[#756052]">
                      Public location is shown as an approximate area, not an
                      exact vendor position.
                    </p>

                  </div>

                </div>

              </div>

              {/* ============================================= */}
              {/* SIDE INFO */}
              {/* ============================================= */}

              <aside className="bg-white border-t lg:border-t-0 lg:border-l border-[#E4D7CC]">

                <div className="p-6">

                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                    Why set your area?
                  </p>

                  <h3 className="text-xl font-semibold text-[#4E3C31] mt-2">
                    Location-aware support
                  </h3>

                  <p className="text-sm leading-6 text-[#8A7567] mt-3">
                    Your selected working area can be used to personalise
                    information shown inside StreetBridge.
                  </p>

                  <div className="mt-7 space-y-5">

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-lg bg-[#FBE8DE] flex items-center justify-center flex-shrink-0">
                        <MapPin
                          size={17}
                          className="text-[#C97B63]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#5A4638]">
                          Area-based information
                        </p>

                        <p className="text-xs leading-5 text-[#8A7567] mt-1">
                          See information relevant to your selected vending
                          area.
                        </p>
                      </div>

                    </div>

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-lg bg-[#FBE8DE] flex items-center justify-center flex-shrink-0">
                        <Navigation
                          size={17}
                          className="text-[#C97B63]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#5A4638]">
                          Daily check-in
                        </p>

                        <p className="text-xs leading-5 text-[#8A7567] mt-1">
                          Update your area whenever your vending location
                          changes.
                        </p>
                      </div>

                    </div>

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-lg bg-[#FBE8DE] flex items-center justify-center flex-shrink-0">
                        <ShieldCheck
                          size={17}
                          className="text-[#C97B63]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#5A4638]">
                          Approximate visibility
                        </p>

                        <p className="text-xs leading-5 text-[#8A7567] mt-1">
                          Exact coordinates are not presented publicly in this
                          interface.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* CHECK IN */}

                <div className="border-t border-[#E8DCD2] p-6 bg-[#FBF6F0]">

                  <p className="text-xs text-[#9A8678]">
                    Selected area
                  </p>

                  <div className="flex items-center gap-3 mt-2">

                    <Store
                      size={18}
                      className="text-[#C97B63]"
                    />

                    <p className="font-semibold text-[#554337]">
                      {selectedArea.name}
                    </p>

                  </div>

                  <button
                    onClick={handleCheckIn}
                    disabled={checkedIn}
                    className="w-full mt-5 py-3 rounded-lg bg-[#C97B63] text-white text-sm font-semibold hover:bg-[#B86D56] transition disabled:opacity-60"
                  >
                    {checkedIn
                      ? "Checked in for today"
                      : "Check in here"}
                  </button>

                </div>

              </aside>

            </div>

          </section>

          {/* ================================================= */}
          {/* RECENT LOCATION */}
          {/* ================================================= */}

          <section className="mt-9 border-b border-[#E8DCD2] pb-8">

            <div className="flex items-end justify-between gap-5">

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                  Recent location
                </p>

                <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                  Your latest working areas
                </h2>
              </div>

              <span className="text-xs text-[#9A8678]">
                Frontend demo
              </span>

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

              {[
                "Sector 18 Market",
                "Atta Market",
                "Sector 16 Market",
              ].map((area, index) => (
                <button
                  key={area}
                  onClick={() =>
                    selectArea({
                      name: area,
                      area: "Noida",
                    })
                  }
                  className="group inline-flex items-center gap-3 px-4 py-3 border border-[#E4D7CC] rounded-xl hover:bg-[#FFF9F4] hover:border-[#D7B7A6] transition"
                >

                  <MapPin
                    size={16}
                    className="text-[#C97B63]"
                  />

                  <div className="text-left">

                    <p className="text-sm font-semibold text-[#5A4638]">
                      {area}
                    </p>

                    <p className="text-[11px] text-[#9A8678] mt-0.5">
                      {index === 0
                        ? "Today"
                        : `${index + 1} days ago`}
                    </p>

                  </div>

                </button>
              ))}

            </div>

          </section>

          {/* FOOTNOTE */}

          <div className="flex items-start gap-3 max-w-3xl py-7">

            <Clock3
              size={16}
              className="text-[#9A8678] mt-1 flex-shrink-0"
            />

            <p className="text-sm leading-6 text-[#8A7567]">
              Location is treated as a daily working-area setting rather than
              a permanent vendor address. This frontend demo stores the
              selection only in the current browser session.
            </p>

          </div>

        </div>
      </main>

      {/* ===================================================== */}
      {/* AREA PICKER MODAL */}
      {/* ===================================================== */}

      {showAreaPicker && (
        <div className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DCD2]">

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#C97B63]">
                  Working Area
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Choose today's area
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowAreaPicker(false)
                }
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F8EEE7]"
              >
                <X size={19} />
              </button>

            </div>

            <div className="p-6">

              {/* SEARCH */}

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A08E81]"
                />

                <input
                  autoFocus
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search market or area..."
                  className="w-full border border-[#DED1C6] rounded-lg pl-10 pr-4 py-3 text-sm text-[#5A4638] placeholder:text-[#AA9789] outline-none focus:border-[#C97B63]"
                />

              </div>

              {/* CURRENT LOCATION */}

              <button
                onClick={() => {
                  setShowAreaPicker(false);
                  useCurrentLocation();
                }}
                className="w-full mt-4 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-[#FFF8F2] border border-[#E8DCD2] text-left hover:border-[#D8B5A3] transition"
              >

                <div className="w-9 h-9 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                  <LocateFixed
                    size={17}
                    className="text-[#C97B63]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#5A4638]">
                    Use my current location
                  </p>

                  <p className="text-xs text-[#9A8678] mt-0.5">
                    Detect your area using browser location permission
                  </p>
                </div>

              </button>

              {/* DIVIDER */}

              <div className="flex items-center gap-3 my-6">

                <div className="flex-1 h-px bg-[#EAE1DA]" />

                <span className="text-[10px] uppercase tracking-widest text-[#AA9789]">
                  Or choose manually
                </span>

                <div className="flex-1 h-px bg-[#EAE1DA]" />

              </div>

              {/* AREAS */}

              <div className="space-y-2">

                {filteredAreas.length === 0 ? (
                  <div className="py-8 text-center">
                    <MapPin
                      size={24}
                      className="mx-auto text-[#B7A599]"
                    />

                    <p className="text-sm text-[#8A7567] mt-3">
                      No matching area found.
                    </p>
                  </div>
                ) : (
                  filteredAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => selectArea(area)}
                      className="w-full flex items-center justify-between gap-4 px-4 py-3.5 border border-[#E8DCD2] rounded-xl hover:bg-[#FFF9F4] hover:border-[#D8B5A3] transition text-left"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-[#F8F1EB] flex items-center justify-center">
                          <MapPin
                            size={16}
                            className="text-[#C97B63]"
                          />
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-[#5A4638]">
                            {area.name}
                          </p>

                          <p className="text-xs text-[#9A8678] mt-0.5">
                            {area.area}
                          </p>

                        </div>

                      </div>

                      <span className="text-xs text-[#A18C7D]">
                        {area.distance}
                      </span>

                    </button>
                  ))
                )}

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
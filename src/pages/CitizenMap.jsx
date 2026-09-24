import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Store,
  Utensils,
  Leaf,
  Coffee,
  ShoppingBasket,
  Shirt,
  Users,
  ChevronRight,
  Info,
  X,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import CitizenNavbar from "../components/CitizenNavbar";

/* =========================================================
   AREA DATA
   No individual vendor coordinates are stored here.
   Only approximate area centres + vendor counts.
========================================================= */

const areas = [
  {
    id: 1,
    name: "Sector 18 Market",
    vendors: 24,
    categories: {
      Food: 8,
      Tea: 5,
      Fruits: 4,
      Vegetables: 5,
      Clothing: 2,
    },
    lat: 28.5708,
    lng: 77.3261,
  },
  {
    id: 2,
    name: "Atta Market",
    vendors: 17,
    categories: {
      Food: 7,
      Tea: 3,
      Fruits: 2,
      Vegetables: 3,
      Clothing: 2,
    },
    lat: 28.5742,
    lng: 77.3218,
  },
  {
    id: 3,
    name: "Sector 16 Market",
    vendors: 31,
    categories: {
      Food: 9,
      Tea: 6,
      Fruits: 5,
      Vegetables: 7,
      Clothing: 4,
    },
    lat: 28.578,
    lng: 77.321,
  },
  {
    id: 4,
    name: "Sector 27 Market",
    vendors: 13,
    categories: {
      Food: 4,
      Tea: 2,
      Fruits: 3,
      Vegetables: 3,
      Clothing: 1,
    },
    lat: 28.568,
    lng: 77.334,
  },
  {
    id: 5,
    name: "Sector 18",
    vendors: 19,
    categories: {
      Food: 6,
      Tea: 4,
      Fruits: 3,
      Vegetables: 4,
      Clothing: 2,
    },
    lat: 28.5695,
    lng: 77.329,
  },
];

/* =========================================================
   CATEGORY LIST
========================================================= */

const categories = [
  { name: "All", icon: Store },
  { name: "Food", icon: Utensils },
  { name: "Fruits", icon: Leaf },
  { name: "Vegetables", icon: ShoppingBasket },
  { name: "Tea", icon: Coffee },
  { name: "Clothing", icon: Shirt },
];

const areaOptions = [
  "All Areas",
  ...areas.map((area) => area.name),
];

/* =========================================================
   MAP CONTROLLER
========================================================= */

function MapController({ selectedArea }) {
  const map = useMap();

  React.useEffect(() => {
    if (selectedArea) {
      map.setView(
        [selectedArea.lat, selectedArea.lng],
        15,
        { animate: true }
      );
    } else {
      map.setView(
        [28.5725, 77.325],
        14,
        { animate: true }
      );
    }
  }, [selectedArea, map]);

  return null;
}

/* =========================================================
   GET AREA COUNT FOR CATEGORY
========================================================= */

function getCategoryCount(area, category) {
  if (category === "All") {
    return area.vendors;
  }

  return area.categories[category] || 0;
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CitizenMap() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [areaFilter, setAreaFilter] =
    useState("All Areas");

  const [selectedArea, setSelectedArea] =
    useState(null);

  /* =======================================================
     FILTER AREAS
  ======================================================= */

  const filteredAreas = useMemo(() => {
    return areas.filter((area) => {
      const matchesSearch =
        area.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesArea =
        areaFilter === "All Areas" ||
        area.name === areaFilter;

      const categoryCount =
        getCategoryCount(area, category);

      const matchesCategory =
        category === "All" ||
        categoryCount > 0;

      return (
        matchesSearch &&
        matchesArea &&
        matchesCategory
      );
    });
  }, [search, category, areaFilter]);

  /* =======================================================
     TOTAL VENDORS
  ======================================================= */

  const totalVendors = filteredAreas.reduce(
    (total, area) =>
      total + getCategoryCount(area, category),
    0
  );

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setAreaFilter("All Areas");
    setSelectedArea(null);
  };

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">

      <CitizenNavbar />

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="bg-[#FDF4EA] border-b border-[#E8DCD2]">

        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-11">

          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#C97B63]">
            Vendor Areas
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7">

            <div>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31] mt-3">
                Discover vendors around your area.
              </h1>

              <p className="mt-4 max-w-2xl text-[#8A7567] leading-7">
                Explore market areas and see how many local vendors
                are available there. Individual vendor locations are
                not shown publicly.
              </p>

            </div>

            <div className="bg-white border border-[#E2D5CA] rounded-xl px-5 py-4">

              <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                Vendors in view
              </p>

              <div className="flex items-center gap-2 mt-1">

                <Users
                  size={17}
                  className="text-[#C97B63]"
                />

                <span className="text-2xl font-semibold text-[#4E3C31]">
                  {totalVendors}
                </span>

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
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search market area..."
                className="w-full border border-[#DCCFC4] rounded-xl pl-10 pr-4 py-3.5 text-sm outline-none focus:border-[#C97B63]"
              />

            </div>

            {/* AREA */}

            <select
              value={areaFilter}
              onChange={(e) => {
                setAreaFilter(e.target.value);

                const selected = areas.find(
                  (item) =>
                    item.name === e.target.value
                );

                setSelectedArea(
                  selected || null
                );
              }}
              className="border border-[#DCCFC4] rounded-xl px-4 py-3.5 bg-white text-sm outline-none lg:w-52"
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

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border border-[#DCCFC4] rounded-xl px-4 py-3.5 bg-white text-sm outline-none lg:w-44"
            >
              {categories.map((item) => (
                <option
                  value={item.name}
                  key={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>

            {/* CLEAR */}

            {(search ||
              category !== "All" ||
              areaFilter !== "All Areas") && (

              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#DCCFC4] rounded-xl text-sm font-semibold hover:bg-[#FFF9F4]"
              >
                <X size={15} />
                Clear
              </button>

            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN MAP AREA
      =================================================== */}

      <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-8">

        <div className="border border-[#E3D8D0] rounded-2xl overflow-hidden">

          <div className="grid lg:grid-cols-[1fr_360px]">

            {/* =================================================
                MAP
            ================================================= */}

            <div className="relative min-h-[680px]">

              <MapContainer
                center={[28.5725, 77.325]}
                zoom={14}
                scrollWheelZoom={true}
                className="w-full h-[680px]"
              >

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController
                  selectedArea={selectedArea}
                />

                {filteredAreas.map((area) => {

                  const count =
                    getCategoryCount(
                      area,
                      category
                    );

                  return (
                    <Circle
                      key={area.id}
                      center={[
                        area.lat,
                        area.lng,
                      ]}
                      radius={category === "All" ? 330 : 280}
                      pathOptions={{
                        color:
                          selectedArea?.id ===
                          area.id
                            ? "#B76750"
                            : "#C97B63",

                        fillColor:
                          selectedArea?.id ===
                          area.id
                            ? "#E8A48C"
                            : "#EBC0AE",

                        fillOpacity:
                          selectedArea?.id ===
                          area.id
                            ? 0.48
                            : 0.28,

                        weight:
                          selectedArea?.id ===
                          area.id
                            ? 3
                            : 2,
                      }}
                    >

                      <Popup>

                        <div className="min-w-[210px]">

                          <p className="font-semibold text-[#4E3C31]">
                            {area.name}
                          </p>

                          <p className="text-2xl font-semibold text-[#C97B63] mt-2">
                            {count}
                          </p>

                          <p className="text-xs text-[#8A7567]">
                            {category === "All"
                              ? "vendors in this area"
                              : `${category.toLowerCase()} vendors`}
                          </p>

                          <button
                            onClick={() =>
                              setSelectedArea(
                                area
                              )
                            }
                            className="mt-3 text-xs font-semibold text-[#C97B63]"
                          >
                            View area details →
                          </button>

                        </div>

                      </Popup>

                    </Circle>
                  );
                })}

              </MapContainer>

              {/* MAP LABEL */}

              <div className="absolute top-4 left-4 z-[500] bg-white/95 border border-[#E2D6CC] rounded-xl px-4 py-3 shadow-sm">

                <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                  Public map
                </p>

                <div className="flex items-center gap-2 mt-1">

                  <MapPin
                    size={15}
                    className="text-[#C97B63]"
                  />

                  <p className="text-sm font-semibold text-[#5A4638]">
                    Vendor areas
                  </p>

                </div>

              </div>

              {/* PRIVACY NOTE */}

              <div className="absolute bottom-4 left-4 z-[500] bg-white/95 backdrop-blur border border-[#E2D6CC] rounded-xl px-4 py-3 max-w-sm shadow-sm">

                <div className="flex items-start gap-2">

                  <Info
                    size={16}
                    className="text-[#C97B63] mt-0.5 flex-shrink-0"
                  />

                  <p className="text-xs leading-5 text-[#756052]">
                    This map shows approximate vendor-area
                    information only. Individual vendors are
                    not pinpointed.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SIDE PANEL
            ================================================= */}

            <aside className="bg-[#FBF6F0] border-t lg:border-t-0 lg:border-l border-[#E3D8D0]">

              <div className="p-6">

                {selectedArea ? (

                  /* ===========================================
                     SELECTED AREA
                  =========================================== */

                  <div>

                    <button
                      onClick={() =>
                        setSelectedArea(null)
                      }
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A7567]"
                    >
                      <X size={14} />
                      Back to all areas
                    </button>

                    <div className="mt-7">

                      <div className="w-12 h-12 rounded-xl bg-[#FBE8DE] flex items-center justify-center">

                        <MapPin
                          size={20}
                          className="text-[#C97B63]"
                        />

                      </div>

                      <p className="text-[10px] uppercase tracking-widest text-[#9A8678] mt-6">
                        Market Area
                      </p>

                      <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                        {selectedArea.name}
                      </h2>

                      <div className="mt-5">

                        <p className="text-4xl font-semibold text-[#C97B63]">
                          {getCategoryCount(
                            selectedArea,
                            category
                          )}
                        </p>

                        <p className="text-sm text-[#8A7567] mt-1">
                          {category === "All"
                            ? "vendors in this area"
                            : `${category.toLowerCase()} vendors in this area`}
                        </p>

                      </div>

                    </div>

                    {/* CATEGORY BREAKDOWN */}

                    <div className="mt-8 border-t border-[#E5DCD4]">

                      <p className="text-[10px] uppercase tracking-widest text-[#9A8678] mt-6 mb-3">
                        Category breakdown
                      </p>

                      <div className="space-y-1">

                        {categories
                          .filter(
                            (item) =>
                              item.name !== "All"
                          )
                          .map((item) => {

                            const Icon =
                              item.icon;

                            const count =
                              selectedArea
                                .categories[
                                item.name
                              ] || 0;

                            return (
                              <div
                                key={item.name}
                                className="flex items-center justify-between py-3 border-b border-[#E8DED6]"
                              >

                                <div className="flex items-center gap-3">

                                  <Icon
                                    size={16}
                                    className="text-[#C97B63]"
                                  />

                                  <span className="text-sm text-[#6F5B4D]">
                                    {item.name}
                                  </span>

                                </div>

                                <span className="text-sm font-semibold text-[#4E3C31]">
                                  {count}
                                </span>

                              </div>
                            );
                          })}

                      </div>

                    </div>

                  </div>

                ) : (

                  /* ===========================================
                     AREA LIST
                  =========================================== */

                  <div>

                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                      Explore
                    </p>

                    <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                      Vendor areas
                    </h2>

                    <p className="text-sm leading-6 text-[#8A7567] mt-2">
                      Select an area to see the number and category
                      breakdown of local vendors.
                    </p>

                    <div className="mt-6 space-y-2">

                      {filteredAreas.length === 0 ? (

                        <div className="py-10 text-center">

                          <Store
                            size={27}
                            className="mx-auto text-[#B7A599]"
                          />

                          <p className="text-sm text-[#8A7567] mt-3">
                            No areas match your filters.
                          </p>

                        </div>

                      ) : (

                        filteredAreas.map(
                          (area) => {

                            const count =
                              getCategoryCount(
                                area,
                                category
                              );

                            return (
                              <button
                                key={area.id}
                                onClick={() =>
                                  setSelectedArea(
                                    area
                                  )
                                }
                                className="w-full text-left bg-white border border-[#E5DAD2] rounded-xl p-4 hover:bg-[#FFF9F4] hover:border-[#D7B7A6] transition"
                              >

                                <div className="flex items-center justify-between gap-3">

                                  <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-lg bg-[#FBE8DE] flex items-center justify-center">

                                      <MapPin
                                        size={16}
                                        className="text-[#C97B63]"
                                      />

                                    </div>

                                    <div>

                                      <p className="text-sm font-semibold text-[#5A4638]">
                                        {area.name}
                                      </p>

                                      <p className="text-xs text-[#9A8678] mt-1">
                                        {count}{" "}
                                        {category ===
                                        "All"
                                          ? "vendors"
                                          : `${category.toLowerCase()} vendors`}
                                      </p>

                                    </div>

                                  </div>

                                  <ChevronRight
                                    size={15}
                                    className="text-[#B4A195]"
                                  />

                                </div>

                              </button>
                            );
                          }
                        )

                      )}

                    </div>

                  </div>

                )}

              </div>

              {/* FOOTER NOTE */}

              <div className="border-t border-[#E3D8D0] p-6">

                <div className="flex items-start gap-2">

                  <Info
                    size={15}
                    className="text-[#C97B63] mt-0.5"
                  />

                  <p className="text-xs leading-5 text-[#8A7567]">
                    Vendor counts are shown at area level. Exact
                    vendor positions are intentionally not displayed
                    for privacy.
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </div>
  );
}
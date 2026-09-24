import React, { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Heart,
  Store,
  ChevronRight,
  Filter,
  X,
  Star,
  Phone,
  Clock3,
  Navigation,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import CitizenNavbar from "../components/CitizenNavbar";

const vendors = [
  {
    id: 1,
    name: "Sharma Fresh Fruits",
    category: "Fruits",
    area: "Sector 18 Market",
    distance: "0.3 km",
    rating: "4.8",
    description:
      "Fresh seasonal fruits and everyday essentials.",
    hours: "8:00 AM – 8:00 PM",
    phone: "+91 98XXXXXX21",
    verified: true,
  },
  {
    id: 2,
    name: "Raju Chai Corner",
    category: "Tea",
    area: "Sector 18 Market",
    distance: "0.5 km",
    rating: "4.7",
    description:
      "Tea, snacks and quick refreshments.",
    hours: "7:00 AM – 7:00 PM",
    phone: "+91 97XXXXXX44",
    verified: true,
  },
  {
    id: 3,
    name: "Anita Street Kitchen",
    category: "Food",
    area: "Atta Market",
    distance: "1.1 km",
    rating: "4.9",
    description:
      "Freshly prepared local street food.",
    hours: "11:00 AM – 9:00 PM",
    phone: "+91 99XXXXXX18",
    verified: true,
  },
  {
    id: 4,
    name: "Gupta Vegetable Stall",
    category: "Vegetables",
    area: "Sector 16 Market",
    distance: "1.8 km",
    rating: "4.6",
    description:
      "Daily vegetables and fresh greens.",
    hours: "6:30 AM – 7:30 PM",
    phone: "+91 96XXXXXX71",
    verified: false,
  },
  {
    id: 5,
    name: "Meena Clothing Cart",
    category: "Clothing",
    area: "Sector 18",
    distance: "2.0 km",
    rating: "4.5",
    description:
      "Affordable everyday clothing and accessories.",
    hours: "10:00 AM – 8:00 PM",
    phone: "+91 95XXXXXX36",
    verified: false,
  },
  {
    id: 6,
    name: "Fresh Basket Vendor",
    category: "Vegetables",
    area: "Sector 27 Market",
    distance: "2.4 km",
    rating: "4.7",
    description:
      "Fresh vegetables and seasonal produce.",
    hours: "7:00 AM – 8:00 PM",
    phone: "+91 94XXXXXX55",
    verified: true,
  },
];

const categories = [
  "All",
  "Food",
  "Fruits",
  "Vegetables",
  "Tea",
  "Clothing",
];

const areas = [
  "All Areas",
  "Sector 18 Market",
  "Sector 18",
  "Atta Market",
  "Sector 16 Market",
  "Sector 27 Market",
];

export default function CitizenVendors() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [area, setArea] = useState("All Areas");

  const [favourites, setFavourites] =
    useState([]);

  const [selectedVendor, setSelectedVendor] =
    useState(null);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const query = search.toLowerCase();

      const matchesSearch =
        vendor.name.toLowerCase().includes(query) ||
        vendor.category.toLowerCase().includes(query) ||
        vendor.area.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" ||
        vendor.category === category;

      const matchesArea =
        area === "All Areas" ||
        vendor.area === area;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesArea
      );
    });
  }, [search, category, area]);

  const toggleFavourite = (vendorId) => {
    setFavourites((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setArea("All Areas");
  };

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">
      <CitizenNavbar />

      <main>

        {/* ================================================= */}
        {/* PAGE HEADER */}
        {/* ================================================= */}

        <section className="bg-[#FDF4EA] border-b border-[#E8DCD2]">

          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-12">

            <p className="text-[11px] uppercase tracking-[0.22em] text-[#C97B63] font-semibold">
              Discover Vendors
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31] mt-3">
              Find a local vendor.
            </h1>

            <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
              Search by vendor, category or market area and discover local
              businesses around you.
            </p>

          </div>
        </section>

        {/* ================================================= */}
        {/* SEARCH & FILTERS */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

          <div className="py-7 border-b border-[#E8DCD2]">

            <div className="flex flex-col lg:flex-row gap-3">

              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A08E81]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search vendors, categories or markets..."
                  className="w-full border border-[#DCCFC4] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#5A4638] placeholder:text-[#AA9789] outline-none focus:border-[#C97B63]"
                />

              </div>

              {/* AREA */}

              <div className="relative">

                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8678]"
                />

                <select
                  value={area}
                  onChange={(e) =>
                    setArea(e.target.value)
                  }
                  className="w-full lg:w-56 appearance-none bg-white border border-[#DCCFC4] rounded-xl pl-9 pr-8 py-3.5 text-sm outline-none text-[#5A4638]"
                >
                  {areas.map((item) => (
                    <option key={item}>
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* CLEAR */}

              {(search ||
                category !== "All" ||
                area !== "All Areas") && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-[#DCCFC4] rounded-xl text-sm font-semibold text-[#756052] hover:bg-[#FFF9F4]"
                >
                  <X size={16} />
                  Clear
                </button>
              )}

            </div>

            {/* CATEGORY FILTER */}

            <div className="flex items-center gap-3 mt-5 overflow-x-auto">

              <div className="flex items-center gap-2 text-xs font-semibold text-[#9A8678] mr-1">
                <SlidersHorizontal size={14} />
                Category
              </div>

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition ${
                    category === item
                      ? "bg-[#C97B63] text-white"
                      : "bg-[#FBF6F0] border border-[#E4D8CE] text-[#756052] hover:border-[#D8B5A3]"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* RESULTS */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-9">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

            <div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678] font-semibold">
                Results
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold text-[#4E3C31] mt-1">
                {filteredVendors.length} vendors found
              </h2>

            </div>

            <Link
              to="/citizen-map"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C97B63] hover:text-[#A45D45]"
            >
              <Navigation size={15} />
              View on map
            </Link>

          </div>

          {/* VENDOR RESULTS */}

          <div className="mt-7 border-t border-[#E8DCD2]">

            {filteredVendors.length === 0 ? (
              <div className="py-20 text-center">

                <Store
                  size={34}
                  className="mx-auto text-[#B8A79A]"
                />

                <h3 className="font-semibold text-[#5A4638] mt-4">
                  No vendors found
                </h3>

                <p className="text-sm text-[#8A7567] mt-2">
                  Try a different search or remove a filter.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 px-5 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold"
                >
                  Clear filters
                </button>

              </div>
            ) : (
              filteredVendors.map((vendor) => {

                const isFavourite =
                  favourites.includes(vendor.id);

                return (
                  <article
                    key={vendor.id}
                    className="group py-6 border-b border-[#E8DCD2] hover:bg-[#FFF9F4] px-3 md:px-5 transition"
                  >

                    <div className="grid md:grid-cols-[64px_1fr_auto] gap-5 items-start">

                      {/* ICON */}

                      <div className="w-14 h-14 rounded-xl bg-[#FBE8DE] flex items-center justify-center">

                        <Store
                          size={23}
                          className="text-[#C97B63]"
                        />

                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-xl font-semibold text-[#4E3C31]">
                            {vendor.name}
                          </h3>

                          {vendor.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#627867] bg-[#EAF1EA] px-2 py-1 rounded-full">
                              <CheckCircle2 size={11} />
                              Profile verified
                            </span>
                          )}

                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-2">

                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1ECE6] text-[#756052]">
                            {vendor.category}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs text-[#8A7567]">
                            <MapPin size={13} />
                            {vendor.area}
                          </span>

                          <span className="text-xs text-[#9A8678]">
                            {vendor.distance}
                          </span>

                        </div>

                        <p className="text-sm text-[#8A7567] mt-3 max-w-2xl leading-6">
                          {vendor.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-[#9A8678]">

                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 size={13} />
                            {vendor.hours}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Star
                              size={13}
                              className="text-[#C97B63]"
                              fill="currentColor"
                            />
                            {vendor.rating}
                          </span>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="flex md:flex-col lg:flex-row items-center gap-2 md:pt-1">

                        <button
                          onClick={() =>
                            toggleFavourite(
                              vendor.id
                            )
                          }
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
                            isFavourite
                              ? "bg-[#FBE8DE] border-[#D9B6A4] text-[#C97B63]"
                              : "border-[#E0D3C8] text-[#9A8678] hover:bg-[#FBE8DE] hover:text-[#C97B63]"
                          }`}
                          title="Favourite"
                        >
                          <Heart
                            size={17}
                            fill={
                              isFavourite
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>

                        <button
                          onClick={() =>
                            setSelectedVendor(
                              vendor
                            )
                          }
                          className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DCCFC4] rounded-lg text-sm font-semibold text-[#665347] hover:border-[#C97B63] hover:text-[#C97B63] transition"
                        >
                          View
                          <ChevronRight
                            size={15}
                          />
                        </button>

                      </div>

                    </div>

                  </article>
                );
              })
            )}

          </div>

        </section>

        {/* ================================================= */}
        {/* BOTTOM INFO */}
        {/* ================================================= */}

        <section className="border-t border-[#E8DCD2] bg-[#FBF6F0]">

          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10">

            <div className="flex items-start gap-3 max-w-3xl">

              <MapPin
                size={17}
                className="text-[#C97B63] mt-1"
              />

              <div>

                <p className="font-semibold text-[#4E3C31]">
                  About vendor locations
                </p>

                <p className="text-sm leading-6 text-[#8A7567] mt-1">
                  StreetBridge uses approximate area information for public
                  discovery rather than exposing an individual vendor's exact
                  location.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ================================================= */}
      {/* VENDOR DETAIL MODAL */}
      {/* ================================================= */}

      {selectedVendor && (
        <div className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DCD2]">

              <div>

                <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-semibold">
                  Vendor Profile
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  {selectedVendor.name}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedVendor(null)
                }
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#F8EEE7]"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}

            <div className="p-6">

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-xl bg-[#FBE8DE] flex items-center justify-center">
                  <Store
                    size={24}
                    className="text-[#C97B63]"
                  />
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="text-2xl font-semibold text-[#4E3C31]">
                      {selectedVendor.name}
                    </h3>

                    {selectedVendor.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#627867] bg-[#EAF1EA] px-2.5 py-1 rounded-full">
                        <CheckCircle2
                          size={13}
                        />
                        Profile verified
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-[#8A7567] mt-2">
                    {selectedVendor.description}
                  </p>

                </div>

              </div>

              {/* DETAILS */}

              <div className="grid md:grid-cols-2 gap-0 mt-7 border-t border-[#EAE1DA]">

                <div className="py-5 md:pr-6 border-b md:border-b-0 md:border-r border-[#EAE1DA]">

                  <div className="flex items-center gap-2 text-[#9A8678] text-xs uppercase tracking-wider">
                    <MapPin size={14} />
                    Area
                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedVendor.area}
                  </p>

                  <p className="text-xs text-[#9A8678] mt-1">
                    Approx. {selectedVendor.distance} away
                  </p>

                </div>

                <div className="py-5 md:pl-6 border-b border-[#EAE1DA]">

                  <div className="flex items-center gap-2 text-[#9A8678] text-xs uppercase tracking-wider">
                    <Clock3 size={14} />
                    Hours
                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedVendor.hours}
                  </p>

                </div>

                <div className="py-5 md:pr-6 border-b md:border-b-0 md:border-r border-[#EAE1DA]">

                  <div className="flex items-center gap-2 text-[#9A8678] text-xs uppercase tracking-wider">
                    <Star size={14} />
                    Rating
                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedVendor.rating} / 5
                  </p>

                </div>

                <div className="py-5 md:pl-6">

                  <div className="flex items-center gap-2 text-[#9A8678] text-xs uppercase tracking-wider">
                    <Phone size={14} />
                    Contact
                  </div>

                  <p className="text-sm font-semibold text-[#5A4638] mt-2">
                    {selectedVendor.phone}
                  </p>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3 mt-7">

                <button
                  onClick={() =>
                    toggleFavourite(
                      selectedVendor.id
                    )
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold ${
                    favourites.includes(
                      selectedVendor.id
                    )
                      ? "bg-[#FBE8DE] border-[#D9B6A4] text-[#C97B63]"
                      : "border-[#DCCFC4] text-[#665347]"
                  }`}
                >
                  <Heart
                    size={16}
                    fill={
                      favourites.includes(
                        selectedVendor.id
                      )
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {favourites.includes(
                    selectedVendor.id
                  )
                    ? "Saved"
                    : "Save vendor"}
                </button>

                <button
                  onClick={() =>
                    setSelectedVendor(null)
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C97B63] text-white rounded-lg text-sm font-semibold hover:bg-[#B86D56]"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
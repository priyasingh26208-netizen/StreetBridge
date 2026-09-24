import React from "react";
import {
  ArrowRight,
  MapPin,
  Navigation,
  Store,
  Utensils,
  Leaf,
  Coffee,
  ShoppingBasket,
  Shirt,
  Bell,
  Heart,
  Compass,
  Users,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import CitizenNavbar from "../components/CitizenNavbar";

const categories = [
  {
    name: "Food",
    icon: Utensils,
    count: "18 vendors",
  },
  {
    name: "Fruits",
    icon: Leaf,
    count: "11 vendors",
  },
  {
    name: "Vegetables",
    icon: ShoppingBasket,
    count: "14 vendors",
  },
  {
    name: "Tea",
    icon: Coffee,
    count: "09 vendors",
  },
  {
    name: "Clothing",
    icon: Shirt,
    count: "07 vendors",
  },
];

const featuredVendors = [
  {
    id: 1,
    name: "Sharma Fresh Fruits",
    category: "Fruits",
    area: "Sector 18 Market",
    distance: "0.3 km",
    description:
      "Fresh seasonal fruits and everyday produce.",
    rating: "4.8",
  },
  {
    id: 2,
    name: "Raju Chai Corner",
    category: "Tea",
    area: "Sector 18 Market",
    distance: "0.5 km",
    description:
      "Tea, snacks and quick refreshments.",
    rating: "4.7",
  },
  {
    id: 3,
    name: "Anita Street Kitchen",
    category: "Food",
    area: "Atta Market",
    distance: "1.1 km",
    description:
      "Freshly prepared local street food.",
    rating: "4.9",
  },
];

const updates = [
  {
    title: "Registration camp announced",
    area: "Sector 18 Market",
    date: "18 Sep 2026",
  },
  {
    title: "Market-area public information",
    area: "Sector 18",
    date: "14 Sep 2026",
  },
  {
    title: "Local vendor awareness update",
    area: "Noida",
    date: "12 Sep 2026",
  },
];

export default function CitizenDashboard() {
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert(
        "Location detection is not supported by your browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        alert(
          "Your current area has been detected for this frontend demo."
        );
      },
      () => {
        alert(
          "Location permission was not available. You can still browse vendors manually."
        );
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">
      <CitizenNavbar />

      <main>

        {/* ================================================= */}
        {/* WELCOME HERO */}
        {/* ================================================= */}

        <section className="bg-[#FDF4EA] border-b border-[#E8DCD2]">

          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">

            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">

              {/* LEFT */}

              <div>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C97B63] uppercase tracking-[0.2em]">
                  <Sparkles size={14} />
                  Welcome to StreetBridge
                </div>

                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#4E3C31] leading-[1.03] mt-4">
                  Your neighbourhood
                  <br />
                  is closer than you think.
                </h1>

                <p className="mt-6 max-w-2xl text-[#8A7567] text-base md:text-lg leading-7">
                  Discover local street vendors, explore nearby markets and
                  support the small businesses that make your neighbourhood
                  feel like home.
                </p>

                {/* LOCATION */}

                <div className="mt-7 flex flex-wrap items-center gap-3">

                  <button
                    onClick={detectLocation}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-xl text-sm font-semibold hover:bg-[#B86D56] transition"
                  >
                    <Navigation size={16} />
                    Use my location
                  </button>

                  <div className="inline-flex items-center gap-2 px-4 py-3 border border-[#DCCFC4] rounded-xl text-sm text-[#756052] bg-white">
                    <MapPin size={16} />
                    Sector 18, Noida
                  </div>

                </div>

              </div>

              {/* RIGHT — VISUAL SNAPSHOT */}

              <div className="relative min-h-[280px]">

                <div className="absolute inset-0 bg-[#F8E9DD] rounded-[28px]" />

                <div className="absolute top-5 right-5 w-40 h-40 rounded-full border border-[#DDBCAA]" />

                <div className="absolute bottom-5 left-5 w-28 h-28 rounded-full border border-[#DDBCAA]" />

                {/* CENTRAL MARKET */}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                  <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Store
                      size={38}
                      className="text-[#C97B63]"
                    />
                  </div>

                </div>

                {/* FLOATING LABELS */}

                <div className="absolute top-8 left-8 bg-white px-3.5 py-2.5 rounded-xl shadow-sm border border-[#E8DCD2]">
                  <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                    Nearby
                  </p>
                  <p className="font-semibold text-sm text-[#5A4638]">
                    42 vendors
                  </p>
                </div>

                <div className="absolute right-7 bottom-8 bg-white px-3.5 py-2.5 rounded-xl shadow-sm border border-[#E8DCD2]">
                  <p className="text-[10px] uppercase tracking-widest text-[#9A8678]">
                    Markets
                  </p>
                  <p className="font-semibold text-sm text-[#5A4638]">
                    06 areas
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* QUICK SNAPSHOT */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[#E8DCD2]">

            <div className="py-6 pr-5 border-r border-[#E8DCD2]">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Nearby vendors
              </p>
              <p className="text-3xl font-semibold text-[#4E3C31] mt-1">
                42
              </p>
            </div>

            <div className="py-6 px-5 border-r border-[#E8DCD2]">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Market areas
              </p>
              <p className="text-3xl font-semibold text-[#4E3C31] mt-1">
                06
              </p>
            </div>

            <div className="py-6 px-5 border-r border-[#E8DCD2]">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                Saved vendors
              </p>
              <p className="text-3xl font-semibold text-[#C97B63] mt-1">
                04
              </p>
            </div>

            <div className="py-6 pl-5">
              <p className="text-[11px] uppercase tracking-widest text-[#9A8678]">
                New updates
              </p>
              <p className="text-3xl font-semibold text-[#C97B63] mt-1">
                03
              </p>
            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* CATEGORIES */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-10">

          <div className="flex items-end justify-between gap-5">

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678] font-semibold">
                Browse by type
              </p>

              <h2 className="text-3xl font-semibold text-[#4E3C31] mt-1">
                What are you looking for?
              </h2>
            </div>

            <Link
              to="/citizen-vendors"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#C97B63] hover:text-[#A45D45]"
            >
              See all vendors
              <ArrowRight size={15} />
            </Link>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-7">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to="/citizen-vendors"
                  className="group border border-[#E4D7CC] rounded-2xl p-5 hover:bg-[#FFF9F4] hover:border-[#D8B5A3] transition"
                >

                  <div className="w-11 h-11 rounded-xl bg-[#FBE8DE] flex items-center justify-center">
                    <Icon
                      size={20}
                      className="text-[#C97B63]"
                    />
                  </div>

                  <p className="font-semibold text-[#4E3C31] mt-5">
                    {category.name}
                  </p>

                  <p className="text-xs text-[#9A8678] mt-1">
                    {category.count}
                  </p>

                  <ArrowRight
                    size={15}
                    className="mt-4 text-[#C97B63] group-hover:translate-x-1 transition"
                  />

                </Link>
              );
            })}

          </div>

        </section>

        {/* ================================================= */}
        {/* FEATURED VENDORS */}
        {/* ================================================= */}

        <section className="bg-[#FBF6F0] border-y border-[#E8DCD2]">

          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-11">

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

              <div>

                <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-semibold">
                  Around you
                </p>

                <h2 className="text-3xl font-semibold text-[#4E3C31] mt-1">
                  A few places to start.
                </h2>

                <p className="text-sm text-[#8A7567] mt-2">
                  A quick look at vendors near your selected area.
                </p>

              </div>

              <Link
                to="/citizen-vendors"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C97B63]"
              >
                Explore all
                <ArrowRight size={15} />
              </Link>

            </div>

            <div className="mt-7 grid md:grid-cols-3 gap-5">

              {featuredVendors.map((vendor) => (
                <Link
                  key={vendor.id}
                  to="/citizen-vendors"
                  className="bg-white border border-[#E4D7CC] rounded-2xl p-6 hover:border-[#D8B5A3] hover:-translate-y-0.5 transition"
                >

                  <div className="flex items-start justify-between">

                    <div className="w-11 h-11 rounded-xl bg-[#FBE8DE] flex items-center justify-center">
                      <Store
                        size={20}
                        className="text-[#C97B63]"
                      />
                    </div>

                    <Heart
                      size={17}
                      className="text-[#C1ADA0]"
                    />

                  </div>

                  <h3 className="text-lg font-semibold text-[#4E3C31] mt-5">
                    {vendor.name}
                  </h3>

                  <span className="inline-flex mt-2 px-2.5 py-1 rounded-full bg-[#F1ECE6] text-[#756052] text-[10px] font-semibold uppercase tracking-wide">
                    {vendor.category}
                  </span>

                  <p className="text-sm text-[#8A7567] leading-6 mt-3">
                    {vendor.description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 text-xs text-[#9A8678]">

                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} />
                      {vendor.area}
                    </span>

                    <span>
                      {vendor.distance}
                    </span>

                  </div>

                  <div className="flex items-center gap-1.5 mt-4 text-xs text-[#A45D45] font-semibold">
                    <span>★</span>
                    {vendor.rating}
                  </div>

                </Link>
              ))}

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* MAP + UPDATES */}
        {/* ================================================= */}

        <section className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-11">

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-7">

            {/* MAP CTA */}

            <div className="border border-[#E4D7CC] rounded-2xl p-7 md:p-8 bg-white">

              <div className="flex items-center justify-between">

                <div className="w-11 h-11 rounded-xl bg-[#FBE8DE] flex items-center justify-center">
                  <Compass
                    size={21}
                    className="text-[#C97B63]"
                  />
                </div>

                <MapPin
                  size={20}
                  className="text-[#C3ADA0]"
                />

              </div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678] font-semibold mt-7">
                Explore the area
              </p>

              <h2 className="text-2xl md:text-3xl font-semibold text-[#4E3C31] mt-2">
                See vendors around you.
              </h2>

              <p className="text-sm leading-6 text-[#8A7567] mt-3 max-w-xl">
                Open the map to explore local vendor categories and
                approximate market areas.
              </p>

              <Link
                to="/citizen-map"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold hover:bg-[#B86D56]"
              >
                Open vendor map
                <ArrowRight size={15} />
              </Link>

            </div>

            {/* LOCAL UPDATES */}

            <div className="border border-[#E4D7CC] rounded-2xl p-7 md:p-8">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678] font-semibold">
                    Local updates
                  </p>

                  <h2 className="text-2xl font-semibold text-[#4E3C31] mt-1">
                    Around your market
                  </h2>
                </div>

                <Bell
                  size={19}
                  className="text-[#C97B63]"
                />

              </div>

              <div className="mt-6">

                {updates.map((update, index) => (
                  <Link
                    key={update.title}
                    to="/citizen-updates"
                    className={`block py-4 ${
                      index !== updates.length - 1
                        ? "border-b border-[#EEE5DE]"
                        : ""
                    }`}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-sm font-semibold text-[#5A4638]">
                          {update.title}
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-xs text-[#9A8678]">

                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} />
                            {update.area}
                          </span>

                          <span>
                            {update.date}
                          </span>

                        </div>

                      </div>

                      <ChevronRightIcon />

                    </div>

                  </Link>
                ))}

              </div>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* SUPPORT LOCAL */}
        {/* ================================================= */}

        <section className="bg-[#FDF4EA] border-t border-[#E8DCD2]">

          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-11">

            <div className="grid md:grid-cols-[auto_1fr_auto] gap-5 items-center">

              <div className="w-12 h-12 rounded-full bg-white border border-[#E5D7CC] flex items-center justify-center">
                <Users
                  size={22}
                  className="text-[#C97B63]"
                />
              </div>

              <div>

                <p className="text-[11px] uppercase tracking-[0.18em] text-[#C97B63] font-semibold">
                  StreetBridge
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-[#4E3C31] mt-1">
                  Discover local. Support local.
                </h2>

                <p className="text-sm text-[#8A7567] mt-1">
                  Street vendors are an important part of everyday
                  neighbourhood life.
                </p>

              </div>

              <Link
                to="/citizen-vendors"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold hover:bg-[#B86D56]"
              >
                Discover vendors
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <ArrowRight
      size={15}
      className="text-[#C97B63] mt-1 flex-shrink-0"
    />
  );
}
import heroImg from "../assets/heroo.png";
import {
  Bell,
 FileText,
  Bot,
  MapPin,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[#FAF3E7] relative overflow-hidden">

      <div className="relative">

        {/* Hero Image */}
        <img
          src={heroImg}
          alt="StreetBridge"
          className="w-full object-cover"
        />

        {/* Left Content */}
        <div className="absolute left-16 top-1/2 -translate-y-1/2 max-w-xl">

          <h1 className="text-7xl font-black text-[#2D3748] leading-none">
            Street
            <span className="text-[#C97B63]">Bridge</span>
          </h1>

          <h2 className="mt-5 text-5xl font-bold text-[#2D3748] leading-tight">
            The Digital Companion
            <br />
            for Every Street Vendor
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Helping vendors understand notices,
            receive alerts, manage documents,
            track locations and access multilingual
            AI assistance through one simple platform.
          </p>

          <button className="mt-8 px-8 py-4 bg-[#C97B63] text-white rounded-full font-semibold hover:bg-[#B86A53] transition">
            Get Started
          </button>

        </div>

        {/* Alert Card */}
        <div className="absolute top-[22%] left-[58%] bg-white shadow-lg rounded-3xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Bell className="text-[#C97B63]" />
            <div>
              <h4 className="font-semibold">New Alert</h4>
              <p className="text-sm text-gray-500">
                Enforcement Drive Nearby
              </p>
            </div>
          </div>
        </div>

        {/* Notice Card */}
        <div className="absolute top-[24%] right-[8%] bg-white shadow-lg rounded-3xl px-5 py-4">
          <div className="flex items-center gap-3">
            <FileText className="text-green-600" />
            <div>
              <h4 className="font-semibold">
                Notice Updated
              </h4>
              <p className="text-sm text-gray-500">
                Read in simple language
              </p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="absolute bottom-[38%] left-[53%] bg-white shadow-lg rounded-3xl px-5 py-4">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#C97B63]" />
            <div>
              <h4 className="font-semibold">
                Active Location
              </h4>
              <p className="text-sm text-gray-500">
                Lajpat Nagar Market
              </p>
            </div>
          </div>
        </div>

        {/* AI Card */}
        <div className="absolute bottom-[42%] right-[6%] bg-white shadow-lg rounded-3xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Bot className="text-indigo-500" />
            <div>
              <h4 className="font-semibold">
                AI Assistant
              </h4>
              <p className="text-sm text-gray-500">
                Ask in your language
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
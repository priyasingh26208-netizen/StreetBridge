import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function OnboardingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#FDF4EA] border-b border-[#EBDAC8]">
      <div className="w-full px-8 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="StreetBridge Logo"
            className="w-14 h-14 object-contain"
          />

          <h1 className="text-2xl font-bold">
            <span className="text-[#5A4638]">Street</span>
            <span className="text-[#C97B63]">Bridge</span>
          </h1>

        </div>

        {/* Center */}
<div className="hidden md:block absolute left-1/2 -translate-x-1/2">
  <span className="text-lg font-bold text-[#5A4638]">
    Welcome to StreetBridge
  </span>
</div>

        {/* Right */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[#5A4638] font-semibold hover:bg-[#F8E9DD] transition"
        >
          <ArrowLeft size={18} />
          Exit
        </button>

      </div>
    </nav>
  );
}
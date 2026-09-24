import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#FDF4EA] border-b border-[#EBDAC8] sticky top-0 z-50">
      <div className="w-full px-8 py-4 flex items-center">

        {/* Left Side - Logo + Project Name */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="StreetBridge Logo"
            className="w-20 h-20 object-contain"
          />

          <h1 className="text-3xl font-bold">
            <span className="text-[#2D3748]">Street</span>
            <span className="text-[#C97B63]">Bridge</span>
          </h1>

        </div>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center">

          <div className="hidden md:flex items-center gap-12">

            <a
              href="#"
              className="text-lg font-semibold text-[#2D3748] hover:text-[#C97B63] transition duration-300"
            >
              Home
            </a>

            <a
              href="#"
              className="text-lg font-semibold text-[#2D3748] hover:text-[#C97B63] transition duration-300"
            >
              Features
            </a>

            <a
              href="#"
              className="text-lg font-semibold text-[#2D3748] hover:text-[#C97B63] transition duration-300"
            >
              Vendor Portal
            </a>

            <a
              href="#"
              className="text-lg font-semibold text-[#2D3748] hover:text-[#C97B63] transition duration-300"
            >
              Citizen Portal
            </a>

          </div>

        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language Selector */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#EBDAC8] bg-white shadow-sm">

            <Globe
              size={18}
              className="text-[#C97B63]"
            />

            <select className="bg-transparent outline-none text-[#2D3748] cursor-pointer text-sm">
              <option>English</option>
              <option>हिन्दी</option>
              <option>বাংলা</option>
              <option>ਪੰਜਾਬੀ</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
            </select>

          </div>

          {/* Login Button */}
          <button
            onClick={() =>
              navigate("/auth", {
                state: {
                  mode: "login",
                  role: null,
                },
              })
            }
            className="px-5 py-2 rounded-full border border-[#C97B63] text-[#C97B63] font-medium hover:bg-[#FAEFE5] transition duration-300"
          >
            Login
          </button>

          {/* Create Account Button */}
          <button
            onClick={() =>
              navigate("/auth", {
                state: {
                  mode: "signup",
                  role: null,
                },
              })
            }
            className="px-5 py-2 rounded-full bg-[#C97B63] text-white font-medium hover:bg-[#B86A53] transition duration-300 shadow-md"
          >
            Create Account
          </button>

        </div>

      </div>
    </nav>
  );
}
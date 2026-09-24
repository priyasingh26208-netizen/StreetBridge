import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Home,
  Store,
  Map,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";

import logo from "../assets/logo.png";

export default function CitizenNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      path: "/citizen-dashboard",
      icon: Home,
    },
    {
      name: "Discover Vendors",
      path: "/citizen-vendors",
      icon: Store,
    },
    {
      name: "Map",
      path: "/citizen-map",
      icon: Map,
    },
    {
      name: "Local Updates",
      path: "/citizen-updates",
      icon: Bell,
    },
  ];

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <nav className="w-full bg-[#FDF4EA] border-b border-[#EBDAC8] sticky top-0 z-50">

      <div className="w-full px-6 md:px-8 py-3 flex items-center justify-between gap-4">

        {/* BRAND */}

        <Link
          to="/citizen-dashboard"
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src={logo}
            alt="StreetBridge Logo"
            className="w-14 h-14 object-contain"
          />

          <div>

            <h1 className="text-2xl font-bold leading-none">
              <span className="text-[#5A4638]">
                Street
              </span>

              <span className="text-[#C97B63]">
                Bridge
              </span>
            </h1>

            <p className="text-xs text-[#8A7567] mt-1">
              Citizen Portal
            </p>

          </div>
        </Link>

        {/* NAV */}

        <div className="hidden xl:flex items-center gap-3">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  active
                    ? "bg-[#F8E9DD] !text-[#C97B63]"
                    : "!text-[#5A4638] hover:!text-[#C97B63] hover:bg-[#FFF7F0]"
                }`}
              >
                <Icon size={17} />
                {item.name}
              </Link>
            );
          })}

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          <Link
            to="/citizen-profile"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
              location.pathname ===
              "/citizen-profile"
                ? "bg-[#F8E9DD]"
                : "hover:bg-[#FFF7F0]"
            }`}
          >
            <UserCircle
              size={25}
              className="text-[#C97B63]"
            />

            <div className="hidden 2xl:block">

              <p className="text-sm font-semibold text-[#5A4638]">
                My Profile
              </p>

              <p className="text-xs text-[#8A7567]">
                Citizen
              </p>

            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#C97B63] !text-[#C97B63] text-sm font-semibold hover:bg-[#FAEFE5]"
          >
            <LogOut size={17} />

            <span className="hidden 2xl:block">
              Logout
            </span>
          </button>

        </div>

      </div>
    </nav>
  );
}
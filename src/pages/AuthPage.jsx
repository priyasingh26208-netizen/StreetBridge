import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Store,
  Users,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // STATE
  // ---------------------------------------------------------

  const [role, setRole] = useState(null);
  const [mode, setMode] = useState("signup");
  const [showPassword, setShowPassword] =
    useState(false);

  const isSignup = mode === "signup";

  // ---------------------------------------------------------
  // SYNC ROLE + MODE WITH NAVIGATION
  // ---------------------------------------------------------
  // This is the important fix.
  // Whenever /auth is opened with different state,
  // the component updates its role and mode.
  // ---------------------------------------------------------

  useEffect(() => {
    const incomingRole =
      location.state?.role === "vendor" ||
      location.state?.role === "citizen"
        ? location.state.role
        : null;

    const incomingMode =
      location.state?.mode === "login"
        ? "login"
        : "signup";

    setRole(incomingRole);
    setMode(incomingMode);
    setShowPassword(false);
  }, [location.key, location.state]);

  // ---------------------------------------------------------
  // ROLE CHANGE
  // ---------------------------------------------------------

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  // ---------------------------------------------------------
  // SUBMIT
  // ---------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) return;

    // SIGNUP
    if (isSignup) {
      if (role === "vendor") {
        navigate("/vendor-onboarding");
        return;
      }

      if (role === "citizen") {
        navigate("/citizen-dashboard");
        return;
      }
    }

    // LOGIN
    if (!isSignup) {
      if (role === "vendor") {
        navigate("/vendor-dashboard");
        return;
      }

      if (role === "citizen") {
        navigate("/citizen-dashboard");
        return;
      }
    }
  };

  // ---------------------------------------------------------
  // SWITCH MODE
  // ---------------------------------------------------------

  const goToLogin = () => {
    setMode("login");
  };

  const goToSignup = () => {
    setMode("signup");
  };

  // ---------------------------------------------------------
  // BACK TO LANDING
  // ---------------------------------------------------------

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FAF3E7] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-5xl bg-white rounded-[35px] shadow-xl overflow-hidden">

        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <div className="px-8 pt-8">

          <button
            type="button"
            onClick={goBackHome}
            className="flex items-center gap-2 text-gray-500 hover:text-[#C97B63] transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>

        <div className="px-8 md:px-14 py-10">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="text-center">

            <span className="inline-block px-4 py-2 rounded-full bg-[#F8E9DD] text-[#C97B63] text-sm font-semibold">
              StreetBridge
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mt-5">
              {isSignup
                ? "Create Your Account"
                : "Welcome Back"}
            </h1>

            <p className="text-gray-500 mt-3">
              {isSignup
                ? "Choose your role and create your StreetBridge account."
                : "Choose your role to continue to your dashboard."}
            </p>

          </div>

          {/* ================================================= */}
          {/* ROLE SELECTION */}
          {/* ================================================= */}

          {!role && (
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">

              {/* ========================================= */}
              {/* VENDOR */}
              {/* ========================================= */}

              <button
                type="button"
                onClick={() =>
                  handleRoleChange("vendor")
                }
                className="group p-8 rounded-[28px] border-2 border-[#E8DDCC] text-left hover:border-[#C97B63] hover:shadow-lg transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-[#F8E9DD] flex items-center justify-center group-hover:bg-[#C97B63] transition">

                  <Store
                    size={30}
                    className="text-[#C97B63] group-hover:text-white"
                  />

                </div>

                <h2 className="text-2xl font-bold text-[#2D3748] mt-6">
                  I'm a Vendor
                </h2>

                <p className="text-gray-500 mt-3 leading-relaxed">
                  Manage notices, documents, vendor details, location,
                  alerts and AI assistance.
                </p>

              </button>

              {/* ========================================= */}
              {/* CITIZEN */}
              {/* ========================================= */}

              <button
                type="button"
                onClick={() =>
                  handleRoleChange("citizen")
                }
                className="group p-8 rounded-[28px] border-2 border-[#E8DDCC] text-left hover:border-[#C97B63] hover:shadow-lg transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-[#EEF2F5] flex items-center justify-center group-hover:bg-[#2D3748] transition">

                  <Users
                    size={30}
                    className="text-[#2D3748] group-hover:text-white"
                  />

                </div>

                <h2 className="text-2xl font-bold text-[#2D3748] mt-6">
                  I'm a Citizen
                </h2>

                <p className="text-gray-500 mt-3 leading-relaxed">
                  Discover local vendors, explore nearby markets and access
                  community information.
                </p>

              </button>

            </div>
          )}

          {/* ================================================= */}
          {/* AUTH FORM */}
          {/* ================================================= */}

          {role && (
            <div className="max-w-lg mx-auto mt-10">

              {/* ========================================= */}
              {/* SELECTED ROLE */}
              {/* ========================================= */}

              <div className="flex items-center justify-between bg-[#FFF8F1] border border-[#EBDAC8] rounded-2xl px-5 py-4">

                <div className="flex items-center gap-3">

                  {role === "vendor" ? (
                    <div className="w-10 h-10 rounded-xl bg-[#F8E9DD] flex items-center justify-center">

                      <Store
                        size={20}
                        className="text-[#C97B63]"
                      />

                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-[#EEF2F5] flex items-center justify-center">

                      <Users
                        size={20}
                        className="text-[#2D3748]"
                      />

                    </div>
                  )}

                  <div>

                    <p className="text-sm text-gray-500">
                      Continuing as
                    </p>

                    <p className="font-bold text-[#2D3748]">
                      {role === "vendor"
                        ? "Vendor"
                        : "Citizen"}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setRole(null)}
                  className="text-sm text-[#C97B63] font-semibold hover:underline"
                >
                  Change
                </button>

              </div>

              {/* ========================================= */}
              {/* FORM HEADING */}
              {/* ========================================= */}

              <div className="mt-8">

                <h2 className="text-3xl font-bold text-[#2D3748]">

                  {isSignup
                    ? `Create ${
                        role === "vendor"
                          ? "Vendor"
                          : "Citizen"
                      } Account`
                    : `${
                        role === "vendor"
                          ? "Vendor"
                          : "Citizen"
                      } Login`}

                </h2>

                <p className="text-gray-500 mt-2">

                  {isSignup
                    ? "Enter your basic details to get started."
                    : "Enter your account details to continue."}

                </p>

              </div>

              {/* ========================================= */}
              {/* FORM */}
              {/* ========================================= */}

              <form onSubmit={handleSubmit}>

                {/* FULL NAME */}

                {isSignup && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full mt-7 p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63] focus:ring-2 focus:ring-[#C97B63]/10"
                  />
                )}

                {/* MOBILE */}

                {isSignup && (
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    required
                    className="w-full mt-4 p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63] focus:ring-2 focus:ring-[#C97B63]/10"
                  />
                )}

                {/* EMAIL */}

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full mt-4 p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63] focus:ring-2 focus:ring-[#C97B63]/10"
                />

                {/* PREFERRED LANGUAGE */}

                {isSignup && (
                  <select
                    required
                    defaultValue=""
                    className="w-full mt-4 p-4 rounded-xl border border-gray-200 bg-white text-gray-500 outline-none focus:border-[#C97B63] focus:ring-2 focus:ring-[#C97B63]/10"
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select Preferred Language
                    </option>

                    <option value="english">
                      English
                    </option>

                    <option value="hindi">
                      हिन्दी
                    </option>

                    <option value="punjabi">
                      ਪੰਜਾਬੀ
                    </option>

                    <option value="bengali">
                      বাংলা
                    </option>

                    <option value="tamil">
                      தமிழ்
                    </option>

                    <option value="telugu">
                      తెలుగు
                    </option>

                  </select>
                )}

                {/* PASSWORD */}

                <div className="relative mt-4">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    required
                    className="w-full p-4 pr-12 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63] focus:ring-2 focus:ring-[#C97B63]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C97B63]"
                  >

                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

                {/* TERMS */}

                {isSignup && (
                  <label className="flex items-start gap-3 mt-5 text-sm text-gray-500 cursor-pointer">

                    <input
                      type="checkbox"
                      required
                      className="mt-1 accent-[#C97B63]"
                    />

                    <span>
                      I agree to the Terms & Conditions
                      and Privacy Policy.
                    </span>

                  </label>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="w-full mt-7 py-4 rounded-xl bg-[#C97B63] text-white font-semibold hover:bg-[#B86A53] transition shadow-md"
                >
                  {isSignup
                    ? "Create Account"
                    : "Login"}
                </button>

              </form>

              {/* ========================================= */}
              {/* SWITCH LOGIN / SIGNUP */}
              {/* ========================================= */}

              <p className="text-center mt-6 text-gray-500">

                {isSignup ? (
                  <>
                    Already have an account?{" "}

                    <button
                      type="button"
                      onClick={goToLogin}
                      className="text-[#C97B63] font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}

                    <button
                      type="button"
                      onClick={goToSignup}
                      className="text-[#C97B63] font-semibold hover:underline"
                    >
                      Create Account
                    </button>
                  </>
                )}

              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
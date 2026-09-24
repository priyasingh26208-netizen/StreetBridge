import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Languages,
  MapPin,
  Bell,
  ShieldCheck,
  Lock,
  LogOut,
  Save,
  Check,
  ChevronRight,
  Settings,
  CircleUserRound,
} from "lucide-react";
import VendorNavbar from "../components/VendorNavbar";

export default function VendorProfile() {
  const [name, setName] =
    useState("Priya Singh");

  const [email, setEmail] =
    useState("priya@example.com");

  const [mobile, setMobile] =
    useState("+91 98XXXXXXXX");

  const [language, setLanguage] =
    useState("English");

  const [usualArea, setUsualArea] =
    useState("Sector 18, Noida");

  const [saved, setSaved] =
    useState(false);

  const [notifications, setNotifications] =
    useState({
      publicUpdates: true,
      areaUpdates: true,
      documentReminders: true,
      communityUpdates: false,
    });

  const toggleNotification = (
    key
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveChanges = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-white text-[#5A4638]">
      <VendorNavbar />

      <main className="px-5 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="pb-8 border-b border-[#E8DCD2]">

            <p className="text-[12px] uppercase tracking-[0.22em] font-semibold text-[#C97B63] mb-3">
              My Profile
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#4E3C31]">
              Your account, your settings.
            </h1>

            <p className="mt-4 max-w-2xl text-[#8A7567] text-base leading-7">
              Manage your basic profile information, preferred language and
              StreetBridge notification preferences.
            </p>

          </div>

          {/* PROFILE INTRO */}

          <section className="grid lg:grid-cols-[1fr_0.75fr] border-b border-[#E8DCD2]">

            <div className="py-9 lg:pr-12 lg:border-r border-[#E8DCD2]">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-[#FBE8DE] border border-[#E6CABC] flex items-center justify-center">
                  <CircleUserRound
                    size={37}
                    className="text-[#C97B63]"
                  />
                </div>

                <div>

                  <h2 className="text-2xl font-semibold text-[#4E3C31]">
                    {name}
                  </h2>

                  <p className="text-sm text-[#8A7567] mt-1">
                    StreetBridge Vendor
                  </p>

                  <div className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#607864]">
                    <Check size={13} />
                    Account active
                  </div>

                </div>

              </div>

            </div>

            <div className="py-9 lg:pl-12">

              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A8678] font-semibold">
                Profile status
              </p>

              <div className="mt-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-[#756052]">
                    Basic profile
                  </span>

                  <span className="text-sm font-semibold text-[#C97B63]">
                    80%
                  </span>

                </div>

                <div className="h-2 bg-[#F0E7DF] rounded-full mt-2 overflow-hidden">

                  <div
                    className="h-full bg-[#C97B63] rounded-full"
                    style={{
                      width: "80%",
                    }}
                  />

                </div>

                <p className="text-xs text-[#9A8678] mt-3">
                  Complete the remaining vendor information from your
                  onboarding or relevant portal sections.
                </p>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* PERSONAL INFORMATION */}
          {/* ================================================= */}

          <section className="mt-9 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="px-6 md:px-8 py-5 bg-[#FBF6F0] border-b border-[#E4D7CC] flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                <UserRound
                  size={17}
                  className="text-[#C97B63]"
                />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                  Account information
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Personal details
                </h2>
              </div>

            </div>

            <div className="p-6 md:p-8">

              <div className="grid md:grid-cols-2 gap-6">

                {/* NAME */}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#5A4638]">
                    <UserRound size={15} />
                    Full name
                  </label>

                  <input
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

                {/* MOBILE */}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#5A4638]">
                    <Phone size={15} />
                    Mobile number
                  </label>

                  <input
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value)
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#5A4638]">
                    <Mail size={15} />
                    Email
                  </label>

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />
                </div>

                {/* LANGUAGE */}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-[#5A4638]">
                    <Languages size={15} />
                    Preferred language
                  </label>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm bg-white outline-none focus:border-[#C97B63]"
                  >
                    <option>
                      English
                    </option>
                    <option>
                      Hindi
                    </option>
                    <option>
                      Punjabi
                    </option>
                    <option>
                      Bengali
                    </option>
                  </select>
                </div>

                {/* USUAL AREA */}

                <div className="md:col-span-2">

                  <label className="flex items-center gap-2 text-sm font-semibold text-[#5A4638]">
                    <MapPin size={15} />
                    Usual working area
                  </label>

                  <input
                    value={usualArea}
                    onChange={(e) =>
                      setUsualArea(
                        e.target.value
                      )
                    }
                    className="w-full mt-2 border border-[#DED1C6] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C97B63]"
                  />

                  <p className="text-xs text-[#9A8678] mt-2">
                    This is general profile information. Your daily working
                    area is managed separately in the Location section.
                  </p>

                </div>

              </div>

              <button
                onClick={saveChanges}
                className="inline-flex items-center gap-2 mt-7 px-5 py-3 bg-[#C97B63] text-white rounded-lg text-sm font-semibold hover:bg-[#B86D56]"
              >
                {saved ? (
                  <>
                    <Check size={16} />
                    Saved
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save changes
                  </>
                )}
              </button>

            </div>
          </section>

          {/* ================================================= */}
          {/* NOTIFICATIONS */}
          {/* ================================================= */}

          <section className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="px-6 md:px-8 py-5 bg-[#FBF6F0] border-b border-[#E4D7CC] flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                <Bell
                  size={17}
                  className="text-[#C97B63]"
                />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                  Preferences
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Notification settings
                </h2>
              </div>

            </div>

            <div>

              {[
                {
                  key: "publicUpdates",
                  title: "Public information",
                  text: "Updates and information from public/official sources.",
                },
                {
                  key: "areaUpdates",
                  title: "Area updates",
                  text: "Information connected to your selected working area.",
                },
                {
                  key: "documentReminders",
                  title: "Document reminders",
                  text: "Reminders related to your document records.",
                },
                {
                  key: "communityUpdates",
                  title: "Community updates",
                  text: "Clearly labelled community-reported information.",
                },
              ].map((item) => (

                <div
                  key={item.key}
                  className="flex items-center justify-between gap-5 px-6 md:px-8 py-5 border-b border-[#EEE5DE] last:border-b-0"
                >

                  <div>

                    <p className="font-semibold text-[#5A4638]">
                      {item.title}
                    </p>

                    <p className="text-sm text-[#8A7567] mt-1">
                      {item.text}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      toggleNotification(
                        item.key
                      )
                    }
                    className={`relative w-11 h-6 rounded-full flex-shrink-0 transition ${
                      notifications[item.key]
                        ? "bg-[#C97B63]"
                        : "bg-[#D9CEC5]"
                    }`}
                  >

                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                        notifications[item.key]
                          ? "left-6"
                          : "left-1"
                      }`}
                    />

                  </button>

                </div>
              ))}

            </div>
          </section>

          {/* ================================================= */}
          {/* ACCOUNT & SECURITY */}
          {/* ================================================= */}

          <section className="mt-8 border border-[#E4D7CC] rounded-2xl overflow-hidden">

            <div className="px-6 md:px-8 py-5 bg-[#FBF6F0] border-b border-[#E4D7CC] flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-[#FBE8DE] flex items-center justify-center">
                <Settings
                  size={17}
                  className="text-[#C97B63]"
                />
              </div>

              <div>

                <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#9A8678]">
                  Account
                </p>

                <h2 className="text-xl font-semibold text-[#4E3C31] mt-1">
                  Security & access
                </h2>

              </div>

            </div>

            <div>

              <button
                onClick={() =>
                  alert(
                    "Password change will be connected to authentication backend later."
                  )
                }
                className="w-full flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#EEE5DE] hover:bg-[#FFF9F4] transition text-left"
              >

                <div className="flex items-center gap-3">

                  <Lock
                    size={18}
                    className="text-[#C97B63]"
                  />

                  <div>

                    <p className="font-semibold text-[#5A4638]">
                      Change password
                    </p>

                    <p className="text-sm text-[#8A7567] mt-1">
                      Update your account password.
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={18}
                  className="text-[#B5A397]"
                />

              </button>

              <button
                onClick={() =>
                  alert(
                    "Logout will be connected to authentication backend later."
                  )
                }
                className="w-full flex items-center justify-between px-6 md:px-8 py-5 hover:bg-[#FFF9F4] transition text-left"
              >

                <div className="flex items-center gap-3">

                  <LogOut
                    size={18}
                    className="text-[#A45D45]"
                  />

                  <div>

                    <p className="font-semibold text-[#A45D45]">
                      Log out
                    </p>

                    <p className="text-sm text-[#8A7567] mt-1">
                      End your current StreetBridge session.
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={18}
                  className="text-[#B5A397]"
                />

              </button>

            </div>
          </section>

          {/* FOOTNOTE */}

          <div className="flex items-start gap-3 max-w-3xl py-7">

            <ShieldCheck
              size={16}
              className="text-[#9A8678] mt-1"
            />

            <p className="text-sm leading-6 text-[#8A7567]">
              Profile changes and notification preferences are currently
              frontend-only. They will persist permanently once authentication
              and backend storage are connected.
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}
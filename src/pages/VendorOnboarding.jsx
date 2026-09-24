import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Store,
  FileText,
  MapPin,
  Bell,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
} from "lucide-react";

import Navbar from "../components/OnboardingNavbar";

export default function VendorOnboarding() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [vendorType, setVendorType] = useState("");
  const [workingArea, setWorkingArea] = useState("");
  const [locationStatus, setLocationStatus] = useState("");

  const [documents, setDocuments] = useState({
    idProof: null,
    addressProof: null,
    certificate: null,
    applicationReceipt: null,
  });

  const [alerts, setAlerts] = useState({
    publicNotices: true,
    registrationUpdates: true,
    documentReminders: true,
    areaUpdates: true,
  });

  const handleFileChange = (name, file) => {
    setDocuments((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported by this browser.");
      return;
    }

    setLocationStatus("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationStatus("Current working area selected.");
      },
      () => {
        setLocationStatus(
          "Unable to access location. Please enter your working area manually."
        );
      }
    );
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    navigate("/vendor-dashboard");
  };

  const steps = [
    {
      number: 1,
      title: "Personal",
      icon: User,
    },
    {
      number: 2,
      title: "Vendor Details",
      icon: Store,
    },
    {
      number: 3,
      title: "Documents",
      icon: FileText,
    },
    {
      number: 4,
      title: "Location",
      icon: MapPin,
    },
    {
      number: 5,
      title: "Alerts",
      icon: Bell,
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAF3F7] px-6 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8E9DD] text-[#C97B63] text-sm font-semibold">
              <CheckCircle2 size={16} />
              Account Created Successfully
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mt-5">
              Complete Your Vendor Profile
            </h1>

            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Add a few more details to personalize your StreetBridge
              experience and access vendor services.
            </p>

          </div>

          {/* Main Card */}
          <div className="bg-white rounded-[35px] shadow-xl overflow-hidden">

            {/* Progress Bar */}
            <div className="px-8 md:px-12 pt-8">

              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const active = currentStep >= step.number;

                  return (
                    <div
                      key={step.number}
                      className="flex items-center flex-1"
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${
                            active
                              ? "bg-[#C97B63] text-white"
                              : "bg-[#F3ECE6] text-gray-400"
                          }`}
                        >
                          <Icon size={21} />
                        </div>

                        <span
                          className={`text-xs md:text-sm mt-2 font-medium ${
                            active
                              ? "text-[#2D3748]"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </span>

                      </div>

                      {index !== steps.length - 1 && (
                        <div
                          className={`h-[2px] flex-1 mx-3 mt-[-20px] ${
                            currentStep > step.number
                              ? "bg-[#C97B63]"
                              : "bg-[#E8DDCC]"
                          }`}
                        />
                      )}

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Form Content */}
            <div className="px-8 md:px-16 py-12">

              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="max-w-3xl mx-auto">

                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#2D3748]">
                      Personal Details
                    </h2>

                    <p className="text-gray-500 mt-2">
                      These details come from your account information.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-[#2D3748] mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2D3748] mb-2">
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        placeholder="Enter mobile number"
                        className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63]"
                      />
                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="block text-sm font-semibold text-[#2D3748] mb-2">
                      Preferred Language
                    </label>

                    <select className="w-full p-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#C97B63]">
                      <option value="">Select language</option>
                      <option>English</option>
                      <option>हिन्दी</option>
                      <option>ਪੰਜਾਬੀ</option>
                      <option>বাংলা</option>
                      <option>தமிழ்</option>
                      <option>తెలుగు</option>
                    </select>

                  </div>

                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="max-w-3xl mx-auto">

                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#2D3748]">
                      Vendor Details
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Tell us about the type of vending work you do.
                    </p>
                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-[#2D3748] mb-3">
                      What do you sell?
                    </label>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                      {[
                        "Fruit",
                        "Vegetable",
                        "Food",
                        "Tea",
                        "Clothing",
                        "Other",
                      ].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setVendorType(type)}
                          className={`p-4 rounded-2xl border-2 text-left font-medium transition ${
                            vendorType === type
                              ? "border-[#C97B63] bg-[#FFF6F0] text-[#C97B63]"
                              : "border-gray-200 text-[#2D3748] hover:border-[#DDB9A9]"
                          }`}
                        >
                          {type}
                        </button>
                      ))}

                    </div>

                  </div>

                  <div className="mt-8">

                    <label className="block text-sm font-semibold text-[#2D3748] mb-2">
                      Permanent Address
                    </label>

                    <textarea
                      rows="4"
                      placeholder="Enter your permanent address"
                      className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63] resize-none"
                    />

                  </div>

                  <div className="mt-8">

                    <label className="block text-sm font-semibold text-[#2D3748] mb-3">
                      Usual Working Hours
                    </label>

                    <div className="grid md:grid-cols-2 gap-4">

                      <div className="relative">
                        <Clock
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C97B63]"
                        />

                        <input
                          type="time"
                          className="w-full p-4 pl-11 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63]"
                        />
                      </div>

                      <div className="relative">
                        <Clock
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C97B63]"
                        />

                        <input
                          type="time"
                          className="w-full p-4 pl-11 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63]"
                        />
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="max-w-3xl mx-auto">

                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#2D3748]">
                      Upload Your Documents
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Add available documents. Missing documents can be
                      added later.
                    </p>
                  </div>

                  <div className="space-y-5">

                    {[
                      {
                        key: "idProof",
                        title: "Identity Proof",
                        description: "Aadhaar or another accepted ID proof",
                      },
                      {
                        key: "addressProof",
                        title: "Address Proof",
                        description: "Upload your address verification document",
                      },
                      {
                        key: "certificate",
                        title: "Certificate of Vending",
                        description: "Upload your vending certificate if available",
                      },
                      {
                        key: "applicationReceipt",
                        title: "Application / Registration Receipt",
                        description: "Add your application receipt if available",
                      },
                    ].map((doc) => (
                      <label
                        key={doc.key}
                        className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 hover:border-[#C97B63] cursor-pointer transition"
                      >
                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-xl bg-[#FFF3EC] flex items-center justify-center">
                            <FileText
                              size={22}
                              className="text-[#C97B63]"
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold text-[#2D3748]">
                              {doc.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {documents[doc.key]
                                ? documents[doc.key].name
                                : doc.description}
                            </p>
                          </div>

                        </div>

                        <div className="flex items-center gap-2 bg-[#FAF3F7] text-[#C97B63] px-4 py-2 rounded-xl font-medium">

                          <Upload size={17} />

                          {documents[doc.key]
                            ? "Change"
                            : "Upload"}

                        </div>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(
                              doc.key,
                              e.target.files[0]
                            )
                          }
                        />

                      </label>
                    ))}

                  </div>

                </div>
              )}

              {/* STEP 4 */}
              {currentStep === 4 && (
                <div className="max-w-3xl mx-auto">

                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#2D3748]">
                      Set Your Working Area
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Let StreetBridge know where you currently operate.
                    </p>
                  </div>

                  <div className="bg-[#FFF8F1] border border-[#EBDAC8] rounded-3xl p-7">

                    <div className="flex items-start gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-[#C97B63] text-white flex items-center justify-center">
                        <MapPin size={25} />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#2D3748]">
                          Current Working Area
                        </h3>

                        <p className="text-gray-500 mt-1">
                          Choose your usual vending area or update it
                          whenever your working location changes.
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="mt-7 w-full py-4 rounded-xl bg-[#C97B63] text-white font-semibold hover:bg-[#B86A53] transition"
                    >
                      Use Current Location
                    </button>

                    {locationStatus && (
                      <p className="text-sm text-[#C97B63] mt-3 text-center">
                        {locationStatus}
                      </p>
                    )}

                    <div className="flex items-center gap-3 my-7">
                      <div className="h-px bg-[#E8DDCC] flex-1" />
                      <span className="text-sm text-gray-400">
                        OR
                      </span>
                      <div className="h-px bg-[#E8DDCC] flex-1" />
                    </div>

                    <label className="block text-sm font-semibold text-[#2D3748] mb-2">
                      Search / Enter Area
                    </label>

                    <input
                      type="text"
                      value={workingArea}
                      onChange={(e) => setWorkingArea(e.target.value)}
                      placeholder="e.g. Sector 18 Market"
                      className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-[#C97B63]"
                    />

                  </div>

                  <div className="mt-5 p-4 rounded-2xl bg-[#F8F5F2] text-sm text-gray-500">
                    Your public vendor location can be shown as an
                    approximate area rather than exposing an exact private
                    coordinate.
                  </div>

                </div>
              )}

              {/* STEP 5 */}
              {currentStep === 5 && (
                <div className="max-w-3xl mx-auto">

                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#2D3748]">
                      Choose Your Alerts
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Select the information you want StreetBridge to
                      notify you about.
                    </p>
                  </div>

                  <div className="space-y-4">

                    {[
                      {
                        key: "publicNotices",
                        title: "Public Notices",
                        description:
                          "Get relevant public notices for your active area.",
                      },
                      {
                        key: "registrationUpdates",
                        title: "Registration Updates",
                        description:
                          "Receive updates related to registration processes.",
                      },
                      {
                        key: "documentReminders",
                        title: "Document Reminders",
                        description:
                          "Get reminders when important documents are missing.",
                      },
                      {
                        key: "areaUpdates",
                        title: "Area Updates",
                        description:
                          "Receive useful informational updates for your area.",
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center justify-between p-5 rounded-2xl border border-gray-200 cursor-pointer hover:border-[#C97B63] transition"
                      >
                        <div className="flex items-start gap-4">

                          <div className="w-11 h-11 rounded-xl bg-[#FFF3EC] flex items-center justify-center">
                            <Bell
                              size={20}
                              className="text-[#C97B63]"
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold text-[#2D3748]">
                              {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {item.description}
                            </p>
                          </div>

                        </div>

                        <input
                          type="checkbox"
                          checked={alerts[item.key]}
                          onChange={() =>
                            setAlerts((prev) => ({
                              ...prev,
                              [item.key]: !prev[item.key],
                            }))
                          }
                          className="w-5 h-5 accent-[#C97B63]"
                        />

                      </label>
                    ))}

                  </div>

                  {/* Completion */}
                  <div className="mt-8 p-6 rounded-3xl bg-[#FFF8F1] border border-[#EBDAC8]">

                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        className="text-[#C97B63]"
                        size={24}
                      />

                      <div>
                        <h3 className="font-bold text-[#2D3748]">
                          You're almost ready!
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Finish your profile to enter the Vendor Dashboard.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* Bottom Buttons */}
              <div className="max-w-3xl mx-auto mt-12 flex justify-between gap-4">

                <button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition ${
                    currentStep === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "border border-[#E8DDCC] text-[#2D3748] hover:bg-[#FAF3F7]"
                  }`}
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-7 py-3 rounded-xl bg-[#C97B63] text-white font-semibold flex items-center gap-2 hover:bg-[#B86A53] transition"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleComplete}
                    className="px-7 py-3 rounded-xl bg-[#C97B63] text-white font-semibold flex items-center gap-2 hover:bg-[#B86A53] transition"
                  >
                    Complete Profile
                    <CheckCircle2 size={18} />
                  </button>
                )}

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
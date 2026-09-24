import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Bot,
  Check,
  FileText,
  MapPin,
  Upload,
  AlertCircle,
  Clock3,
} from "lucide-react";

import VendorNavbar from "../components/VendorNavbar";

export default function VendorDashboard() {
  const vendorName = "Priya";
  const profileCompletion = 80;

  return (
    <div className="min-h-screen bg-white text-[#4F4037]">

      <VendorNavbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

        {/* ================= HEADER ================= */}
        <section className="grid lg:grid-cols-[1fr_360px] gap-12 pb-12 border-b border-[#E8DCD2]">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C97B63]">
              Vendor Dashboard
            </p>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#3F332C] mt-4 leading-tight">
              Welcome back, {vendorName}
              <span className="text-[#C97B63]">.</span>
            </h1>

            <p className="text-lg text-[#8A7669] mt-5 max-w-2xl leading-relaxed">
              Keep your profile updated, understand important notices,
              manage your documents, and stay informed about your area.
            </p>
          </div>


          {/* Profile completion */}
          <div className="lg:border-l lg:border-[#E8DCD2] lg:pl-10 flex flex-col justify-center">

            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-[#5A4638]">
                  Profile completion
                </p>

                <p className="text-sm text-[#9A887B] mt-1">
                  4 of 5 sections completed
                </p>
              </div>

              <span className="text-4xl font-bold text-[#C97B63]">
                {profileCompletion}%
              </span>
            </div>

            <div className="mt-5 h-2 bg-[#F1E7DE] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C97B63] rounded-full"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>

            <Link
              to="/vendor-profile"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#C97B63] hover:gap-3 transition-all"
            >
              Complete your profile
              <ArrowRight size={16} />
            </Link>

          </div>

        </section>


        {/* ================= TODAY ================= */}
        <section className="py-12 border-b border-[#E8DCD2]">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="flex items-start gap-5">

              <div className="w-14 h-14 rounded-full bg-[#F7E8DC] flex items-center justify-center shrink-0">
                <MapPin size={26} className="text-[#C97B63]" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.16em] font-semibold text-[#C97B63]">
                  Today's working area
                </p>

                <h2 className="text-3xl lg:text-4xl font-bold text-[#3F332C] mt-2">
                  Sector 18 Market
                </h2>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-[#8A7669]">
                  <span>Fruit Vendor</span>
                  <span>•</span>
                  <span>Updated at 9:15 AM</span>
                </div>
              </div>

            </div>

            <Link
              to="/vendor-location"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4F4037] text-white font-semibold hover:bg-[#3D302A] transition"
            >
              Change location
              <ArrowRight size={17} />
            </Link>

          </div>

        </section>


        {/* ================= TWO MAIN AREAS ================= */}
        <section className="grid lg:grid-cols-2 border-b border-[#E8DCD2]">

          {/* Latest Notice */}
          <div className="py-12 lg:pr-12 lg:border-r lg:border-[#E8DCD2]">

            <div className="flex items-center gap-3">
              <FileText size={20} className="text-[#C97B63]" />

              <span className="text-sm uppercase tracking-[0.16em] font-semibold text-[#C97B63]">
                Latest notice
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-[#3F332C] mt-5 leading-tight">
              A new public notice is available for your area.
            </h2>

            <p className="text-[#806E62] text-lg leading-relaxed mt-5 max-w-xl">
              Open the notice to understand what it means,
              what information it contains, and what you may
              need to do next.
            </p>

            <div className="mt-6 text-sm text-[#9A887B]">
              Published today · Sector 18 Market
            </div>

            <Link
              to="/vendor-notices"
              className="inline-flex items-center gap-2 mt-7 text-[#C97B63] font-semibold hover:gap-3 transition-all"
            >
              Read and understand notice
              <ArrowRight size={17} />
            </Link>

          </div>


          {/* Verification */}
          <div className="py-12 lg:pl-12">

            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-[#C97B63]" />

              <span className="text-sm uppercase tracking-[0.16em] font-semibold text-[#C97B63]">
                Documentation status
              </span>
            </div>

            <div className="flex items-end justify-between mt-5">

              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#3F332C]">
                  Partially Verified
                </h2>

                <p className="text-[#806E62] mt-2">
                  One document still needs to be added.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#FFF1D9] text-[#A86D18] text-sm font-semibold">
                1 Pending
              </span>

            </div>

            <div className="mt-7 space-y-4">

              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8E2]">
                <span className="text-[#5A4638]">
                  Identity Proof
                </span>
                <Check size={19} className="text-[#5A8A78]" />
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8E2]">
                <span className="text-[#5A4638]">
                  Address Proof
                </span>
                <Check size={19} className="text-[#5A8A78]" />
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8E2]">
                <span className="text-[#5A4638]">
                  Application Receipt
                </span>
                <Check size={19} className="text-[#5A8A78]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#5A4638]">
                  Certificate of Vending
                </span>

                <span className="text-[#B86A53] text-sm font-semibold">
                  Missing
                </span>
              </div>

            </div>

            <Link
              to="/vendor-documents"
              className="inline-flex items-center gap-2 mt-7 text-[#C97B63] font-semibold hover:gap-3 transition-all"
            >
              <Upload size={17} />
              Manage documents
            </Link>

          </div>

        </section>


        {/* ================= ALERT TIMELINE ================= */}
        <section className="py-12 border-b border-[#E8DCD2]">

          <div className="grid lg:grid-cols-[300px_1fr] gap-12">

            {/* Left */}
            <div>

              <div className="flex items-center gap-3">
                <Bell size={20} className="text-[#C97B63]" />

                <span className="text-sm uppercase tracking-[0.16em] font-semibold text-[#C97B63]">
                  Recent alerts
                </span>
              </div>

              <h2 className="text-3xl font-bold text-[#3F332C] mt-4">
                Stay informed.
              </h2>

              <p className="text-[#806E62] mt-3 leading-relaxed">
                Updates are shown according to your area,
                documents and notification preferences.
              </p>

              <Link
                to="/vendor-alerts"
                className="inline-flex items-center gap-2 mt-6 text-[#C97B63] font-semibold"
              >
                View all alerts
                <ArrowRight size={17} />
              </Link>

            </div>


            {/* Timeline */}
            <div className="border-l border-[#E8DCD2] pl-8">

              {/* Alert 1 */}
              <div className="relative pb-8">

                <div className="absolute -left-[38px] top-1 w-3 h-3 rounded-full bg-[#C97B63]" />

                <div className="flex items-center gap-2 text-sm text-[#9A887B]">
                  <Clock3 size={15} />
                  Today · 9:20 AM
                </div>

                <h3 className="text-xl font-bold text-[#3F332C] mt-2">
                  New public notice available
                </h3>

                <p className="text-[#806E62] mt-2">
                  A new notice has been published for your current area.
                </p>

              </div>


              {/* Alert 2 */}
              <div className="relative pb-8">

                <div className="absolute -left-[38px] top-1 w-3 h-3 rounded-full bg-[#D9C8BB]" />

                <div className="flex items-center gap-2 text-sm text-[#9A887B]">
                  <Clock3 size={15} />
                  Yesterday · 6:00 PM
                </div>

                <h3 className="text-xl font-bold text-[#3F332C] mt-2">
                  Document reminder
                </h3>

                <p className="text-[#806E62] mt-2">
                  Your Certificate of Vending has not been added yet.
                </p>

              </div>


              {/* Alert 3 */}
              <div className="relative">

                <div className="absolute -left-[38px] top-1 w-3 h-3 rounded-full bg-[#D9C8BB]" />

                <div className="flex items-center gap-2 text-sm text-[#9A887B]">
                  <Clock3 size={15} />
                  22 Sept · 10:15 AM
                </div>

                <h3 className="text-xl font-bold text-[#3F332C] mt-2">
                  Registration information updated
                </h3>

                <p className="text-[#806E62] mt-2">
                  New procedural information is available for vendors.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACCESS ================= */}
        <section className="py-12">

          <div className="flex items-center gap-3">
            <Bot size={20} className="text-[#C97B63]" />

            <span className="text-sm uppercase tracking-[0.16em] font-semibold text-[#C97B63]">
              Quick access
            </span>
          </div>

          <div className="grid md:grid-cols-3 mt-7 border-y border-[#E8DCD2]">

            <Link
              to="/vendor-notices"
              className="group py-7 md:pr-8 md:border-r border-[#E8DCD2]"
            >
              <span className="text-sm text-[#A08E82]">
                01
              </span>

              <h3 className="text-xl font-bold text-[#3F332C] mt-2 group-hover:text-[#C97B63] transition">
                Understand a Notice
              </h3>

              <p className="text-sm text-[#806E62] mt-2">
                Upload a notice and get a simple explanation.
              </p>
            </Link>

            <Link
              to="/vendor-ai"
              className="group py-7 md:px-8 md:border-r border-[#E8DCD2]"
            >
              <span className="text-sm text-[#A08E82]">
                02
              </span>

              <h3 className="text-xl font-bold text-[#3F332C] mt-2 group-hover:text-[#C97B63] transition">
                Ask AI Assistant
              </h3>

              <p className="text-sm text-[#806E62] mt-2">
                Get guidance through text or voice.
              </p>
            </Link>

            <Link
              to="/vendor-documents"
              className="group py-7 md:pl-8"
            >
              <span className="text-sm text-[#A08E82]">
                03
              </span>

              <h3 className="text-xl font-bold text-[#3F332C] mt-2 group-hover:text-[#C97B63] transition">
                Update Documents
              </h3>

              <p className="text-sm text-[#806E62] mt-2">
                Add or update your vendor documents.
              </p>
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}
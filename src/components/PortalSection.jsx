import { useNavigate } from "react-router-dom";

export default function PortalSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-24 px-6">

      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-5xl font-bold text-[#2D3748] mb-6">
          Who Are You?
        </h2>

        <p className="text-gray-500 text-lg mb-16">
          Select your role to access the right portal.
        </p>

        {/* Vendor Portal */}
        <div className="border-t border-b border-[#E8DDCC] py-12">

          <div className="text-7xl mb-5">
            👨‍🌾
          </div>

          <h3 className="text-3xl font-bold text-[#2D3748]">
            I'm a Vendor
          </h3>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Manage documents, decode notices, receive alerts,
            update vending locations and access AI assistance.
          </p>

          <button
            onClick={() =>
              navigate("/auth", {
                state: {
                  role: "vendor",
                  mode: "signup",
                },
              })
            }
            className="mt-8 px-8 py-3 bg-[#C97B63] text-white rounded-full font-semibold hover:bg-[#B86A53] transition"
          >
            Enter Vendor Portal
          </button>

        </div>

        {/* Citizen Portal */}
        <div className="border-b border-[#E8DDCC] py-12">

          <div className="text-7xl mb-5">
            🏙️
          </div>

          <h3 className="text-3xl font-bold text-[#2D3748]">
            I'm a Citizen
          </h3>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Report notices, share updates and help support
            local street vendors in your community.
          </p>

          <button
            onClick={() =>
              navigate("/auth", {
                state: {
                  role: "citizen",
                  mode: "signup",
                },
              })
            }
            className="mt-8 px-8 py-3 border-2 border-[#C97B63] text-[#C97B63] rounded-full font-semibold hover:bg-[#FAF3E7] transition"
          >
            Enter Citizen Portal
          </button>

        </div>

      </div>

    </section>
  );
}
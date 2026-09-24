import {
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF3E7] border-t border-[#E8DDCC]">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-[#2D3748]">
              Street
              <span className="text-[#C97B63]">
                Bridge
              </span>
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Empowering street vendors through
              digital access, multilingual support,
              documentation management and community awareness.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-[#2D3748] text-lg">
              Platform
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>Vendor Portal</li>
              <li>Citizen Portal</li>
              <li>AI Notice Decoder</li>
              <li>Document Vault</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-[#2D3748] text-lg">
              Resources
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>Community Alerts</li>
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[#2D3748] text-lg">
              Contact
            </h3>

            <div className="mt-4 space-y-4 text-gray-600">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@streetbridge.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>New Delhi, India</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>www.streetbridge.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-[#E8DDCC] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500 text-sm">
            © 2026 StreetBridge. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm mt-3 md:mt-0">
            Built for Inclusive Digital Access
          </p>

        </div>

      </div>

    </footer>
  );
}
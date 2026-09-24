import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import VendorOnboarding from "./pages/VendorOnboarding";
import VendorDashboard from "./pages/VendorDashboard";
import VendorNotices from "./pages/VendorNotices";
import VendorDocuments from "./pages/VendorDocuments";
import VendorAI from "./pages/VendorAI";
import VendorLocation from "./pages/VendorLocation";
import VendorAlerts from "./pages/VendorAlerts";
import VendorProfile from "./pages/VendorProfile";
import CitizenDashboard from "./pages/CitizenDashboard";
import CitizenVendors from "./pages/CitizenVendors";
import CitizenMap from "./pages/CitizenMap";
import CitizenUpdates from "./pages/CitizenUpdates";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/vendor-onboarding"
          element={<VendorOnboarding />}
        />

        <Route
          path="/vendor-dashboard"
          element={<VendorDashboard />}
        />

        <Route
          path="/vendor-notices"
          element={<VendorNotices />}
        />
        <Route
  path="/vendor-documents"
  element={<VendorDocuments />}
/>
<Route
  path="/vendor-ai"
  element={<VendorAI />}
/>
<Route
  path="/vendor-location"
  element={<VendorLocation />}
/>
<Route
  path="/vendor-alerts"
  element={<VendorAlerts />}
/>
  <Route
          path="/vendor-profile"
          element={<VendorProfile />}
        />
        <Route
  path="/citizen-dashboard"
  element={<CitizenDashboard />}
/>
<Route
  path="/citizen-vendors"
  element={<CitizenVendors />}
/>
<Route
  path="/citizen-map"
  element={<CitizenMap />}
/>
<Route
  path="/citizen-updates"
  element={<CitizenUpdates />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
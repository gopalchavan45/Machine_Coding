import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Applayout from "./layout/Applayout";
import Pagination from "./pages/Pagination";
import EnterpriseForm from "./pages/EnterpriseForm";

// Placeholder components for other dashboard pages
const DashboardHome = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
    <p className="text-gray-600">Welcome back! Here is a quick snapshot of your application analytics.</p>
  </div>
);

const TransactionsPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Transactions</h1>
    <p className="text-gray-600">Manage and view all recent financial activities here.</p>
  </div>
);

const SettingsPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
    <p className="text-gray-600">Update your profile, security, and workspace preferences.</p>
  </div>
);

const SupportPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Support & Help</h1>
    <p className="text-gray-600">Need help? Reach out to documentation or support staff.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout wrapper containing the Header and Sidebar */}
        <Route path="/" element={<Applayout />}>
          {/* Nested dynamic views rendered inside the <Outlet /> */}
          <Route index element={<DashboardHome />} />
          
          <Route path="pagination" element={<Pagination />} />
          <Route path="enterpriseForm" element={<EnterpriseForm />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="support" element={<SupportPage />} />
          
          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">404</h2>
                <p className="text-gray-500">Oops! The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
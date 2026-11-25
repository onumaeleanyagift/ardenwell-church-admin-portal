import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";

import type { SidebarPage } from "./components/layout/Sidebar";

function App() {
  const [activePage, setActivePage] = useState<SidebarPage>("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;

      case "new-report":
        return (
          <div>
            <h1 className="text-2xl font-bold text-brand-950">
              New Service / Activity Report
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Submit a weekly service or activity report for your branch.
            </p>
          </div>
        );

      case "reports":
        return (
          <div>
            <h1 className="text-2xl font-bold text-brand-950">
              Branch Reports
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View and manage submitted branch reports.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;

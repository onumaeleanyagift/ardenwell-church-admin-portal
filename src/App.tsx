import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ReportFormPage from "./pages/ReportFormPage";

import type { SidebarPage } from "./components/layout/Sidebar";

import { useEffect } from "react";
import { checkApiHealth } from "./services/api";

function App() {
  const [activePage, setActivePage] = useState<SidebarPage>("dashboard");

  useEffect(() => {
    checkApiHealth()
      .then((data) => {
        console.log("Backend connection successful:", data);
      })
      .catch((error: unknown) => {
        console.error("Backend connection failed:", error);
      });
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;

      case "new-report":
        return <ReportFormPage />;

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

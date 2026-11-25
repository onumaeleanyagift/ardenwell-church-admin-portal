import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import type { SidebarPage } from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  activePage: SidebarPage;
  onNavigate: (page: SidebarPage) => void;
}

function AppLayout({ children, activePage, onNavigate }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (page: SidebarPage) => {
    onNavigate(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/50 md:hidden"
        />
      )}

      {/* Fixed Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      </div>

      {/* Fixed Desktop Topbar */}
      <div className="fixed left-64 right-0 top-0 z-20 hidden md:block">
        <Topbar />
      </div>

      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 font-bold text-white">
            A
          </div>

          <span className="font-bold text-brand-900">Ardenwell</span>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {isSidebarOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="min-h-screen min-w-0 flex-1 md:ml-64">
        {/* Space for fixed headers */}
        <div className="h-16 md:hidden" />
        <div className="hidden h-20 md:block" />

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

export default AppLayout;

import type { ReactNode } from "react";

export type SidebarPage = "dashboard" | "new-report" | "reports";

interface SidebarProps {
  activePage: SidebarPage;
  onNavigate: (page: SidebarPage) => void;
}

interface NavigationItem {
  id: SidebarPage;
  label: string;
  icon: ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "new-report",
    label: "New Report",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    id: "reports",
    label: "Branch Reports",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M8 11h8M8 15h8M8 19h5" />
      </svg>
    ),
  },
];

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col bg-brand-900 text-white">
      {/* Church Branding */}
      <div className="border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-xl font-bold">
            A
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">Ardenwell</h1>

            <p className="text-xs text-brand-100">Church Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-7">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-brand-100/70">
          Main Menu
        </p>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-700 text-white shadow-sm"
                    : "text-brand-100 hover:bg-brand-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-white/10 px-6 py-5">
        <p className="text-xs text-brand-100">Multi-Branch Management Portal</p>
      </div>
    </aside>
  );
}

export default Sidebar;

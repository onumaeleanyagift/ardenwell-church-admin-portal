interface TopbarProps {
  userName?: string;
  userRole?: string;
  avatarInitials?: string;
}

function Topbar({
  userName = "Headquarters",
  userRole = "Super Admin",
  avatarInitials = "HQ",
}: TopbarProps) {
  return (
    <header className="flex h-23 items-center justify-end border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-5">
        {/* Notification */}
        <div className="relative">
          <svg
            className="h-6 w-6 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
            {avatarInitials}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">{userName}</p>

            <p className="text-xs text-slate-500">{userRole}</p>
          </div>

          {/* Dropdown Indicator */}
          <svg
            className="h-4 w-4 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Topbar;

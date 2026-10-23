import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cycleTheme, resolveThemes } from "../lib/theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ name = "Your Name", themes }) {
  const [open, setOpen] = useState(false);
  const canSwitchTheme = resolveThemes(themes).length > 1;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <NavLink to="/" className="font-display text-xl font-semibold text-web">
          {name}
          <span className="text-accent">.</span>
        </NavLink>

        <div className="flex items-center gap-6">
          <nav className="hidden gap-7 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-web"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {canSwitchTheme && (
            <button
              type="button"
              onClick={() => cycleTheme(themes)}
              aria-label="Switch theme"
              title="Switch theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18" />
                <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
              </svg>
            </button>
          )}

          <button
            className="text-web md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col px-5 py-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-line/60 py-3 text-sm font-medium last:border-0 ${
                      isActive ? "text-accent" : "text-muted"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../../lib/i18n";
import { getDiagnosisHistory } from "../../lib/storage";
import { LocaleToggle } from "./LocaleToggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const hasEnoughHistory = getDiagnosisHistory().length >= 2;

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/questionnaire", label: t("nav.questionnaire") },
    { to: "/guide", label: t("nav.guide") },
    { to: "/history", label: t("nav.history") },
    { to: "/stats", label: t("nav.stats") },
    ...(hasEnoughHistory
      ? [{ to: "/compare", label: t("nav.compare") }]
      : []),
  ];

  return (
    <header className="bg-cafe-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-serif font-bold tracking-wide"
        >
          <span aria-hidden="true">☕</span>
          CafeNavi
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-cafe-300 ${
                location.pathname === link.to
                  ? "text-cafe-300"
                  : "text-cafe-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LocaleToggle />
        </nav>

        {/* Mobile: locale toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <LocaleToggle />
          <button
            className="p-2 rounded-lg hover:bg-cafe-700 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-cafe-800 border-t border-cafe-700 px-4 pb-4"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block py-3 text-sm font-medium transition-colors hover:text-cafe-300 ${
                location.pathname === link.to
                  ? "text-cafe-300"
                  : "text-cafe-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

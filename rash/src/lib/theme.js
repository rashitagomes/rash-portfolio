const STORAGE_KEY = "portfolio-theme-index";

// Two built-in themes so the theme toggle works out of the box. Anything
// you add in the admin panel (Site Settings -> Themes) replaces this list.
// The FIRST theme in the list is the default for new visitors.
export const BUILTIN_THEMES = [
  {
    name: "Paper",
    bg: "#f7f6f2",
    card: "#ffffff",
    line: "#e3e0d6",
    accent: "#1d4ed8",
    accentHover: "#1e40af",
    onAccent: "#ffffff",
    text: "#18181b",
    muted: "#6b6b76",
  },
  {
    name: "Slate",
    bg: "#0f1115",
    card: "#171a21",
    line: "#262b35",
    accent: "#6ea8fe",
    accentHover: "#8fbcff",
    onAccent: "#0b1220",
    text: "#e8eaf0",
    muted: "#8b92a1",
  },
];

export function resolveThemes(themes) {
  return themes && themes.length ? themes : BUILTIN_THEMES;
}

// Sets the CSS variables every utility class reads from (see @theme in
// src/index.css). Tailwind v4 utilities reference var(--color-x) at
// runtime, so this re-themes the whole site instantly with no rebuild.
export function applyTheme(theme) {
  const t = { ...BUILTIN_THEMES[0], ...theme };
  const root = document.documentElement.style;
  root.setProperty("--color-ink", t.bg);
  root.setProperty("--color-ink-soft", `color-mix(in srgb, ${t.bg} 94%, ${t.text} 6%)`);
  root.setProperty("--color-card", t.card);
  root.setProperty("--color-line", t.line);
  root.setProperty("--color-accent", t.accent);
  root.setProperty("--color-accent-hover", t.accentHover || t.accent);
  root.setProperty("--color-on-accent", t.onAccent || "#ffffff");
  root.setProperty("--color-web", t.text);
  root.setProperty("--color-muted", t.muted);
}

export function getStoredThemeIndex() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const n = raw == null ? 0 : parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

export function applyStoredTheme(themes) {
  const list = resolveThemes(themes);
  const index = getStoredThemeIndex() % list.length;
  applyTheme(list[index]);
  return { index, theme: list[index] };
}

// Moves to the next theme (wrapping to the first after the last).
export function cycleTheme(themes) {
  const list = resolveThemes(themes);
  const next = (getStoredThemeIndex() + 1) % list.length;
  window.localStorage.setItem(STORAGE_KEY, String(next));
  applyTheme(list[next]);
  return { index: next, theme: list[next] };
}

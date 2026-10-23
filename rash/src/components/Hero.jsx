import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function initials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "•"
  );
}

export default function Hero({ settings }) {
  const [typed, setTyped] = useState("");
  const name = settings?.name || "Your Name";
  const strings = settings?.heroTagline?.length ? settings.heroTagline : ["Your Role"];

  useEffect(() => {
    let stringIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    function tick() {
      const current = strings[stringIndex];
      if (!deleting) {
        charIndex++;
        setTyped(current.slice(0, charIndex));
        if (charIndex === current.length) {
          if (strings.length === 1) return; // nothing to rotate to
          deleting = true;
          timeout = setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        setTyped(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          stringIndex = (stringIndex + 1) % strings.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 65);
    }

    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(strings)]);

  return (
    <section className="relative">
      {/* cover banner — your image if set, otherwise a soft accent gradient */}
      <div className="relative h-48 w-full overflow-hidden sm:h-60 md:h-72">
        {settings?.coverImage ? (
          <img src={settings.coverImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 22%, var(--color-ink)), color-mix(in srgb, var(--color-accent) 6%, var(--color-ink)))",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
      </div>

      <div className="mx-auto -mt-16 flex max-w-6xl justify-center px-5 sm:-mt-20 sm:justify-start md:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-ink bg-card shadow-sm sm:h-40 sm:w-40 md:h-44 md:w-44"
        >
          {settings?.profileImage ? (
            <img src={settings.profileImage} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-4xl text-accent sm:text-5xl">{initials(name)}</span>
          )}
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-8 text-center sm:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl"
        >
          Hi, I'm <span className="text-accent">{name}</span>
        </motion.h1>

        <div className="mt-3 h-8 font-mono text-lg text-accent sm:text-xl">
          {typed}
          <span className="animate-pulse">|</span>
        </div>

        {settings?.heroSub && (
          <p className="mx-auto mt-2 max-w-xl text-muted sm:mx-0">{settings.heroSub}</p>
        )}

        <div className="mt-8 flex justify-center gap-3 sm:justify-start">
          <Link
            to="/work"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
          >
            See my work
          </Link>
          <Link
            to="/contact"
            className="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-web transition hover:border-accent hover:text-accent"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}

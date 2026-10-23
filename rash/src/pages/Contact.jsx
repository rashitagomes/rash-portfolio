import { useState } from "react";
import { motion } from "framer-motion";

function waLink(phone) {
  if (!phone) return "#";
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}

const field =
  "box-border w-full rounded-lg border border-line bg-ink-soft px-4 py-3 text-sm outline-none focus:border-accent";

export default function Contact({ settings }) {
  const [status, setStatus] = useState("");
  const formUrl = settings?.formspreeUrl;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formUrl) {
      setStatus("The contact form isn't set up yet — please reach out by email instead.");
      return;
    }
    setStatus("Sending...");
    const form = e.target;
    try {
      const res = await fetch(formUrl, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("Message sent — thank you!");
        form.reset();
      } else {
        setStatus("Something went wrong. Please try emailing directly.");
      }
    } catch {
      setStatus("Network error. Please try emailing directly.");
    }
    setTimeout(() => setStatus(""), 6000);
  }

  const displayName = settings?.contactName || settings?.name;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="font-display text-4xl sm:text-5xl">{settings?.contactHeroTitle || "Get in touch"}</h1>
          <p className="mt-3 text-muted">{settings?.contactHeroSub}</p>

          <div className="mt-8 rounded-2xl border border-line bg-card p-6">
            <h3 className="font-display text-xl">Contact details</h3>
            {displayName && <p className="mt-4 font-semibold">{displayName}</p>}
            {settings?.phone && (
              <p className="mt-1 text-sm text-muted">
                Phone:{" "}
                <a href={`tel:${settings.phone}`} className="text-web hover:text-accent">
                  {settings.phone}
                </a>
              </p>
            )}
            {settings?.email && (
              <p className="mt-1 text-sm text-muted">
                Email:{" "}
                <a href={`mailto:${settings.email}`} className="text-web hover:text-accent">
                  {settings.email}
                </a>
              </p>
            )}
            {settings?.address && (
              <p className="mt-3 text-sm text-muted">
                Address: <span className="text-web">{settings.address}</span>
              </p>
            )}
            {(settings?.whatsapp || settings?.phone) && (
              <a
                href={waLink(settings.whatsapp || settings.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                Message on WhatsApp ↗
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="rounded-2xl border border-line bg-card p-6"
        >
          <h3 className="font-display text-xl">Send a message</h3>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <input name="name" placeholder="Your name" className={field} />
            <input name="email" type="email" required placeholder="Your email" className={field} />
            <input name="phone" placeholder="Phone (optional)" className={field} />
            <textarea name="message" rows={5} required placeholder="Your message" className={field} />
            <button
              type="submit"
              className="mt-1 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-on-accent transition hover:bg-accent-hover"
            >
              Send
            </button>
            {status && <div className="text-sm text-muted">{status}</div>}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

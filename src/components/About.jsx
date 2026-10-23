import { motion } from "framer-motion";

export default function About({ settings }) {
  const years = Number(settings?.yearsExperience) || 0;
  const skills = settings?.skills || [];
  const showYears = years > 0;
  const showSkills = skills.length > 0;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl">{settings?.aboutTitle || "About Me"}</h2>
        {settings?.aboutSub && (
          <p className="mx-auto mt-3 max-w-xl text-muted">{settings.aboutSub}</p>
        )}
      </div>

      {(showYears || showSkills) && (
        <div className={`mt-12 grid gap-6 ${showYears && showSkills ? "md:grid-cols-2" : ""}`}>
          {showYears && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              className="card-hover flex flex-col justify-center rounded-2xl border border-line bg-card p-8"
            >
              <div className="font-display text-6xl text-accent">{String(years).padStart(2, "0")}</div>
              <div className="mt-1 text-lg">{settings?.yearsLabel || "Years of Experience"}</div>
              {settings?.satisfactionBadge && (
                <div className="mt-5 w-fit rounded-lg bg-accent/10 px-4 py-2 font-mono text-sm text-accent">
                  {settings.satisfactionBadge}
                </div>
              )}
            </motion.div>
          )}

          {showSkills && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2">
              {skills.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="card-hover flex min-h-[130px] flex-col items-center justify-center rounded-2xl border border-line bg-card p-6 text-center"
                >
                  <div className="font-display text-3xl text-accent">{s.value}%</div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

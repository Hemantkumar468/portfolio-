import Reveal from "./Reveal.tsx";

interface SectionTitleProps {
  number?: string;
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  number,
  tag,
  title,
  highlight,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-10 md:mb-14 flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {number && tag && (
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/80 bg-violet-100/70 px-3.5 py-1 text-xs font-mono tracking-widest text-violet-800 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-600 animate-pulse" />
            <span>
              {number} // {tag.toUpperCase()}
            </span>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.2} yOffset={20}>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-violet-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={0.3} yOffset={15}>
          <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

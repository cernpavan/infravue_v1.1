import type { ReactNode } from "react";

/**
 * Shared presentational primitives for legal pages (privacy, terms, etc.).
 * Pure server components — no client JS needed.
 */

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase">
      {children}
    </p>
  );
}

export function Section({
  num,
  id,
  title,
  children,
  last,
}: {
  num: string;
  id: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28 pt-16 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="text-[12px] font-semibold tracking-[0.28em] uppercase text-terracotta">
          {num}
        </span>
        <span aria-hidden className="h-px flex-1 bg-navy/10" />
      </div>

      <h2 className="mt-5 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        {title}
      </h2>

      <div className="mt-8 space-y-5 text-base font-light leading-[1.85] text-navy/75 lg:text-[17px]">
        {children}
      </div>

      {!last ? (
        <div
          aria-hidden
          className="mt-16 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-navy/15 to-transparent"
        />
      ) : null}
    </section>
  );
}

export function Subhead({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-8 text-[15px] font-semibold tracking-tight text-navy">
      {children}
    </h3>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-terracotta/60 bg-terracotta/[0.04] px-4 py-3 text-[15px] font-medium italic text-navy">
      {children}
    </p>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 pl-5 [&>li]:relative [&>li]:before:absolute [&>li]:before:-left-5 [&>li]:before:top-[0.65em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-terracotta/70">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

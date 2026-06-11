const PageHero = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(135deg,hsl(var(--background))_0%,hsl(216_18%_10%)_55%,hsl(var(--background))_100%)] px-4 pb-14 pt-28 md:px-8 md:pb-20 md:pt-36">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="relative mx-auto max-w-7xl">
      <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </span>
      <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.98] md:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        {description}
      </p>
    </div>
  </section>
);

export default PageHero;

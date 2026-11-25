export function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="section-head">
      <p className="kicker reveal">{kicker}</p>
      <h2 className="section-title split-up">{title}</h2>
    </header>
  );
}

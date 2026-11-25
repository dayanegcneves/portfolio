import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { profile, stackGroups, projects, orbitIcons, t } from './content.ts';
import { Icon, LinkedIn, GitHub } from './Icons.tsx';
import { Magnetic } from './components/Magnetic';
import { SectionHead } from './components/SectionHead';
import { StackIcon } from './components/StackIcon';
import { useAnimations } from './hooks/useAnimations';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { pick, store } from './lib';
import type { Lang, Theme } from './types';
import photo from './assets/dayane.webp';

const initialTheme = (): Theme => {
  const saved = store.get('dn-theme') ?? document.documentElement.dataset.theme;
  return saved === 'light' ? 'light' : 'dark';
};

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<Lang>(() => (store.get('dn-lang') === 'en' ? 'en' : 'pt'));
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const c = t[lang];

  useSmoothScroll();
  useAnimations(root, lang);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    store.set('dn-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    store.set('dn-lang', lang);
  }, [lang]);

  const navItems: Array<[string, string]> = [
    ['about', c.nav.about],
    ['stack', c.nav.stack],
    ['experience', c.nav.exp],
    ['services', c.nav.services],
    ['projects', c.nav.projects],
    ['contact', c.nav.contact],
  ];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard bloqueado: o e-mail continua visível na tela */
    }
  };

  const codeLines = [
    'const dayane = {',
    '  role: "Full Stack & UI Designer",',
    '  backend: ["Node", "NestJS", "SQL Server"],',
    '  frontend: ["Vue 3", "React"],',
    '  design: "Figma",',
    `  ${lang === 'pt' ? 'disponivel' : 'available'}: true,`,
    '};',
  ];

  const marqueeItems = stackGroups.flatMap((g) => g.items);

  return (
    <div ref={root} className="app">
      <div className="progress" aria-hidden />
      <div className="cursor-glow" aria-hidden />
      <div className="cursor-dot" aria-hidden />

      {/* ---------------- NAV ---------------- */}
      <nav className="nav">
        <a href="#top" className="logo" aria-label="Dayane Neves">
          <span className="logo-mark">dn</span>
          <span className="logo-dot" />
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
              </li>
            ))}
        </ul>
        <div className="nav-actions">
          <button
            className="pill-btn"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={c.ui.lang}
            title={c.ui.lang}
          >
            <span className={lang === 'pt' ? 'on' : ''}>PT</span>
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
          </button>
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={c.ui.theme}
            title={c.ui.theme}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
          </button>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={c.ui.menu} aria-expanded={menuOpen}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </nav>

      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="hero band">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-status hero-anim">
                <span className="pulse" />
                {c.hero.status}
              </p>
              <h1 className="hero-name">{profile.name}</h1>
              <p className="hero-role hero-anim">
                <span className="grad-text">{c.hero.role}</span>
              </p>
              <p className="hero-lead hero-anim">{c.hero.lead}</p>
              <div className="hero-actions">
                <Magnetic href="#contact" className="btn btn-primary">
                  {c.hero.ctaContact} <Icon name="arrow" size={18} />
                </Magnetic>
                <Magnetic href={profile.cvUrl[lang]} className="btn btn-ghost" download>
                  <Icon name="download" size={18} /> {c.hero.ctaCv}
                </Magnetic>
              </div>
              <p className="hero-loc hero-anim">
                <Icon name="pin" size={16} /> {c.hero.location}
              </p>
            </div>

            <div className="hero-visual">
              <div className="blob" aria-hidden />
              <div className="orbit" aria-hidden>
                <div className="orbit-ring">
                  {orbitIcons.map((src, i) => (
                    <span key={src} className="orbit-icon" style={{ '--i': i } as CSSProperties}>
                      <img src={src} alt="" width={26} height={26} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="photo-frame">
                <img src={photo} alt={profile.name} width={640} height={800} decoding="async" />
                <span className="photo-curtain" aria-hidden />
              </div>
              <div className="code-card" aria-hidden>
                <div className="code-bar">
                  <i /><i /><i />
                  <span>dayane.ts</span>
                </div>
                <pre>
                  {codeLines.map((l, i) => (
                    <code key={i} className="code-line" data-text={l}>{l}</code>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- MARQUEE ---------------- */}
        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="marquee-item">
                <StackIcon item={item} size={26} />
                {pick(item.name, lang)}
                <span className="marquee-sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- SOBRE ---------------- */}
        <section id="about" className="band about">
          <div className="wrap">
            <p className="kicker reveal">{c.about.kicker}</p>
            <p className="statement">{c.about.statement}</p>
            <div className="about-grid">
              <div className="about-body">
                {c.about.body.map((p, i) => (
                  <p key={i} className="reveal">{p}</p>
                ))}
              </div>
              <div className="stats">
                {c.about.stats.map((s) => (
                  <div key={s.label} className="stat reveal">
                    <span className="stat-value">
                      <span className="stat-num" data-value={s.value}>{s.value}</span>
                      {s.suffix}
                    </span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="diffs">
              {c.about.diffs.map((d, i) => (
                <article key={d.title} className="diff tilt reveal">
                  <span className="diff-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- STACKS ---------------- */}
        <section id="stack" className="band stack">
          <div className="wrap">
            <SectionHead kicker={c.stack.kicker} title={c.stack.title} />
            <div className="legend reveal">
              <span><i className="badge badge-daily">{c.stack.daily}</i> {c.stack.legendDaily}</span>
              <span><i className="badge badge-learning">{c.stack.learning}</i> {c.stack.legendLearning}</span>
              <span><i className="badge badge-used">{c.stack.used}</i> {c.stack.legendUsed}</span>
            </div>
            <div className="stack-groups">
              {stackGroups.map((g) => (
                <div key={g.id} className={`stack-group group-${g.id}`}>
                  <h3 className="stack-group-title">{pick(g.title, lang)}</h3>
                  <div className="stack-tiles">
                    {g.items.map((item) => (
                      <div key={pick(item.name, 'pt')} className={`stack-tile ${item.level}`}>
                        <span className="stack-icon"><StackIcon item={item} /></span>
                        <span className="stack-name">{pick(item.name, lang)}</span>
                        <i className={`badge badge-${item.level}`}>{c.stack[item.level]}</i>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- EXPERIÊNCIA ---------------- */}
        <section id="experience" className="band experience">
          <div className="wrap">
            <SectionHead kicker={c.exp.kicker} title={c.exp.title} />
            <div className="timeline">
              <div className="timeline-rail"><div className="timeline-fill" /></div>
              {c.exp.jobs.map((job) => (
                <article key={job.company} className="job">
                  <span className="job-dot" />
                  <div className="job-card tilt reveal">
                    <div className="job-top">
                      <div>
                        <h3>{job.company}</h3>
                        <p className="job-role">{job.role}</p>
                      </div>
                      <span className="job-period">{job.period}</span>
                    </div>
                    <div className="phases">
                      {job.phases.map((p, i) => (
                        <span key={p} className="phase">
                          {p}
                          {i < job.phases.length - 1 && <Icon name="arrow" size={14} />}
                        </span>
                      ))}
                    </div>
                    <p className="job-summary">{job.summary}</p>
                    <ul>
                      {job.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SERVIÇOS ---------------- */}
        <section id="services" className="band services">
          <div className="wrap">
            <SectionHead kicker={c.services.kicker} title={c.services.title} />
            <div className="service-grid">
              {c.services.items.map((s) => (
                <article key={s.title} className="service tilt reveal">
                  <span className="service-icon"><Icon name={s.icon} size={26} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
            <h3 className="process-title reveal">{c.services.processTitle}</h3>
            <ol className="process">
              <span className="process-line" aria-hidden />
              {c.services.process.map((p, i) => (
                <li key={p.title} className="process-step reveal">
                  <span className="process-num">{i + 1}</span>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- PROJETOS ---------------- */}
        <section id="projects" className="band projects">
          <div className="wrap">
            <SectionHead kicker={c.projects.kicker} title={c.projects.title} />
            {projects.length === 0 ? (
              <div className="empty reveal">
                <div className="empty-art" aria-hidden>
                  <span /><span /><span />
                </div>
                <div>
                  <h3>{c.projects.emptyTitle}</h3>
                  <p>{c.projects.emptyText}</p>
                  <Magnetic href={profile.github} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <GitHub size={18} /> {c.projects.emptyCta}
                  </Magnetic>
                </div>
              </div>
            ) : (
              <div className="project-grid">
                {projects.map((p) => (
                  <article key={p.title} className="project tilt reveal">
                    {p.image && <img src={p.image} alt="" className="project-img" />}
                    <p className="project-type">{pick(p.type, lang)}</p>
                    <h3>{p.title}</h3>
                    <p>{pick(p.description, lang)}</p>
                    <div className="tags">{p.tags.map((tg) => <span key={tg}>{tg}</span>)}</div>
                    <div className="project-links">
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer"><Icon name="external" size={16} /> {c.projects.live}</a>}
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer"><GitHub size={16} /> {c.projects.repo}</a>}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- FORMAÇÃO ---------------- */}
        <section id="education" className="band education">
          <div className="wrap">
            <SectionHead kicker={c.edu.kicker} title={c.edu.title} />
            <div className="edu-grid">
              {c.edu.items.map((e) => (
                <article key={e.title} className="edu tilt reveal">
                  <span className="edu-icon"><Icon name="grad" size={24} /></span>
                  <span className="edu-period">{e.period}</span>
                  <h3>{e.title}</h3>
                  <p>{e.place}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CONTATO ---------------- */}
        <section id="contact" className="band contact">
          <div className="wrap contact-inner">
            <p className="kicker reveal">{c.contact.kicker}</p>
            <h2 className="contact-title">{c.contact.title}</h2>
            <p className="contact-text reveal">{c.contact.text}</p>
            <div className="email-box reveal">
              <a href={`mailto:${profile.email}`} className="email">
                <Icon name="mail" size={22} /> {profile.email}
              </a>
              <button className="btn btn-primary" onClick={copyEmail}>
                <Icon name="copy" size={18} /> {copied ? c.contact.copied : c.contact.copy}
              </button>
            </div>
            <div className="socials reveal">
              <Magnetic href={profile.linkedin} target="_blank" rel="noreferrer" className="social">
                <LinkedIn /> LinkedIn
              </Magnetic>
              <Magnetic href={profile.github} target="_blank" rel="noreferrer" className="social">
                <GitHub /> GitHub
              </Magnetic>
              <Magnetic href={profile.cvUrl[lang]} download className="social">
                <Icon name="download" size={20} /> {c.contact.cv}
              </Magnetic>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <nav className="footer-links" aria-label="Links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn size={18} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitHub size={18} /></a>
          <a href={`mailto:${profile.email}`} aria-label="E-mail"><Icon name="mail" size={18} /></a>
        </nav>
      </footer>

      <a href="#top" className="to-top" aria-label={c.ui.top} title={c.ui.top}>
        <Icon name="up" size={20} />
      </a>
    </div>
  );
}

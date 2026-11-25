import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import type { Lang } from '../types';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  gsap.utils.toArray<T>(root.querySelectorAll(sel));

/**
 * Todas as animações da página. São recriadas quando o idioma muda,
 * porque os textos (e as divisões do SplitText) mudam junto.
 */
export function useAnimations(root: RefObject<HTMLElement>, lang: Lang) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', fine: '(pointer: fine)' },
        (ctx) => {
          const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
          if (!motion) return;
          const cleanups: Array<() => void> = [];

          /* ---------- Barra de progresso e nav ---------- */
          gsap.to('.progress', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
          });

          const nav = $('.nav');
          const toTop = $('.to-top');
          ScrollTrigger.create({
            start: 120,
            end: 'max',
            onUpdate: (self) => nav?.classList.toggle('nav-hidden', self.direction === 1),
            onToggle: (self) => toTop?.classList.toggle('show', self.isActive),
            onLeaveBack: () => nav?.classList.remove('nav-hidden'),
          });

          /* Link ativo no menu conforme a seção visível */
          $$<HTMLElement>('main section[id]').forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: 'top 50%',
              end: 'bottom 50%',
              onToggle: (self) => {
                const link = $(`.nav-links a[href="#${section.id}"]`);
                link?.classList.toggle('active', self.isActive);
              },
            });
          });

          /* ---------- Hero ---------- */
          const nameSplit = SplitText.create('.hero-name', { type: 'chars, words', mask: 'chars' });

          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
          intro
            .from('.hero-status', { y: 20, autoAlpha: 0, duration: 0.8 })
            .from(nameSplit.chars, { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.035 }, '-=0.5')
            .from('.hero-role', { y: 24, autoAlpha: 0, duration: 0.9 }, '-=0.8')
            .from('.hero-lead', { y: 24, autoAlpha: 0, duration: 0.9 }, '-=0.75')
            .from('.hero-actions > *', { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, '-=0.7')
            .from('.hero-loc', { autoAlpha: 0, duration: 0.8 }, '-=0.6')
            // A moldura já nasce no formato final; só aparece e a "cortina" rosa sobe.
            .from('.blob', { scale: 0.6, autoAlpha: 0, duration: 1.4 }, 0.1)
            .from('.photo-frame', { y: 50, duration: 1.2 }, 0.1)
            .fromTo('.photo-curtain', { yPercent: 0 }, { yPercent: -101, duration: 1.3, ease: 'expo.inOut' }, 0.3)
            .from('.photo-frame img', { scale: 1.3, duration: 1.8 }, 0.45)
            .from('.orbit', { scale: 0.85, autoAlpha: 0, duration: 1.2 }, 0.8)
            .from('.orbit-icon', { scale: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(2)' }, 1)
            .from('.code-card', { y: 40, autoAlpha: 0, duration: 1 }, 1.1);

          /* Card de código se digitando */
          const lines = $$<HTMLElement>('.code-line');
          lines.forEach((line) => (line.textContent = ''));
          const type = gsap.timeline({ delay: 1.8 });
          lines.forEach((line, i) => {
            const full = line.dataset.text ?? '';
            const state = { n: 0 };
            type.to(state, {
              n: full.length,
              duration: full.length * 0.028,
              ease: 'none',
              onStart: () => {
                lines.forEach((l) => l.classList.remove('typing'));
                line.classList.add('typing');
              },
              onUpdate: () => {
                line.textContent = full.slice(0, Math.round(state.n));
              },
              onComplete: () => {
                if (i < lines.length - 1) line.classList.remove('typing');
              },
            });
          });
          cleanups.push(() =>
            lines.forEach((l) => {
              l.textContent = l.dataset.text ?? '';
              l.classList.remove('typing');
            })
          );

          /* Órbita, blob e parallax */
          gsap.to('.orbit-ring', { rotation: 360, duration: 40, repeat: -1, ease: 'none' });
          gsap.to('.orbit-icon', { rotation: -360, duration: 40, repeat: -1, ease: 'none' });
          gsap.to('.blob', {
            borderRadius: '58% 42% 38% 62% / 45% 58% 42% 55%',
            rotation: 25,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to('.hero-visual', {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
          });

          /* ---------- Marquee (acelera com a rolagem) ---------- */
          const marquee = gsap.to('.marquee-track', { xPercent: -50, duration: 36, repeat: -1, ease: 'none' });
          ScrollTrigger.create({
            onUpdate: (self) => {
              const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4);
              gsap.to(marquee, { timeScale: boost, duration: 0.2, overwrite: true });
              gsap.to(marquee, { timeScale: 1, duration: 1, delay: 0.2 });
            },
          });

          /* ---------- Títulos de seção ---------- */
          $$<HTMLElement>('.split-up').forEach((el) => {
            const s = SplitText.create(el, { type: 'lines, words', mask: 'lines' });
            gsap.from(s.lines, {
              yPercent: 105,
              duration: 1,
              stagger: 0.1,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            });
          });

          /* ---------- Reveals genéricos ---------- */
          gsap.set('.reveal', { y: 40, autoAlpha: 0 });
          ScrollTrigger.batch('.reveal', {
            start: 'top 88%',
            onEnter: (batch) =>
              gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09, ease: 'power3.out', overwrite: true }),
          });

          /* ---------- Frase do "Sobre" acendendo ---------- */
          const st = SplitText.create('.statement', { type: 'words' });
          gsap.fromTo(
            st.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
            }
          );

          /* ---------- Contadores ---------- */
          $$<HTMLElement>('.stat-num').forEach((el) => {
            const end = Number(el.dataset.value);
            const state = { v: 0 };
            el.textContent = '0';
            gsap.to(state, {
              v: end,
              duration: 1.6,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 90%' },
              onUpdate: () => {
                el.textContent = String(Math.round(state.v));
              },
            });
            cleanups.push(() => (el.textContent = String(end)));
          });

          /* ---------- Stacks ---------- */
          $$<HTMLElement>('.stack-group').forEach((group) => {
            gsap.from(group.querySelectorAll('.stack-tile'), {
              y: 30,
              scale: 0.85,
              autoAlpha: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: 'back.out(1.6)',
              scrollTrigger: { trigger: group, start: 'top 85%' },
            });
          });

          /* ---------- Linha do tempo ---------- */
          gsap.from('.timeline-fill', {
            scaleY: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true },
          });
          $$<HTMLElement>('.job').forEach((job) => {
            gsap.from(job.querySelector('.job-dot'), {
              scale: 0,
              duration: 0.6,
              ease: 'back.out(3)',
              scrollTrigger: { trigger: job, start: 'top 70%' },
            });
          });

          /* ---------- Processo ---------- */
          gsap.from('.process-line', {
            scaleX: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.process', start: 'top 80%', end: 'bottom 60%', scrub: true },
          });

          /* ---------- Contato ---------- */
          const ct = SplitText.create('.contact-title', { type: 'chars, words' });
          gsap.from(ct.chars, {
            yPercent: 80,
            autoAlpha: 0,
            rotate: -6,
            duration: 0.8,
            stagger: 0.02,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: '.contact', start: 'top 70%' },
          });

          /* ---------- Cursor e cards 3D (só mouse) ---------- */
          if (fine) {
            const glow = $('.cursor-glow');
            const dot = $('.cursor-dot');
            if (glow && dot) {
              gsap.set([glow, dot], { xPercent: -50, yPercent: -50, autoAlpha: 1 });
              const gx = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3' });
              const gy = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3' });
              const dx = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
              const dy = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
              const move = (e: MouseEvent) => {
                gx(e.clientX);
                gy(e.clientY);
                dx(e.clientX);
                dy(e.clientY);
              };
              const over = (e: MouseEvent) => {
                const target = e.target as Element | null;
                dot.classList.toggle('cursor-big', !!target?.closest('a, button, .stack-tile'));
              };
              window.addEventListener('mousemove', move);
              window.addEventListener('mouseover', over);
              cleanups.push(() => {
                window.removeEventListener('mousemove', move);
                window.removeEventListener('mouseover', over);
              });
            }

            $$<HTMLElement>('.tilt').forEach((card) => {
              const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
              const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
              const m = (e: MouseEvent) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                rx(-py * 10);
                ry(px * 12);
                card.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
                card.style.setProperty('--my', `${(py + 0.5) * 100}%`);
              };
              const l = () => {
                rx(0);
                ry(0);
              };
              card.addEventListener('mousemove', m);
              card.addEventListener('mouseleave', l);
              cleanups.push(() => {
                card.removeEventListener('mousemove', m);
                card.removeEventListener('mouseleave', l);
              });
            });
          }

          return () => cleanups.forEach((fn) => fn());
        }
      );
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );
}

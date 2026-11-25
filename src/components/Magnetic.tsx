import { useRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** força do "ímã" (0 a 1) */
  strength?: number;
}

/** Link que é atraído pelo cursor (só em dispositivos com mouse) */
export function Magnetic({ className = '', children, strength = 0.35, ...rest }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * strength);
        yTo((e.clientY - r.top - r.height / 2) * strength * 1.3);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    },
    { scope: ref }
  );

  return (
    <a ref={ref} className={`magnetic ${className}`} {...rest}>
      {children}
    </a>
  );
}

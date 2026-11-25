# Portfólio — Dayane Neves

React + TypeScript + Vite + GSAP (ScrollTrigger e SplitText) + Lenis (rolagem suave).
Bilíngue (PT/EN) com tema claro/escuro.

## Rodar
```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # checa os tipos do TypeScript
npm run build      # gera /dist para publicar (Vercel, Netlify, GitHub Pages)
```

## Estrutura
```
src/
  App.tsx                 marcação de todas as seções
  content.ts              TODOS os textos (PT/EN), links, stacks e projetos
  types.ts                tipos do conteúdo
  lib.ts                  utilitários (localStorage seguro, tradução)
  Icons.tsx               ícones de interface
  hooks/useAnimations.ts  todas as animações GSAP
  hooks/useSmoothScroll.ts rolagem suave com Lenis
  components/             Magnetic, SectionHead, StackIcon
  styles.css              estilos; cores dos dois temas no topo
```

## Onde editar
- **Textos, stacks e projetos:** `src/content.ts`. A lista `projects` começa vazia;
  ao adicionar itens, os cards aparecem sozinhos. Cada stack tem um `level`:
  `'daily'` (No dia a dia), `'learning'` (Aprimorando) ou `'used'` (Experiência).
- **Cores:** variáveis `--pink`, `--lilac` etc. no topo de `src/styles.css`.
- **Currículo:** os PDFs ficam em `public/` (`curriculo-dayane-neves.pdf` e `resume-dayane-neves-en.pdf`).
  O botão baixa a versão do idioma selecionado no site.

## Publicar grátis na Vercel
1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → "Add New Project" → importe o repositório → Deploy.

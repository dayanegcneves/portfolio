// ============================================================
//  Todo o conteúdo do portfólio fica aqui. Edite este arquivo
//  para trocar textos, links, stacks e projetos.
// ============================================================
import nodejs from './assets/icons/nodejs.svg';
import nestjs from './assets/icons/nestjs.svg';
import java from './assets/icons/java.svg';
import python from './assets/icons/python.svg';
import sqlserver from './assets/icons/microsoftsqlserver.svg';
import html5 from './assets/icons/html5.svg';
import css3 from './assets/icons/css3.svg';
import javascript from './assets/icons/javascript.svg';
import vuejs from './assets/icons/vuejs.svg';
import react from './assets/icons/react.svg';
import bootstrap from './assets/icons/bootstrap.svg';
import figma from './assets/icons/figma.svg';
import git from './assets/icons/git.svg';
import linux from './assets/icons/linux.svg';
import wordpress from './assets/icons/wordpress.svg';
import postman from './assets/icons/postman.svg';
import type { Content, Lang, Profile, Project, StackGroup } from './types';

export const profile: Profile = {
  name: 'Dayane Neves',
  email: 'dayaneneves.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dayanegcneves/',
  github: 'https://github.com/dayaneneves',
  // PDFs do currículo na pasta /public (um por idioma)
  cvUrl: {
    pt: '/curriculo-dayane-neves.pdf',
    en: '/resume-dayane-neves-en.pdf',
  },
};

// Ícones que giram em volta da foto no topo
export const orbitIcons: string[] = [nodejs, nestjs, vuejs, react, figma, sqlserver];

// level: 'daily' = uso no dia a dia | 'learning' = aprimorando | 'used' = já utilizei (selo "Experiência")
export const stackGroups: StackGroup[] = [
  {
    id: 'back',
    title: { pt: 'Back-end', en: 'Back-end' },
    items: [
      { name: 'Node.js', icon: nodejs, level: 'daily' },
      { name: 'NestJS', icon: nestjs, level: 'daily' },
      { name: 'SQL Server', icon: sqlserver, level: 'daily' },
      { name: 'Java', icon: java, level: 'used' },
      { name: 'Python', icon: python, level: 'used' },
    ],
  },
  {
    id: 'front',
    title: { pt: 'Front-end', en: 'Front-end' },
    items: [
      { name: 'Vue.js 3', icon: vuejs, level: 'daily' },
      { name: 'JavaScript', icon: javascript, level: 'daily' },
      { name: 'Bootstrap', icon: bootstrap, level: 'daily' },
      { name: 'React', icon: react, level: 'learning' },
      { name: 'HTML5', icon: html5, level: 'used' },
      { name: 'CSS3', icon: css3, level: 'used' },
    ],
  },
  {
    id: 'design',
    title: { pt: 'UI / UX', en: 'UI / UX' },
    items: [{ name: 'Figma', icon: figma, level: 'daily' }],
  },
  {
    id: 'qa',
    title: { pt: 'Testes', en: 'Testing' },
    items: [
      { name: 'Postman', icon: postman, level: 'used' },
      { name: { pt: 'Testes manuais', en: 'Manual testing' }, icon: 'check', level: 'used' },
    ],
  },
  {
    id: 'tools',
    title: { pt: 'Ferramentas', en: 'Tools' },
    items: [
      { name: 'WordPress', icon: wordpress, level: 'daily' },
      { name: 'Git', icon: git, level: 'used' },
      { name: 'CI/CD', icon: 'loop', level: 'used' },
      { name: 'Linux', icon: linux, level: 'used' },
      { name: { pt: 'IA aplicada', en: 'Applied AI' }, icon: 'spark', level: 'used' },
    ],
  },
];

// Adicione seus projetos aqui. Enquanto a lista estiver vazia,
// a seção mostra um aviso com o link do GitHub.
// Exemplo:
// {
//   title: 'Nome do projeto',
//   type: { pt: 'Projeto pessoal', en: 'Personal project' },
//   description: { pt: 'Qual problema resolve...', en: 'What it solves...' },
//   tags: ['NestJS', 'SQL Server', 'Vue.js'],
//   image: imagemImportada,         // opcional
//   live: 'https://...',            // opcional
//   repo: 'https://github.com/...', // opcional
// },
export const projects: Project[] = [];

export const t: Record<Lang, Content> = {
  pt: {
    nav: { about: 'Sobre', stack: 'Stacks', exp: 'Experiência', services: 'Serviços', projects: 'Projetos', contact: 'Contato' },
    hero: {
      status: 'Disponível para vagas e projetos freelancer',
      role: 'Full Stack Developer & UI Designer',
      lead: 'Desenvolvo sistemas do protótipo no Figma até a API em produção, com o olhar de quem já testou, deu suporte e conhece o software por dentro.',
      ctaContact: 'Vamos conversar',
      ctaCv: 'Baixar currículo',
      location: 'Salvador, BA · remoto, híbrido ou internacional',
    },
    about: {
      kicker: 'Sobre mim',
      statement:
        'Sou apaixonada por tecnologia. Gosto de tirar projetos da mente e vê-los funcionando diante dos meus olhos, passando por cada etapa: design, código, banco de dados e testes.',
      body: [
        'Comecei em 2020 no suporte de sistemas, escrevendo scripts SQL, liberando releases e analisando incidentes direto com o cliente. De lá fui para testes de interface, depois front-end com Vue.js e hoje trabalho no back-end com Node.js, NestJS e SQL Server.',
        'Esse caminho me deu uma visão completa do produto: sei como o usuário sente o software, onde ele quebra e como resolver de forma limpa e documentada.',
      ],
      diffs: [
        { title: 'Autodidata', text: 'Se ainda não sei, eu aprendo. Foi assim em cada mudança de área.' },
        { title: 'Ponta a ponta', text: 'Acompanho o software do protótipo ao deploy, passando por testes e documentação.' },
        { title: 'Prazo com qualidade', text: 'Entrego no tempo combinado, sem abrir mão de um código bem feito.' },
      ],
      stats: [
        { value: 6, suffix: '+', label: 'anos em tecnologia' },
        { value: 4, suffix: '', label: 'áreas: back, front, UI e QA' },
        { value: 3, suffix: '', label: 'formações em tecnologia e gestão' },
      ],
    },
    stack: {
      kicker: 'Stacks',
      title: 'As ferramentas que uso para tirar ideias do papel',
      daily: 'No dia a dia',
      learning: 'Aprimorando',
      used: 'Experiência',
      legendDaily: 'uso no trabalho atual',
      legendLearning: 'em evolução',
      legendUsed: 'já utilizei em projetos',
    },
    exp: {
      kicker: 'Experiência',
      title: 'Uma trajetória que passou por todas as etapas do software',
      jobs: [
        {
          company: 'Netra',
          role: 'Analista de Sistemas',
          period: 'abr 2024 — atual',
          phases: ['QA', 'Front-end', 'Back-end'],
          summary: 'Entrei testando interfaces, passei para o front-end com Vue.js 3 e hoje atuo no back-end com Node.js, NestJS e SQL Server.',
          bullets: [
            'Implementação de novas funcionalidades em APIs Node.js / NestJS',
            'Análise e correção de erros e manipulação de dados no SQL Server',
            'Desenvolvimento front-end com JavaScript e Vue.js 3',
            'Testes de interface e abertura de tasks no GitLab',
            'Documentação do projeto e prototipação de telas no Figma',
          ],
        },
        {
          company: 'Tecnotrends',
          role: 'Técnica de Suporte de Sistemas',
          period: 'mar 2020 — mar 2024',
          phases: ['Estágio', 'Suporte', 'SQL'],
          summary: 'Comecei como estagiária e fui efetivada no suporte de sistemas, atendendo clientes e atuando direto na base de dados.',
          bullets: [
            'Scripts SQL para correção de dados e geração de relatórios',
            'Liberação e instalação de releases, extratores e chaves de software',
            'Análise de incidentes e documentos de homologação do sistema',
            'Criação de manuais de fluxo e treinamento de novos funcionários',
          ],
        },
      ],
    },
    services: {
      kicker: 'Freelancer',
      title: 'O que posso construir para você',
      items: [
        { icon: 'web', title: 'Sites', text: 'Sites institucionais e landing pages rápidas e responsivas, em código ou WordPress.' },
        { icon: 'api', title: 'APIs', text: 'APIs REST com Node.js e NestJS, bem estruturadas, documentadas e integradas ao banco.' },
        { icon: 'system', title: 'Sistemas web', text: 'Painéis, cadastros e sistemas sob medida, do banco de dados à interface.' },
        { icon: 'design', title: 'Design de interfaces', text: 'Protótipos navegáveis no Figma, pensados para o usuário antes da primeira linha de código.' },
      ],
      processTitle: 'Como eu trabalho',
      process: [
        { title: 'Conversa', text: 'Entendo o seu problema e o objetivo do projeto.' },
        { title: 'Protótipo', text: 'Desenho as telas no Figma para você validar.' },
        { title: 'Desenvolvimento', text: 'Construo com entregas que você acompanha.' },
        { title: 'Testes e entrega', text: 'Testo, publico e entrego documentado.' },
      ],
    },
    projects: {
      kicker: 'Projetos',
      title: 'Projetos em destaque',
      emptyTitle: 'Novos projetos a caminho',
      emptyText: 'Estou preparando estudos de caso para mostrar aqui. Enquanto isso, acompanhe meu código no GitHub.',
      emptyCta: 'Ver meu GitHub',
      live: 'Ver online',
      repo: 'Código',
    },
    edu: {
      kicker: 'Formação',
      title: 'Base técnica com visão de negócio',
      items: [
        { title: 'Bacharelado em Engenharia da Computação', place: 'Faculdade Área1', period: '2016 — 2021' },
        { title: 'Pós-graduação em Inteligência Artificial e Machine Learning', place: 'Anhanguera', period: '2024 — 2025' },
        { title: 'MBA em Gestão Empresarial', place: 'Anhanguera', period: '2025 — 2026' },
      ],
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos construir algo juntos?',
      text: 'Tem uma vaga, um projeto ou uma ideia? Me mande uma mensagem e eu respondo rapidinho.',
      copy: 'Copiar e-mail',
      copied: 'E-mail copiado!',
      cv: 'Baixar currículo (PDF)',
    },
    ui: { theme: 'Alternar tema', lang: 'Switch to English', menu: 'Menu', top: 'Voltar ao topo' },
  },

  en: {
    nav: { about: 'About', stack: 'Stack', exp: 'Experience', services: 'Services', projects: 'Projects', contact: 'Contact' },
    hero: {
      status: 'Open to jobs and freelance projects',
      role: 'Full Stack Developer & UI Designer',
      lead: 'I build software from the Figma prototype to the API in production, with the eye of someone who has tested it, supported it and knows it from the inside.',
      ctaContact: "Let's talk",
      ctaCv: 'Download résumé',
      location: 'Salvador, Brazil · remote, hybrid or international',
    },
    about: {
      kicker: 'About me',
      statement:
        'I am passionate about technology. I love taking ideas out of my head and seeing them come alive, going through every step: design, code, database and testing.',
      body: [
        'I started in 2020 in systems support, writing SQL scripts, shipping releases and analyzing incidents directly with clients. Then I moved to UI testing, then front-end with Vue.js, and today I work on the back-end with Node.js, NestJS and SQL Server.',
        'That path gave me a complete view of the product: I know how users experience the software, where it breaks and how to fix it in a clean, documented way.',
      ],
      diffs: [
        { title: 'Self-taught', text: "If I don't know it yet, I learn it. That's how every career move happened." },
        { title: 'End to end', text: 'I follow the software from prototype to deploy, including testing and docs.' },
        { title: 'On time, with quality', text: 'I deliver when agreed, without cutting corners on the code.' },
      ],
      stats: [
        { value: 6, suffix: '+', label: 'years in tech' },
        { value: 4, suffix: '', label: 'areas: back, front, UI and QA' },
        { value: 3, suffix: '', label: 'degrees in tech and management' },
      ],
    },
    stack: {
      kicker: 'Stack',
      title: 'The tools I use to bring ideas to life',
      daily: 'Daily use',
      learning: 'Leveling up',
      used: 'Experienced',
      legendDaily: 'used in my current job',
      legendLearning: 'growing',
      legendUsed: 'used in past projects',
    },
    exp: {
      kicker: 'Experience',
      title: 'A journey through every stage of software',
      jobs: [
        {
          company: 'Netra',
          role: 'Systems Analyst',
          period: 'Apr 2024 — present',
          phases: ['QA', 'Front-end', 'Back-end'],
          summary: 'Started testing interfaces, moved to front-end with Vue.js 3 and now work on the back-end with Node.js, NestJS and SQL Server.',
          bullets: [
            'Building new features in Node.js / NestJS APIs',
            'Debugging, bug fixing and data handling in SQL Server',
            'Front-end development with JavaScript and Vue.js 3',
            'UI testing and bug reporting through GitLab issues',
            'Project documentation and screen prototyping in Figma',
          ],
        },
        {
          company: 'Tecnotrends',
          role: 'Systems Support Technician',
          period: 'Mar 2020 — Mar 2024',
          phases: ['Internship', 'Support', 'SQL'],
          summary: 'Started as an intern and was hired into systems support, helping clients and working directly with the database.',
          bullets: [
            'SQL scripts for data fixes and report generation',
            'Shipping and installing releases, patches and software licenses',
            'Incident analysis and system acceptance documents',
            'Writing process manuals and training new team members',
          ],
        },
      ],
    },
    services: {
      kicker: 'Freelance',
      title: 'What I can build for you',
      items: [
        { icon: 'web', title: 'Websites', text: 'Fast, responsive company sites and landing pages, hand-coded or on WordPress.' },
        { icon: 'api', title: 'APIs', text: 'REST APIs with Node.js and NestJS: well structured, documented and database-ready.' },
        { icon: 'system', title: 'Web systems', text: 'Dashboards, admin panels and custom systems, from database to interface.' },
        { icon: 'design', title: 'Interface design', text: 'Clickable Figma prototypes, designed for users before the first line of code.' },
      ],
      processTitle: 'How I work',
      process: [
        { title: 'Talk', text: 'I learn about your problem and goals.' },
        { title: 'Prototype', text: 'I design the screens in Figma for your approval.' },
        { title: 'Build', text: 'I develop with deliveries you can follow.' },
        { title: 'Test & ship', text: 'I test, deploy and hand over documented work.' },
      ],
    },
    projects: {
      kicker: 'Projects',
      title: 'Featured projects',
      emptyTitle: 'New projects on the way',
      emptyText: "I'm preparing case studies to show here. Meanwhile, follow my code on GitHub.",
      emptyCta: 'See my GitHub',
      live: 'Live',
      repo: 'Code',
    },
    edu: {
      kicker: 'Education',
      title: 'Technical foundation with a business mindset',
      items: [
        { title: "Bachelor's in Computer Engineering", place: 'Faculdade Área1', period: '2016 — 2021' },
        { title: 'Postgraduate in Artificial Intelligence and Machine Learning', place: 'Anhanguera', period: '2024 — 2025' },
        { title: 'MBA in Business Management', place: 'Anhanguera', period: '2025 — 2026' },
      ],
    },
    contact: {
      kicker: 'Contact',
      title: "Let's build something together?",
      text: "Got a job opening, a project or an idea? Send me a message and I'll get back to you soon.",
      copy: 'Copy e-mail',
      copied: 'E-mail copied!',
      cv: 'Download résumé (PDF)',
    },
    ui: { theme: 'Toggle theme', lang: 'Mudar para português', menu: 'Menu', top: 'Back to top' },
  },
};

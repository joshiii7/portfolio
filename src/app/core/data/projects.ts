import { CapstoneProject, ShowcaseProject } from "../models/project.model";

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
  {
    slug: "bislig-city-bpls",
    name: "Bislig City BPLS",
    image: {
      base: "images/projects/bislig-city-bpls/cover",
      widths: [480, 768, 1200, 1440],
      fallbackWidth: 768,
      width: 1919,
      height: 974,
      alt: "Screenshot of the Bislig City BPLS system."
    },
    problem: "Business permit registration, renewal, and status tracking were handled manually, making the process slow for both city staff and business owners.",
    solution: "Built a web-based Business Permit and Licensing System with an administrative dashboard, status tracking, and reporting tools.",
    result: "Gives Bislig City's licensing office a centralized system for processing and monitoring permits instead of manual paperwork.",
    tools: [
      "Angular",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Chart.js",
      "API Integration"
    ],
    metaDescription: "Case study: a web-based Business Permit and Licensing System built for Bislig City to replace manual permit processing and tracking.",
    bannerText: "A case study on replacing manual permit processing with a centralized online system."
  },
  {
    slug: "bislig-city-car-rental",
    name: "Bislig City Car Rental",
    image: {
      base: "images/projects/bislig-city-car-rental/cover",
      widths: [480, 768, 1200, 1440],
      fallbackWidth: 768,
      width: 1914,
      height: 973,
      alt: "Screenshot of the Bislig City Car Rental system."
    },
    problem: "No online system existed for browsing vehicles, requesting bookings, or managing rental schedules.",
    solution: "Built an online car rental management system covering vehicle listings, booking requests, scheduling, and admin monitoring.",
    result: "Centralizes rental bookings and fleet monitoring in a single system for Bislig City.",
    tools: [
      "Angular",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Chart.js",
      "API Integration"
    ],
    metaDescription: "Case study: an online car rental management system built for Bislig City covering vehicle listings, bookings, and admin monitoring.",
    bannerText: "A case study on centralizing vehicle bookings and fleet monitoring in one system."
  },
  {
    slug: "ascb-attendance-payroll",
    name: "ASCB Attendance & Payroll System",
    image: {
      base: "images/projects/ascb-attendance-payroll/cover",
      widths: [480, 768, 1200, 1440],
      fallbackWidth: 768,
      width: 1919,
      height: 976,
      alt: "Screenshot of the ASCB Attendance & Payroll System system."
    },
    problem: "Manual attendance tracking and payroll computation were time-consuming and prone to error.",
    solution: "Built a system that automates employee time tracking, salary computation, and payroll reporting.",
    result: "Reduces manual payroll work for Andres Soriano Colleges of Bislig staff.",
    tools: [
      "Angular",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Chart.js",
      "API Integration"
    ],
    metaDescription: "Case study: an attendance and payroll system built for Andres Soriano Colleges of Bislig to automate time tracking and salary computation.",
    bannerText: "A case study on automating attendance tracking and payroll computation."
  },
  {
    slug: "sh-merchantile-inventory",
    name: "SH Merchantile Inventory System",
    image: {
      base: "images/projects/sh-merchantile-inventory/cover",
      widths: [480, 768, 1200, 1440],
      fallbackWidth: 768,
      width: 1919,
      height: 971,
      alt: "Screenshot of the SH Merchantile Inventory System system."
    },
    problem: "Tracking stock levels, sales, and purchases manually made it difficult to stay on top of inventory.",
    solution: "Built an inventory management system with real-time reporting for stock, sales, and purchases.",
    result: "Gives the business real-time visibility into inventory movement instead of manual stock checks.",
    tools: [
      "PHP",
      "CSS",
      "JavaScript",
      "MySQL",
      "Chart.js"
    ],
    metaDescription: "Case study: an inventory management system with real-time reporting for stock, sales, and purchases.",
    bannerText: "A case study on replacing manual stock checks with real-time inventory visibility."
  },
  {
    slug: "mis-grading-system",
    name: "MIS Grading System",
    image: {
      base: "images/projects/mis-grading-system/cover",
      widths: [480, 768, 1200, 1440],
      fallbackWidth: 768,
      width: 1919,
      height: 975,
      alt: "Screenshot of the MIS Grading System system."
    },
    problem: "Grade encoding and student performance tracking were done manually, slowing down faculty workflows.",
    solution: "Built an academic grading system for efficient grade encoding and performance tracking.",
    result: "Speeds up grade processing and reduces manual encoding errors.",
    tools: [
      "Laravel",
      "Bootstrap 5",
      "Vite",
      "MySQL",
      "Chart.js"
    ],
    metaDescription: "Case study: an academic grading system built for efficient grade encoding and student performance tracking.",
    bannerText: "A case study on speeding up grade processing for faculty."
  }
];

// TODO: the text below comes from each project's README and site. `metaDescription` and `bannerText`
// are short summaries written from it, so give them a quick read and edit anything you'd word differently.
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    slug: "syntaxia",
    name: "Syntaxia",
    summary: "A programming book you read and practice at the same time, with live code editors and quizzes built into its lessons.",
    description: "Syntaxia is an interactive, author-written programming book covering languages, frameworks, and dev tools. Every lesson is a Markdown page that can embed a live code editor and a quiz, so you read a concept and try it in the same place.",
    highlights: [
      "The HTML curriculum runs 18 pages, from writing your first file to a profile-page mini project and a final quiz.",
      "A separate IDE section of 10 lessons covers what an IDE is, choosing and setting one up, the terminal, and debugging.",
      "The web lessons pair HTML, CSS, and JavaScript editors with a sandboxed live preview.",
      "Standalone intro lessons cover CSS, JavaScript, and Python."
    ],
    tools: [
      "VitePress",
      "Vue",
      "CodeMirror",
      "TypeScript",
      "Markdown"
    ],
    images: [
      {
        base: "images/projects/syntaxia/home",
        caption: "The home page, with the pitch and a way straight into the lessons.",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "Syntaxia home page: the headline Learn to code, interactively, next to an illustrated 3D cube, with Start Learning and View on GitHub buttons."
      },
      {
        base: "images/projects/syntaxia/lesson",
        caption: "A lesson: read the idea, edit the code, press Run, and see the result underneath.",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "An Intro to CSS lesson with a live CSS code editor, a Run button, and a rendered preview of the styled page underneath."
      },
      {
        base: "images/projects/syntaxia/quiz",
        caption: "Each lesson ends with a short quiz, so you find out what stuck before moving on.",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The quiz at the end of the Intro to CSS lesson: a multiple-choice question about CSS terms with four answers and a Check answer button."
      },
      {
        base: "images/projects/syntaxia/lesson-mobile",
        caption: "On a phone the editor and its preview stack, so lessons stay usable in one hand.",
        widths: [480, 780],
        fallbackWidth: 480,
        width: 780,
        height: 1688,
        alt: "The same lesson on a phone, with the code editor and its live preview stacked one above the other."
      }
    ],
    github: "https://github.com/Joshiii7/syntaxia",
    live: "https://joshiii7.github.io/syntaxia/",
    metaDescription: "Syntaxia: an interactive programming book with live code editors and quizzes in its lessons, built with VitePress and Vue.",
    bannerText: "An interactive programming book with live code editors and quizzes built into its lessons."
  },
  {
    slug: "fingerdash",
    name: "Fingerdash",
    summary: "A free touch-typing tutorial and Monkeytype-style typing test that runs entirely in your browser.",
    description: "Fingerdash is a free, fully client-side touch-typing tutorial and typing test. There is no backend and no accounts: settings, personal bests, and tutorial progress are all saved in your own browser.",
    highlights: [
      "A typing test in five modes: time, words, quote, custom text, and code (PHP, JavaScript, Python, Java, HTML, CSS, C++, C, and C#).",
      "Results show WPM, raw WPM, accuracy, and consistency with a WPM-over-time chart, and personal bests are tracked per mode.",
      "A guided tutorial from the home row through numbers and punctuation, with an on-screen keyboard that highlights the next key and which finger to use.",
      "Four themes (dark, light, Nord, and Solarized), a Ctrl+K command palette, and a keyboard-first, accessible interface with visible focus states and reduced-motion support."
    ],
    tools: [
      "Svelte",
      "TypeScript",
      "Vite",
      "Vitest",
      "Sass"
    ],
    images: [
      {
        base: "images/projects/fingerdash/home",
        caption: "The home page: two ways in, the tutorial or a quick typing test.",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "Fingerdash home page: the headline and the tagline, a free touch-typing tutorial and typing test right in your browser, over a photo of hands on a keyboard, with Start the tutorial and Take a typing test buttons."
      },
      {
        base: "images/projects/fingerdash/test",
        caption: "A test in progress. Speed updates live and mistakes show up in red as you type.",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The typing test partway through a run in words mode: the mode bar, a live speed reading, and the typed words in white with one mistyped letter marked in red."
      },
      {
        base: "images/projects/fingerdash/tutorial",
        caption: "The tutorial lights up the next key and tells you which finger should press it.",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The tutorial on the Home Row: F and J lesson, with an on-screen keyboard highlighting the F and J keys and finger guides below it."
      },
      {
        base: "images/projects/fingerdash/home-mobile",
        caption: "The home page on a phone.",
        widths: [480, 780],
        fallbackWidth: 480,
        width: 780,
        height: 1688,
        alt: "The Fingerdash home page on a phone."
      }
    ],
    github: "https://github.com/Joshiii7/fingerdash",
    live: "https://joshiii7.github.io/fingerdash/",
    metaDescription: "Fingerdash: a free, client-side touch-typing tutorial and typing test with five test modes, four themes, and an on-screen keyboard, built with Svelte.",
    bannerText: "A free touch-typing tutorial and typing test that runs entirely in your browser."
  },
  {
    slug: "portfolio",
    name: "Portfolio Website",
    summary: "This site itself: an Angular app with hand-written styles, GSAP animation, and a contact form that sends real email through Vercel.",
    description: "This portfolio is one Angular app with no UI library or CSS framework: every layout, component, and animation is written for it. The contact form sends real email through a small serverless function, and the pages are built to load light and work with a keyboard.",
    highlights: [
      "Angular 22 with standalone components, signals, and OnPush change detection. It runs without zone.js.",
      "Motion comes from GSAP (ScrollTrigger, SplitText, and ScrambleText) on the home page and AOS elsewhere. Both switch off for visitors who prefer reduced motion.",
      "Photos and screenshots are WebP in several widths, so a phone downloads a small file and a wide screen gets a sharp one.",
      "Each page sets its own title, description, and social tags. The site also ships JSON-LD, a sitemap, and a skip link for keyboard users.",
      "The contact form posts to a serverless function on Vercel. It validates the message, catches bots with a hidden field, slows down repeat senders, and sends the email with Nodemailer."
    ],
    tools: [
      "Angular",
      "TypeScript",
      "SCSS",
      "GSAP",
      "AOS",
      "Vercel",
      "Nodemailer"
    ],
    images: [
      {
        base: "images/projects/portfolio/home",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The home page: the headline I Build Software That Solves Real Problems, a Start a Project form beside it, and a scrolling strip of tools underneath.",
        caption: "The home page, with the intro on the left and a quick way to start a project on the right."
      },
      {
        base: "images/projects/portfolio/services",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The Services page showing a grid of glowing tiles for languages and frameworks, including HTML5, CSS, JavaScript, Angular, React, and Python.",
        caption: "The skills grid on the Services page, one glowing tile for each language and framework."
      },
      {
        base: "images/projects/portfolio/pricing",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The Pricing page with three maintenance plans, Basic Care, Standard Care, and Priority Care, and the start of a comparison table below them.",
        caption: "Pricing, with monthly and annual maintenance plans and a comparison table underneath."
      },
      {
        base: "images/projects/portfolio/home-mobile",
        widths: [480, 780],
        fallbackWidth: 480,
        width: 780,
        height: 1688,
        alt: "The home page on a phone, with the menu button at the top and the headline and buttons stacked in one column.",
        caption: "The same page on a phone, stacked into one column."
      }
    ],
    github: "https://github.com/Joshiii7/portfolio",
    live: "https://joshiii7-portfolio.vercel.app/",
    metaDescription: "Portfolio Website: how this site is built with Angular 22, GSAP, and Vercel, with WebP images, per-page SEO, and a serverless contact form.",
    bannerText: "The site you're looking at, and what it's built with."
  }
];

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
    problem: "Before this system, registering or renewing a business permit in Bislig City meant paper forms, in-person queues, and a status that only existed in a filing cabinet. Business owners had no way to check where their application stood without calling or visiting the office directly, and staff had to cross-reference paper records by hand every time a permit needed updating. As the city's business registry grew, that manual process became a bottleneck for everyone involved.",
    solution: "I built a web-based Business Permit and Licensing System with Angular on the front end and a Laravel API behind it, backed by MySQL. City staff get an administrative dashboard for reviewing applications, updating permit status, and generating reports, while the system tracks each permit's lifecycle from registration through renewal. Chart.js powers the reporting views, giving the office a visual read on permit volume and processing trends instead of digging through paper logs.",
    result: "Bislig City's licensing office now works from one centralized system instead of manual paperwork, with permit status tracked and searchable in one place. Staff can process registrations and renewals faster, and reporting that used to mean manually tallying paper records is now a dashboard view generated on demand.",
    tools: [
      "Angular",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Chart.js",
      "API Integration"
    ],
    status: "Completed",
    keyFeature: "Permit status tracking",
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
    problem: "Bislig City had no online way for residents to browse available vehicles, request a booking, or check a rental's schedule before this system existed. Every request went through a manual process, with staff coordinating vehicle availability and booking conflicts by hand rather than from a shared, up-to-date record.",
    solution: "I built an online car rental management system covering the full flow: vehicle listings with availability, a booking request workflow, scheduling, and an admin panel for monitoring the fleet. It's an Angular front end talking to a Laravel API over MySQL, with Chart.js handling the reporting views so staff can see booking trends and fleet usage at a glance.",
    result: "Rental bookings and fleet monitoring are now centralized in a single system for Bislig City instead of being coordinated by hand across separate requests. Staff can see vehicle availability and booking status in real time, and residents get a clear online way to request a rental instead of going through the office directly.",
    tools: [
      "Angular",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Chart.js",
      "API Integration"
    ],
    status: "Completed",
    keyFeature: "Online booking system",
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
    problem: "Attendance at Andres Soriano Colleges of Bislig was tracked by hand, and payroll was computed from those manual records every cycle. That meant hours of repetitive calculation for HR staff each pay period, and any small error in the attendance log carried straight through to someone's paycheck.",
    solution: "I built a system that automates employee time tracking, salary computation, and payroll reporting end to end. It's an Angular application on a Laravel and MySQL backend, with Chart.js used for the reporting side so administrators can review payroll and attendance trends without exporting spreadsheets by hand.",
    result: "Payroll processing that used to take a significant chunk of every pay period now runs from the same attendance records the system already tracks. That cuts out the manual re-entry step, along with the errors that came with it, and gives ASCB staff time back each cycle.",
    tools: [
      "Angular",
      "Tailwind",
      "Laravel",
      "MySQL",
      "Chart.js",
      "API Integration"
    ],
    status: "Completed",
    keyFeature: "Automated payroll",
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
    problem: "SH Merchantile tracked stock levels, sales, and purchases manually, which made it hard to know what was actually on the shelf at any given moment. Reconciling sales against inventory meant going through paper or spreadsheet records after the fact, so shortages and overstock often weren't caught until they were already a problem.",
    solution: "I built an inventory management system with real-time reporting for stock, sales, and purchases, using plain PHP, JavaScript, and MySQL on the backend and Chart.js for the reporting views. Every sale and purchase updates stock levels immediately, so the numbers on screen match what's actually in the store.",
    result: "The business now has real-time visibility into inventory movement instead of relying on manual stock checks. Stock levels, sales, and purchase trends are visible on demand, so decisions about reordering or flagging slow-moving stock don't have to wait for a manual count.",
    tools: [
      "PHP",
      "CSS",
      "JavaScript",
      "MySQL",
      "Chart.js"
    ],
    status: "Completed",
    keyFeature: "Real-time stock tracking",
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
    problem: "Grade encoding and student performance tracking were done manually, which slowed faculty down every grading period and left room for transcription errors between paper records and the final grade sheet. There was no shared system for tracking a student's performance across terms, so pulling that history together meant digging through old records by hand.",
    solution: "I built an academic grading system on Laravel and MySQL, with a Bootstrap 5 front end built with Vite, for efficient grade encoding and performance tracking. Faculty encode grades directly into the system, and Chart.js powers the reporting views so performance trends are visible without assembling them from separate paper records.",
    result: "Grade processing is faster now, and manual encoding errors are reduced since grades go straight into the system instead of being transcribed between paper and a final sheet. Faculty get a clearer, faster view of student performance across terms without having to reconstruct it by hand.",
    tools: [
      "Laravel",
      "Bootstrap 5",
      "Vite",
      "MySQL",
      "Chart.js"
    ],
    status: "Completed",
    keyFeature: "Automated grade encoding",
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
    status: "Live",
    keyFeature: "Live code editor",
    images: [
      {
        base: "images/projects/syntaxia/home",
        caption: [
          "Syntaxia's home page is the pitch: one headline, one clear way into the lessons, and nothing else competing for attention.",
          "Landing pages like this are the same kind of work I take on through {link}, where the goal is always to get a visitor to the one action that matters, not to show off everything a site could do.",
          "The 3D cube next to the headline is decorative, not load-bearing: it announces the subject before a visitor reads a word, and it degrades gracefully if a browser can't render it."
        ],
        captionLink: { text: "front-end development", route: "/services/frontend-development" },
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "Syntaxia home page: the headline Learn to code, interactively, next to an illustrated 3D cube, with Start Learning and View on GitHub buttons."
      },
      {
        base: "images/projects/syntaxia/lesson",
        caption: [
          "Every lesson pairs the idea with a live CodeMirror editor and a Run button, so a reader tries what they just read instead of taking it on faith.",
          "Nothing leaves the browser: the editor, the run step, and the rendered result all happen client-side, so a lesson works the same on a slow connection as a fast one.",
          "It's the same instinct behind {link}, another project built around learning by doing instead of reading."
        ],
        captionLink: { text: "Fingerdash", route: "/projects/fingerdash" },
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "An Intro to CSS lesson with a live CSS code editor, a Run button, and a rendered preview of the styled page underneath."
      },
      {
        base: "images/projects/syntaxia/quiz",
        caption: [
          "Each lesson ends with a short multiple-choice quiz, so a reader finds out what actually stuck before moving on to the next page.",
          "The questions are written per lesson rather than pulled from a generic bank, so a quiz on CSS specificity actually tests CSS specificity instead of something adjacent.",
          "Building a feature this specific, a quiz tied to one lesson's content, is the kind of scoped, custom work I take on through {link}."
        ],
        captionLink: { text: "custom software development", route: "/services/custom-software" },
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The quiz at the end of the Intro to CSS lesson: a multiple-choice question about CSS terms with four answers and a Check answer button."
      },
      {
        base: "images/projects/syntaxia/lesson-mobile",
        caption: [
          "On a phone the code editor and its live preview stack into one column instead of sitting side by side, so a lesson stays usable one-handed instead of demanding a wide screen.",
          "That's not a simplified mobile version. It's the same lesson, the same editor, the same Run button, just laid out for the screen it's actually on.",
          "Building layouts that hold up at every width is part of the {link} commitment behind every project on this site, this one included."
        ],
        captionLink: { text: "accessibility", route: "/accessibility" },
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
    status: "Live",
    keyFeature: "On-screen keyboard tutor",
    images: [
      {
        base: "images/projects/fingerdash/home",
        caption: [
          "Fingerdash is completely free, with no account and no backend: every setting, personal best, and tutorial step is saved in your own browser.",
          "That's a deliberate scope decision, not every project needs a server, and going without one here means nothing to host, nothing to patch, and nothing that can go down.",
          "It's the kind of trade-off I walk through with clients on the {link} page before a project starts, since the right amount of backend is whatever the project actually needs, not a default."
        ],
        captionLink: { text: "Pricing", route: "/pricing" },
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "Fingerdash home page: the headline and the tagline, a free touch-typing tutorial and typing test right in your browser, over a photo of hands on a keyboard, with Start the tutorial and Take a typing test buttons."
      },
      {
        base: "images/projects/fingerdash/test",
        caption: [
          "A typing test in progress: speed updates live as you type, and a mistyped letter turns red immediately instead of waiting for the end of the run.",
          "Every keystroke is measured and compared against the target text in real time, which is what makes the live WPM number and the red error marks possible without any noticeable lag.",
          "That same live-feedback loop, seeing the result of what you just did without a page reload, is also what makes the code editors in {link} work."
        ],
        captionLink: { text: "Syntaxia", route: "/projects/syntaxia" },
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The typing test partway through a run in words mode: the mode bar, a live speed reading, and the typed words in white with one mistyped letter marked in red."
      },
      {
        base: "images/projects/fingerdash/tutorial",
        caption: [
          "The guided tutorial highlights the next key on an on-screen keyboard and names the finger that should press it, so a beginner has one clear next step instead of a wall of instructions.",
          "The lesson order follows the home row outward, the same progression most touch-typing courses use, since there was no reason to reinvent something that already works.",
          "Fingerdash also ships full keyboard support and visible focus states end to end, part of the same {link} standard the rest of this site holds to."
        ],
        captionLink: { text: "accessibility", route: "/accessibility" },
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The tutorial on the Home Row: F and J lesson, with an on-screen keyboard highlighting the F and J keys and finger guides below it."
      },
      {
        base: "images/projects/fingerdash/home-mobile",
        caption: [
          "The home page collapses to one column on a phone, with the same two ways in, tutorial or a quick test, just stacked instead of side by side.",
          "The typing test and tutorial both work with a phone's on-screen keyboard too, not just a physical one, so the mobile layout isn't just cosmetic.",
          "Getting an interface to hold together at every screen size is core {link} work, tested on a real device before it ships rather than a resized browser window."
        ],
        captionLink: { text: "front-end development", route: "/services/frontend-development" },
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
    status: "Live",
    keyFeature: "Serverless contact form",
    images: [
      {
        base: "images/projects/portfolio/home",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The home page: the headline I Build Software That Solves Real Problems, a Start a Project form beside it, and a scrolling strip of tools underneath.",
        caption: [
          "The home page pairs the headline with a short project-start form, so a visitor can begin a conversation without hunting for a contact page.",
          "The form only asks for what's actually needed to start that conversation, name, project type, and a short description, so filling it out takes under a minute.",
          "Building a form like that, validated, simple, and tied straight into a real workflow, is exactly the kind of {link} this site is built to sell."
        ],
        captionLink: { text: "custom software", route: "/services/custom-software" }
      },
      {
        base: "images/projects/portfolio/services",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The Services page showing a grid of glowing tiles for languages and frameworks, including HTML5, CSS, JavaScript, Angular, React, and Python.",
        caption: [
          "The Services page lays out languages and frameworks as a grid of glowing tiles rather than a plain bullet list, since a skills list is more convincing shown than told.",
          "Each tile lights up on hover as a small, deliberate flourish, not because it needed one, but because a page about front-end craft should look like it was actually crafted.",
          "The full breakdown of what each one covers, and what a project built with them actually involves, lives on the {link} page itself."
        ],
        captionLink: { text: "Services", route: "/services" }
      },
      {
        base: "images/projects/portfolio/pricing",
        widths: [480, 768, 1200, 1440],
        fallbackWidth: 768,
        width: 1440,
        height: 900,
        alt: "The Pricing page with three maintenance plans, Basic Care, Standard Care, and Priority Care, and the start of a comparison table below them.",
        caption: [
          "Three maintenance plans sit above a comparison table, so the difference between Basic, Standard, and Priority Care is a scan rather than a reread.",
          "Pricing pages are easy to make confusing. This one tries not to add a row to the table unless it actually changes which plan someone should pick.",
          "The full table, along with one-time build pricing, is on the {link} page."
        ],
        captionLink: { text: "Pricing", route: "/pricing" }
      },
      {
        base: "images/projects/portfolio/home-mobile",
        widths: [480, 780],
        fallbackWidth: 480,
        width: 780,
        height: 1688,
        alt: "The home page on a phone, with the menu button at the top and the headline and buttons stacked in one column.",
        caption: [
          "On a phone the menu collapses behind a button and the headline stacks into one column, so the page still reads cleanly instead of just shrinking to fit.",
          "If you're looking at this on your own phone right now, that's the same layout doing its job.",
          "Get in {link} if you want something built the same way."
        ],
        captionLink: { text: "touch", route: "/contact" }
      }
    ],
    github: "https://github.com/Joshiii7/portfolio",
    live: "https://joshiii7-portfolio.vercel.app/",
    metaDescription: "Portfolio Website: how this site is built with Angular 22, GSAP, and Vercel, with WebP images, per-page SEO, and a serverless contact form.",
    bannerText: "The site you're looking at, and what it's built with."
  }
];

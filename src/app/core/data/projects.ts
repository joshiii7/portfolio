import { CapstoneProject, CraftProject } from "../models/project.model";

export const CAPSTONE_PROJECTS: CapstoneProject[] = [
  {
    slug: "bislig-city-bpls",
    name: "Bislig City BPLS",
    image: "assets/images/project_images/bislig_city_bpls.png",
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
    image: "assets/images/project_images/bislig_city_car_rental.png",
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
    image: "assets/images/project_images/ascb_attendance_and_payroll_system.png",
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
    image: "assets/images/project_images/sh_merchantile_inventory_system.png",
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
    image: "assets/images/project_images/mis_grading_system.png",
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

export const CRAFT_PROJECTS: CraftProject[] = [
  {
    name: "Cube Rotation",
    image: "assets/images/project_images/cube_rotation.png",
    description: "Cube rotation animation using HTML and CSS only.",
    tools: [
      "HTML",
      "CSS",
      "Animation"
    ],
    link: "assets/projects/cube/index.html"
  },
  {
    name: "Drip Effect",
    image: "assets/images/project_images/drip_effect.png",
    description: "Drip animation created using pure HTML and CSS.",
    tools: [
      "HTML",
      "CSS",
      "Animation"
    ],
    link: "assets/projects/drip_effect/index.html"
  },
  {
    name: "Animated Traffic Light",
    image: "assets/images/project_images/animated_traffic_light.png",
    description: "Traffic light animation built entirely with CSS.",
    tools: [
      "HTML",
      "CSS",
      "Animation"
    ],
    link: "assets/projects/animated_traffic_light/index.html"
  },
  {
    name: "Loading Animation",
    image: "assets/images/project_images/loading_animation.png",
    description: "Smooth loading animation using CSS only.",
    tools: [
      "HTML",
      "CSS",
      "Animation"
    ],
    link: "assets/projects/loading_animation/index.html"
  }
];

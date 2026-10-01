import { CompetitionStage, Role } from '../models/about.model';
import { webpVariants } from './photos';

const COMPETITIONS_DIR = 'images/photos/competitions';

export const ROLES: Role[] = [
  { title: 'Junior Web Developer', org: 'REK Marketing & Design', date: 'January 2026 – Present' },
  { title: 'Front-end Developer', org: 'Himugso Tech', date: 'September 2025 – Present' },
  { title: 'TVET Trainer (Web Development NCIII)', org: 'Andres Soriano Colleges of Bislig', date: 'September 2025 – Present' },
  { title: 'TESDA NC III Certified', org: 'Web Development', date: '2025' },
];

/** Oldest first: the order the stages were actually climbed. */
export const COMPETITION_JOURNEY: CompetitionStage[] = [
  {
    year: '2023',
    level: 'Provincial',
    result: 'Gold',
    story: [
      'This is where my run started. The provincial Skills Competition in Web Development was the first stage of the TESDA skills ladder, and the gold medal I won here opened the door to everything after it.',
      'Competing in web development meant building working pages against the clock, judged on the result. That is a different test from a classroom exercise, and it set the habits I carried into every later round: plan first, build cleanly, and keep going while the clock runs.',
      'This photo is from the awarding, me on the first-place podium with my certificate.',
    ],
    alt: 'Joshi on the first-place podium holding a certificate, with TESDA officials on either side',
    photo: {
      src: `${COMPETITIONS_DIR}/provincial-2023/winner-on-podium-with-certificate-1080.webp`,
      width: 1080,
      height: 810,
      variants: webpVariants(`${COMPETITIONS_DIR}/provincial-2023`, 'winner-on-podium-with-certificate', [480, 1080]),
    },
  },
  {
    year: '2023',
    level: 'Regional',
    result: 'Gold',
    story: [
      'My provincial win took me straight into the regional round later in 2023, where the field was larger and the pressure higher.',
      'I won gold again. The format stayed the same, but each round asked for a little more speed and polish than the one before.',
      'This podium photo is the regional awarding. Winning here kept my road to the national competition open.',
    ],
    alt: 'Joshi standing on the first-place podium at the regional skills competition',
    photo: {
      src: `${COMPETITIONS_DIR}/regional-2023/winners-on-podium-on-stage-1080.webp`,
      width: 1080,
      height: 810,
      variants: webpVariants(`${COMPETITIONS_DIR}/regional-2023`, 'winners-on-podium-on-stage', [480, 1080]),
    },
  },
  {
    year: '2024',
    level: 'National',
    result: 'Silver',
    story: [
      'In August 2024 the Philippine National Skills Competition took over the World Trade Center in Metro Manila. I competed in Web Technologies for TESDA Caraga, against the best from every region of the country.',
      'I finished with the silver medal in Web Technologies. It was the highest level I had reached so far, and the result that put me in line for the ASEAN team.',
      'This photo is from the awards night, with the Silver Medalist cheque on stage.',
    ],
    alt: 'Joshi holding the oversized Silver Medalist cheque on stage at the 2024 Philippine National Skills Competition',
    photo: {
      src: `${COMPETITIONS_DIR}/national-2024/silver-medal-awards-night-stage-1080.webp`,
      width: 1080,
      height: 607,
      variants: webpVariants(`${COMPETITIONS_DIR}/national-2024`, 'silver-medal-awards-night-stage', [480, 1080]),
    },
  },
  {
    year: '2025',
    level: 'WorldSkills ASEAN',
    result: 'Philippine representative',
    story: [
      'WorldSkills ASEAN Manila 2025 was the top of the ladder. I represented the Philippines in Web Technologies on home soil, up against the strongest web developers from across Southeast Asia, each one there to carry their own country\'s flag.',
      'It was also where the earlier rounds paid off. The competition floor, the headset and the shared workstation area were new, but the work was the same one I had been practising since the provincial round.',
      'The competition was only half of what I took home from Manila. I left with friends from across Southeast Asia, people I met at the next workstation and now call friends for life, and those are the friendships I will always cherish.',
    ],
    alt: 'Competitors from several countries, including Singapore, Indonesia and the Philippines, posing together on the WorldSkills ASEAN Manila 2025 competition floor',
    photo: {
      src: `${COMPETITIONS_DIR}/asean-2025/worldskills-asean-manila-competitors-group-1600.webp`,
      width: 1600,
      height: 1067,
      variants: webpVariants(`${COMPETITIONS_DIR}/asean-2025`, 'worldskills-asean-manila-competitors-group', [480, 960, 1600]),
    },
  },
  {
    year: '2026',
    level: 'WorldSkills Philippines Surigao del Sur',
    result: 'Silver, as an expert',
    story: [
      'In 2026 I came back to the competition floor from the other side of the table: as an expert, not a competitor, at the WorldSkills Philippines Surigao del Sur Competition in Web Development.',
      'It was my first time as an expert, and I went up against my former expert. My competitor took silver, and only his competitor beat mine to gold. Not a bad result for a first-timer.',
      'This photo is from the awarding, with my competitor and me on stage.',
    ],
    alt: 'Joshi and his silver-medal competitor on stage holding their certificates at the 2026 WorldSkills Philippines Surigao del Sur Competition',
    photo: {
      src: `${COMPETITIONS_DIR}/surigao-del-sur-2026/expert-and-silver-medalist-on-stage-1080.webp`,
      width: 1080,
      height: 810,
      variants: webpVariants(`${COMPETITIONS_DIR}/surigao-del-sur-2026`, 'expert-and-silver-medalist-on-stage', [480, 1080]),
    },
  },
];

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: 'Client' | 'Personal';
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  description: string;
  tags: string[];
  year: string;
  liveUrl?: string;
  subtitle?: string;
  location?: string;
  stats?: { label: string; value: string }[];
}

export const MARQUEE_ROW_1: string[] = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

export const MARQUEE_ROW_2: string[] = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'WEB DEVELOPMENT',
    description:
      'High-performance websites and digital experiences designed to elevate your brand and convert visitors into customers.',
  },
  {
    number: '02',
    title: 'AI SOLUTIONS',
    description:
      'Bring intelligent automation and AI-powered workflows into your business with custom models and integrations.',
  },
  {
    number: '03',
    title: 'SEO SERVICES',
    description:
      'Improve your search visibility, attract qualified traffic, and build an authoritative presence on Google.',
  },
  {
    number: '04',
    title: 'BUSINESS AUTOMATION',
    description:
      'Automate repetitive processes, connect systems seamlessly, and give your team more time to scale.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'dhaanish-engineering',
    number: '01',
    name: 'Dhaanish College of Engineering',
    category: 'Client',
    subtitle: 'Autonomous & NAAC A+ Technical Institution Portal',
    location: 'Padappai, Chennai, Tamil Nadu',
    liveUrl: 'https://dhaanishce.in/',
    col1Img1: 'https://dhaanishce.in/images/logo/h01.jpeg',
    col1Img2: 'https://dhaanishce.in/images/logo/h02.jpeg',
    col2Img: 'https://dhaanishce.in/images/bg_2.jpg',
    description:
      'Official institutional web platform and digital ecosystem for Dhaanish Ahmed College of Engineering (DACE Chennai) — an Autonomous, NAAC A+ accredited technical institution affiliated with Anna University. Ranked among the Top 5 in academics across Tamil Nadu with a 4-Star Ministry of Education rating. Features an interactive academic curriculum catalog, autonomous examination portals, online admissions counseling, and 92%+ corporate placement pipeline.',
    tags: ['Autonomous Institution', 'Anna University', 'NAAC A+', 'Web Portal', 'Higher Ed'],
    year: '2025',
    stats: [
      { label: 'Accreditation', value: 'NAAC A+ & Autonomous' },
      { label: 'State Rank', value: 'Top 5 Anna University' },
      { label: 'Placement Record', value: '92%+ Placements' },
      { label: 'Govt. Rating', value: '4-Star MoE Rating' },
    ],
  },
  {
    id: 'le-comfort-residency',
    number: '02',
    name: 'Le Comfort Residency',
    category: 'Client',
    subtitle: 'Boutique Coastal Stay & Direct Booking Platform',
    location: 'Nagore, Nagapattinam, Tamil Nadu',
    liveUrl: 'https://le-comfort.vercel.app/',
    col1Img1: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000&auto=format&fit=crop',
    col1Img2: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop',
    col2Img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop',
    description:
      'A quiet boutique residency stay in Nagore, Nagapattinam — crafted around simple rooms, honest hospitality, and easy coastal access. The web application features a photo-led minimalist UI, room inquiry and offline UPI/cash booking flows, nearby pilgrimage & supermarket guides, verified guest impressions (4.8/5 rating), and responsive interactive travel maps.',
    tags: ['Next.js & React', 'Hospitality UI', 'Tailwind CSS', 'Direct Booking', 'Nagore Coast'],
    year: '2026',
    stats: [
      { label: 'Guests Hosted', value: '500+ Guests' },
      { label: 'Average Rating', value: '4.8 / 5.0' },
      { label: 'On-site Parking', value: 'Free Dedicated' },
      { label: 'Location', value: 'Near Nagore Coast' },
    ],
  },
];

// Mock data for Reyansh School Website

import hero1 from './assets/images/hero-1.jpg';
import hero2 from './assets/images/hero-2.jpg';
import hero3 from './assets/images/hero-3.jpg';
import hero4 from './assets/images/hero-4.jpg';
import directorImg from './assets/images/director.jpg';

// About Images
// about-1.jpg is missing, using about-2.jpg instead
import about1 from './assets/images/about-2.jpg';
import about2 from './assets/images/about-2.jpg';

// Faculty Images
import facultyHero from './assets/images/faculty-hero.jpg';

// Student Life Images
import studentLife1 from './assets/images/student-life-1.jpg';
import studentLife2 from './assets/images/student-life-2.jpg';
import studentLife3 from './assets/images/student-life-3.jpg';

// Infrastructure Images
import infra1 from './assets/images/infrastructure-1.jpg';
import infra2 from './assets/images/infrastructure-2.jpg';
// Using repeats for the remaining slots as we only have 2 real infrastructure images + other images.
// The user wants "every photo" used.
import infra3 from './assets/images/student-life-1.jpg'; // Mixing in student life for variety in the gallery
import infra4 from './assets/images/student-life-2.jpg';
import infra5 from './assets/images/student-life-3.jpg';

export const schoolInfo = {
  name: "Reyansh School",
  tagline: "Beacon of Excellence",
  level: "Play Group to Class VIII",
  phone: "+91-9664321186",
  email: "reyanshschool@gmail.com",
  address: "A-136 & A-77, Opposite D-Mart, R.K.Puram, Kota, Rajasthan",
  established: "2017",
  affiliated: "2019",
  type: "Private English Medium Co-educational Institute",
  managedBy: "Mrs. Sonika Goyal",
  website: "www.reyanshschool.com",
  facebook: "https://www.facebook.com/reyanshschool",
  instagram: "https://www.instagram.com/reyansh.school/",
  youtube: "https://www.youtube.com/@reyanshkidsschool2066",
  googleMaps: "https://www.google.com/maps/dir//Reyansh+Public+School-Kota+Best+International+School+for+Kids,+A-136,+Rama+Krishna+Puram,+Kota,+Rajasthan+324005/@25.1536776,75.8417745,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x396f849a59b03d1b:0xd01963c41c4f08ba!2m2!1d75.824648!2d25.1237367?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D",
  logo: "https://customer-assets.emergentagent.com/job_743b014f-2782-4861-90c9-707bfb30a9a4/artifacts/vkg81kaf_WhatsApp%20Image%202024-12-25%20at%2010.31.14%20AM.jpeg"
};

export const directorMessage = {
  name: "Mrs. Sonika Goyal",
  designation: "Director",
  image: directorImg,
  message: "I am extremely passionate about the growth and development of the next generation. At Reyansh School, we focus on harnessing creativity and innovative thinking, not just creating smart people, but good human beings and conscious citizens. We believe in exposing our children to many experiences in a peaceful ambiance. Our student, teacher, and parent community works together to nurture courageous, creative, and imaginative children who are bold risk-takers and problem solvers. We follow an open system of schooling where students spend ample time outdoors for relaxation and reduced stress. We treat our students as 'work in progress' with all activities, instructions, and rules built around developing strong characters and personalities. Our active Research & Development team constantly innovates teaching methods to bring out the best in every child."
};

export const uniqueSellingPoints = [
  {
    title: "Kota's First School",
    description: "Providing Olympiad Preparation & Abacus during school hours",
    highlight: true
  },
  {
    title: "89 Gold Medals",
    description: "Achieved in Olympiads over the last 3 years",
    highlight: true
  }
];

export const olympiadAchievements = {
  totalGoldMedals: 89,
  years: ["2022-23", "2023-24", "2024-25"],
  olympiads: [
    {
      name: "IMO (International Mathematics Olympiad)",
      medals: [10, 13, "RA*"]
    },
    {
      name: "NSO (National Science Olympiad)",
      medals: [4, 2, 2]
    },
    {
      name: "NCO (National Cyber Olympiad)",
      medals: [8, 9, 20]
    },
    {
      name: "IEO (International English Olympiad)",
      medals: [2, 8, 2]
    },
    {
      name: "GK (General Knowledge Olympiad)",
      medals: ["NA*", "NA*", 9]
    }
  ],
  note: "* Not Attempted (NA), Result Awaited (RA)"
};

export const keyFeatures = [
  {
    icon: "BookOpen",
    title: "Academic Excellence",
    description: "Experienced and dedicated staff committed to student success"
  },
  {
    icon: "Building",
    title: "Modern Infrastructure",
    description: "State-of-the-art facilities, technology, and resources with lift facility"
  },
  {
    icon: "Monitor",
    title: "Smart Classes",
    description: "Air conditioned smart classrooms for comfortable learning"
  },
  {
    icon: "Trophy",
    title: "Extracurricular Activities",
    description: "Sports, Taekwondo, and Dance classes during evening hours"
  },
  {
    icon: "Shield",
    title: "Safety and Security",
    description: "Complete campus security with trained staff and CCTV surveillance"
  },
  {
    icon: "Award",
    title: "Olympiad Preparation",
    description: "Specialized coaching for various Olympiad competitions"
  },
  {
    icon: "Calculator",
    title: "Abacus During School Hours",
    description: "Unique program to improve mental math and concentration"
  },
  {
    icon: "Users",
    title: "Student Development",
    description: "Focus on character building, leadership skills, and overall growth"
  }
];

export const heroImages = [
  hero1,
  hero2,
  hero3,
  hero4
];

// About Images
// about-1.jpg is missing, using about-2.jpg instead
// about1 and about2 are already imported at the top of the file
import aboutStory from './assets/images/about-story.JPG';
import aboutHero from './assets/images/about-hero.jpg';
import aboutBanner from './assets/images/about-banner.JPG';

export const aboutImages = [
  aboutBanner,   // Index 0: Banner (Kids on Dragon)
  aboutStory,    // Index 1: Our Story (Teacher Group Photo)
  about1         // Index 2: Placeholder/Rest
];

export const facultyImages = [
  facultyHero
];

export const studentLifeImages = [
  studentLife1,
  studentLife2,
  studentLife3
];

export const infrastructureImages = [
  infra1,
  infra2,
  infra3,
  infra4,
  infra5
];

export const facultyMembers = [
  {
    id: 1,
    name: "Mrs. Priya Sharma",
    designation: "Principal",
    qualification: "M.Ed, B.Ed",
    experience: "20+ years",
    specialization: "Educational Leadership"
  },
  {
    id: 2,
    name: "Mr. Rajesh Kumar",
    designation: "Vice Principal",
    qualification: "M.A., B.Ed",
    experience: "15+ years",
    specialization: "Academic Administration"
  },
  {
    id: 3,
    name: "Ms. Anjali Verma",
    designation: "English Teacher",
    qualification: "M.A. English, B.Ed",
    experience: "10+ years",
    specialization: "Language & Literature"
  },
  {
    id: 4,
    name: "Mr. Suresh Patel",
    designation: "Mathematics Teacher",
    qualification: "M.Sc. Mathematics, B.Ed",
    experience: "12+ years",
    specialization: "Mathematics & Problem Solving"
  },
  {
    id: 5,
    name: "Mrs. Neha Gupta",
    designation: "Science Teacher",
    qualification: "M.Sc. Physics, B.Ed",
    experience: "8+ years",
    specialization: "Science & Innovation"
  },
  {
    id: 6,
    name: "Mr. Amit Singh",
    designation: "Physical Education Teacher",
    qualification: "M.P.Ed",
    experience: "7+ years",
    specialization: "Sports & Fitness"
  }
];

export const vision = "To become an esteemed institution while grooming the young minds to give their best & provide them to mature learning environment with teaching & parenting community.";

export const mission = [
  "To help a child realize his own unique inborn talents and potential",
  "Education aims at the flowering of the child's physical, emotional, mental & spiritual personality",
  "Create an environment that builds a child's intellectual, emotional & physical well-being",
  "Teachers & Parents must work in tandem for the growth & development of a child",
  "Through proper diagnostic program identifies academic strengths & weakness. Together they work to bridge the gap"
];

export const aims = [
  "Provide the best possible education",
  "Develop qualities of integrity, honesty, trust, tolerance & compassion",
  "Promote a spirit of enquiry & foster a scientific temper within humanism",
  "Help students become a meaningful part of their environment",
  "Pursuits of excellence encouraged",
  "Provide qualified, experienced & dedicated staff with a wide range of skill & interest",
  "Offer varied & wide choice of activities, academic & athletic",
  "Enriched environment with discovery, challenges & competitiveness",
  "Discipline based on the belief that responsibility comes before freedom"
];

export const testimonials = [
  {
    id: 1,
    name: "Parent Community",
    role: "Reyansh School Family",
    text: "The school focuses on holistic development, combining academics with character building. The teachers are passionate and dedicated to bringing out the best in every child."
  },
  {
    id: 2,
    name: "Parent Testimonial",
    role: "Happy Parent",
    text: "We chose Reyansh School for its emphasis on English proficiency and modern teaching methods. The safe environment and individual attention to each child make it stand out."
  },
  {
    id: 3,
    name: "School Community",
    role: "Satisfied Parents",
    text: "The collaborative approach between teachers and parents, combined with excellent facilities and innovative teaching, creates an ideal learning environment for our children."
  }
];

export const upcomingEvents = [
  {
    id: 1,
    title: "Annual Day Celebration",
    date: "2025-03-15",
    time: "10:00 AM",
    description: "Join us for our grand annual day celebration featuring cultural performances, award ceremonies, and exhibitions.",
    category: "cultural"
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2025-02-20",
    time: "2:00 PM",
    description: "An opportunity for parents to meet teachers and discuss their child's progress and development.",
    category: "academic"
  },
  {
    id: 3,
    title: "Science Exhibition",
    date: "2025-03-05",
    time: "9:00 AM",
    description: "Students showcase their innovative science projects and experiments. Open to all parents and guardians.",
    category: "academic"
  },
  {
    id: 4,
    title: "Sports Day",
    date: "2025-02-28",
    time: "8:00 AM",
    description: "A day filled with athletic competitions, team sports, and fun activities for all age groups.",
    category: "sports"
  },
  {
    id: 5,
    title: "Admission Open House",
    date: "2025-02-15",
    time: "11:00 AM",
    description: "Visit our campus, meet our faculty, and learn about our admission process for the upcoming academic year.",
    category: "admission"
  }
];

export const academics = {
  playgroup: {
    title: "Play Group",
    description: "Nurturing begins here. We stimulate natural curiosity, nurture capacity to learn, enable bond formation & self-expression. Morning sessions with separate secure outdoor area.",
    focus: ["Natural curiosity development", "Bond formation", "Self-expression", "Secure play environment"]
  },
  nursery: {
    title: "Nursery to Junior Classes",
    description: "Taught in varied settings for banded & mixed ability groups. Focus on recognizing individual needs and creating special ability groups.",
    focus: ["Individual needs recognition", "Mixed ability groups", "National curriculum", "Cross-curricular study"]
  },
  primary: {
    title: "Primary (Class 1-5)",
    description: "Building strong foundational skills with emphasis on English proficiency and comprehensive learning across subjects. Special focus on Olympiad preparation and Abacus training during school hours.",
    focus: [
      "English language mastery",
      "Core subjects excellence",
      "Olympiad Preparation (IMO, NSO, NCO, IEO, GK)",
      "Abacus Training during school hours",
      "Creative thinking",
      "Character development"
    ]
  },
  middle: {
    title: "Middle School (Class 6-8)",
    description: "Preparing students for future challenges with advanced curriculum. Continued Olympiad coaching and Abacus practice to enhance mental math and analytical abilities.",
    focus: [
      "Advanced academics",
      "Olympiad Preparation & Coaching",
      "Abacus - Advanced Level",
      "Competitive exam readiness",
      "Leadership skills",
      "Life skills development"
    ]
  }
};

export const specialPrograms = [
  {
    title: "English Proficiency Program",
    description: "Only English spoken in school premises. Continuous assessments for English conversation to ensure fluency."
  },
  {
    title: "Olympiad & Competitive Exams",
    description: "Regular classes and practice sheets provided. Many students reach advanced levels in various Olympiads."
  },
  {
    title: "Abacus Classes",
    description: "Special classes to improve memory power, concentration, and mental math abilities."
  },
  {
    title: "Buddy & Remedial Classes",
    description: "Buddy tutoring enriches both tutors & tutees. Remedial classes bridge knowledge gaps."
  },
  {
    title: "Educational Excursions",
    description: "Movies, magic shows, museum visits and other enriching educational trips."
  },
  {
    title: "Health & Fitness",
    description: "Special health camps by doctors to ensure student well-being."
  }
];

export const facilities = [
  {
    id: 1,
    title: "Digital Classrooms",
    description: "Bright & cheery classrooms with interactive whiteboards and dedicated technology areas for enhanced learning"
  },
  {
    id: 2,
    title: "Well-Stocked Library",
    description: "Comprehensive collection of books, magazines, and digital resources covering diverse subjects"
  },
  {
    id: 3,
    title: "Computer Lab",
    description: "Equipped with latest technology to enhance digital literacy and technology skills"
  },
  {
    id: 4,
    title: "Smart Classes",
    description: "Technology-equipped learning spaces for interactive and engaging education"
  },
  {
    id: 5,
    title: "Sports Facilities",
    description: "Basketball, Tennis, Skating, Outdoor Multi-Player Station, and Water Pool"
  },
  {
    id: 6,
    title: "Performance Stage & Dance Room",
    description: "Dedicated spaces for cultural activities, performances, and dance"
  },
  {
    id: 7,
    title: "Activity Rooms",
    description: "Dance floor, Doll House, and various activity areas for creative learning"
  },
  {
    id: 8,
    title: "School Garden & Sand Pit",
    description: "Outdoor spaces for nature-based learning and play"
  },
  {
    id: 9,
    title: "Air Cooled Classrooms",
    description: "Comfortable learning environment with proper ventilation and cooling"
  },
  {
    id: 10,
    title: "Transportation",
    description: "Safe and reliable school transportation service"
  },
  {
    id: 11,
    title: "Sickbay",
    description: "Medical facility with first-aid support for student health and safety"
  },
  {
    id: 12,
    title: "Audio Visual Classroom",
    description: "Multimedia learning spaces for enhanced educational experiences"
  }
];

export const admissionProcess = [
  {
    step: 1,
    title: "Enquiry",
    description: "Fill out the online enquiry form or visit the school office."
  },
  {
    step: 2,
    title: "School Tour",
    description: "Schedule a campus visit to explore our facilities and meet the faculty."
  },
  {
    step: 3,
    title: "Application",
    description: "Complete the admission application form with required documents."
  },
  {
    step: 4,
    title: "Interaction",
    description: "Informal interaction with the child and parents to understand needs."
  },
  {
    step: 5,
    title: "Admission",
    description: "Receive admission confirmation and complete enrollment formalities."
  }
];

export const gallery = [
  ...heroImages,
  ...aboutImages,
  ...studentLifeImages,
  ...infrastructureImages
];

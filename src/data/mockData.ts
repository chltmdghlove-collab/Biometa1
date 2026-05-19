export interface Member {
  id: string;
  name: string;
  role: 'Professor' | 'PostDoc' | 'PhD' | 'Master' | 'Undergraduate' | 'Alumni';
  email?: string;
  image: string;
  description?: string;
  education?: string[];
}

export interface Publication {
  id: string;
  year: number;
  authors: string;
  title: string;
  journal: string;
  link?: string;
  isSelected?: boolean;
}

export interface ResearchField {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
}

export const labData = {
  labName: "Biometamaterials Lab",
  vision: "생체 모사 메타물질을 통한 차세대 의료 솔루션 개발",
  subtitle: "본 연구실은 자연계에 존재하지 않는 인공적인 물성을 가진 메타물질을 설계하고, 이를 생체 시스템과 결합하여 난치병 치료 및 정밀 진단을 위한 혁신적인 플랫폼을 구축합니다.",
  professor: {
    name: "홍길동",
    englishName: "Gildong Hong, Ph.D.",
    title: "부교수, 바이오공학과",
    email: "gdhong@university.ac.kr",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    greeting: "환영합니다. Biometamaterials 연구실은 기술의 한계를 넘어 인류의 건강한 삶을 위한 새로운 물질을 탐구합니다. 호기심 많고 열정적인 학생들의 참여를 기다립니다.",
    biography: [
      "서울대학교 바이오공학 학사",
      "KAIST 생명과학 박사",
      "MIT 박사후 연구원 (POSTECH/Harvard 협력)",
      "현 OO대학교 바이오공학과 부교수"
    ],
    careers: [
      "2020 - 현재: OO대학교 바이오공학과 부교수",
      "2018 - 2020: XX연구소 선임연구원",
      "2015 - 2018: MIT 생체재료센터 연구원"
    ]
  },
  researchFields: [
    {
      id: "f1",
      title: "Bio-inspired Metamaterials",
      description: "자연계의 미세 구조를 모사하여 기계적, 광학적 특성을 조절하는 인공 재료 연구",
      image: "https://images.unsplash.com/photo-1532187863486-abf51ad990d9?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "f2",
      title: "Tissue Engineering Scaffold",
      description: "3D 프린팅 기술을 활용한 조직 재구축용 생분해성 지지체 개발",
      image: "https://images.unsplash.com/photo-1579154235602-3c2c299e0831?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "f3",
      title: "Nanomedicine Delivery",
      description: "특수한 물리적 환경에 반응하여 약물을 방출하는 스마트 나노 입자 연구",
      image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=600"
    }
  ],
  members: [
    {
      id: "m1",
      name: "김철수",
      role: "PhD",
      email: "chulsoo@university.ac.kr",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      description: "생체 재료 내 약물 전달 효율화 연구"
    },
    {
      id: "m2",
      name: "이영희",
      role: "Master",
      email: "younghee@university.ac.kr",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      description: "3D 프린팅 메타물질 설계"
    },
    {
      id: "m3",
      name: "박지민",
      role: "Undergraduate",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
      description: "조직 공학용 스캐폴드 테스트"
    }
  ] as Member[],
  publications: [
    {
      id: "p1",
      year: 2024,
      authors: "Hong, G. et al.",
      title: "Highly tunable mechanical properties of bio-inspired lattices",
      journal: "Nature Materials",
      link: "#",
      isSelected: true
    },
    {
      id: "p2",
      year: 2023,
      authors: "Kim, C., Hong, G.",
      title: "Spatio-temporal control of drug release using metamaterial structures",
      journal: "Advanced Materials",
      link: "#",
      isSelected: true
    },
    {
      id: "p3",
      year: 2022,
      authors: "Lee, Y., Hong, G.",
      title: "3D printed biodegradable scaffolds for bone regeneration",
      journal: "Biomaterials",
      link: "#"
    }
  ] as Publication[],
  news: [
    {
      id: "n1",
      date: "2024.05.15",
      title: "홍길동 교수, '올해의 젊은 과학자상' 수상",
      content: "본 연구실의 홍길동 교수님께서 바이오 메타물질 분야의 공로를 인정받아 수상하셨습니다."
    },
    {
      id: "n2",
      date: "2024.04.01",
      title: "2024년 하반기 신입 대학원생 모집 안내",
      content: "본 연구실과 함께 성장할 열정적인 학생분들의 많은 지원 부탁드립니다."
    }
  ] as NewsItem[],
  collaborators: [
    { name: "University Hospital", logo: "🏥" },
    { name: "National Biotech Lab", logo: "🔬" },
    { name: "Advanced Materials Corp", logo: "🏭" },
    { name: "Global Pharma", logo: "💊" }
  ],
  contact: {
    address: "서울특별시 OO구 OO로 123 OO대학교 공과대학 1호관 405호",
    phone: "02-1234-5678",
    email: "lab.biometa@university.ac.kr"
  }
};

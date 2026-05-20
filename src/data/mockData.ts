import andersonSilk from "../assets/images/paper_anderson_silk.png";
import revisitingSilk from "../assets/images/paper_revisiting_silk.png";
import ediblePUF from "../assets/images/paper_edible_puf.png";
import necklacesLasing from "../assets/images/paper_necklaces_lasing.png";
import greenSilkPhoto from "../assets/images/paper_green_silk.png";
import randomLasingMeta from "../assets/images/paper_random_lasing.png";
import profileChoi from "../assets/images/choi_27.jpg";
import top50Paper from "../assets/images/top50.png";
import andersonEzSimulation from "../assets/images/anderson_localization_simulation.png";
import insectIndustryHubComplex from "../assets/images/insect_industry_hub_complex.png";
import chitosanImage from "../assets/images/chitosan.png";
import silk1 from "../assets/images/silk1.png";
import silk from "../assets/images/silk.png";
import metaGif from "../assets/images/Meta.gif";
import metaMov from "../assets/images/meta.mov";

export interface Member {
  id: string;
  name: string;
  englishName?: string;
  role: 'ResearchProfessor' | 'PhD' | 'Master' | 'Undergraduate' | 'Alumni';
  country?: string;
  email?: string;
  image: string; // Default fallback image or local asset path
  description?: string; // Status / Degree
  education?: string[]; // Background and details
  fellowship?: string;
}

export interface Publication {
  id: string;
  year: number;
  authors: string;
  title: string;
  journal: string;
  link?: string;
  image?: string;
  extraImage?: string;
  isSelected?: boolean;
}

export interface ResearchField {
  id: string;
  title: string;
  description: string;
  details: string;
  image: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  date: string;
  title: string;
  content: string;
  image: string;
}

export const labData = {
  labName: "Biometamaterials Lab",
  vision: "BIOMETAMATERIALS FOR PRECISION MEDICINE",
  subtitle: "Our lab focuses on understanding and controlling light confinement, transport, and amplification in biological structures to search unique implications at the interface of the multiple disciplines of biomedical engineering, mesoscopic physics, material science, nonlinear dynamics, computational science, laser physics, chemistry, biology, nanophotonics, and biophotonics.",
  professor: {
    name: "최승호",
    englishName: "Seung Ho Choi, Ph. D.",
    title: "부교수, 의공학부",
    email: "seunghochoi@yonsei.ac.kr",
    dateOfBirth: "1982.12.06",
    image: profileChoi,
    greeting: "환영합니다. Biometamaterials 연구실은 기술의 한계를 넘어 인류의 건강한 삶을 위한 새로운 물질을 탐구합니다. 호기심 많고 열정적인 학생들의 참여를 기다립니다.",
    biography: [
      "Ph.D. in Weldon School of Biomedical Engineering, Purdue University (2016.5)",
      "M.S. in Interdisciplinary Program of Bioengineering, Seoul National University (2009.2)",
      "B.S. in Biomedical Engineering, Yonsei University (2006.8)"
    ],
    careers: [
      "2023–present: Associate Professor, Department of Biomedical Engineering, Yonsei University, Wonju, Republic of Korea",
      "2023–present: Associate Professor, Department of Integrative Medicine, Major in Digital Healthcare, Yonsei University College of Medicine, Seoul, Republic of Korea",
      "2019–2023: Assistant Professor, Department of Biomedical Engineering, Yonsei University, Wonju, Republic of Korea",
      "2016–2018: Post-Doctoral Research Fellow, Weldon School of Biomedical Engineering, Purdue University, West Lafayette, IN"
    ],
    googleScholar: "https://scholar.google.com/citations?user=jS-6VEoAAAAJ&hl=en"
  },
  researchFields: [
    {
      id: "f1",
      title: "Biological Metamaterials",
      description: "자연계의 미세 구조를 모사하여 기계적, 광학적 특성을 조절하는 인공 재료 연구",
      details: "본 분야에서는 자연계의 광학적 메커니즘을 심도 있게 분석하고, 이를 인공적인 나노/마이크로 구조체에 이식하여 극도의 물성 제어를 달성하는 것을 목표로 합니다. 특히 생체 적합성 고분자와 하이드로젤을 메타물질 구조와 결합하여, 인체 내부의 복잡한 물리적 신호를 모방하거나 제어하는 원천 기술을 확보하고 있습니다.",
      image: metaMov
    },
    {
      id: "f2",
      title: "Chitosan Wearable Biointerfaces",
      description: "곤충 유래 키토산을 기반으로 생체신호 계측과 피부 부착형 헬스케어 구현을 위한 지속가능 웨어러블 디바이스 플랫폼 연구",
      details: "본 분야에서는 갈색거저리 등 곤충 바이오매스에서 유래한 키틴·키토산을 활용하여 차세대 웨어러블 디바이스용 생체인터페이스 소재를 개발하는 것을 목표로 합니다. 키토산의 생체적합성, 생분해성, 필름 형성능, 이온전도성, 표면개질 가능성을 기반으로 피부 부착형 센서, 유연 생체전극, 호흡·심음·습도·pH·변형률 모니터링 디바이스 등 다양한 생체신호 계측 플랫폼을 구현하고 있습니다. 또한 곤충 부산물을 고부가가치 바이오소재로 전환함으로써, 인체 친화적이면서도 환경 지속가능성을 갖춘 웨어러블 헬스케어 디바이스, 의료용 필름 및 하이드로젤, 스마트 바이오센서 기판으로 확장 가능한 실용화 중심의 원천기술을 확보하고 있습니다.",
      image: chitosanImage
    },
    {
      id: "f3",
      title: "Silk-Based Biogenic Photonics",
      description: "실크 단백질의 생체적합성을 활용하여 생체유래 광소재 연구",
      details: "본 분야에서는 실크 피브로인 단백질을 단순한 생체재료가 아니라, 빛을 제어할 수 있는 생체유래 광학 플랫폼으로 재해석하는 것을 목표로 합니다. 실크의 나노피브릴 구조, 결정화도, 광투명성, 기계적 안정성, 생분해성을 정밀하게 조절하여 생체 내부에서도 사용 가능한 이식형 인터페이스를 개발하고 있습니다.",
      image: silk
    }
  ],
  members: [
    {
      id: "member-4",
      name: "Kay Thwe Htun, PhD",
      role: "ResearchProfessor",
      country: "Myanmar",
      description: "PhD",
      image: "kay_thwe_htun.jpg",
      education: [
        "B.S. in Medical Laboratory Technology",
        "University of Medical Technology"
      ]
    },
    {
      id: "member-1",
      name: "Ahmed Ali, PhD",
      role: "Alumni",
      country: "Pakistan",
      description: "Research Professor",
      image: "ahmed_ali.jpg",
      education: [
        "Associate Professor in Engineering",
        "Electrical & Biomedical Department, Sukkur IBA University"
      ]
    },
    {
      id: "member-2",
      name: "Riaz Muhammad",
      role: "Alumni",
      country: "Pakistan",
      description: "PhD student",
      image: "riaz_muhammad.jpg",
      education: [
        "B.S. in Electrical & Biomedical Engineering",
        "Sukkur IBA University"
      ]
    },
    {
      id: "member-3",
      name: "Enkhbayar Doljinsuren",
      role: "Alumni",
      country: "Mongolia",
      description: "PhD student",
      image: "enkhbayar_doljinsuren.jpg",
      education: [
        "B.S. in Engineering in Medical Equipment",
        "Mongolian University of Science and Technology"
      ]
    },
    {
      id: "member-5",
      name: "Gi Yeon Yu",
      role: "Master",
      country: "Korea",
      description: "Master student",
      image: "gi_yeon_yu.jpg",
      education: [
        "B.S. in Biomedical Engineering",
        "Yonsei University"
      ]
    },
    {
      id: "member-6",
      name: "Jiwon Ahn",
      role: "Master",
      country: "Korea",
      description: "Master student",
      image: "jiwon_ahn.jpg",
      education: [
        "B.S. in Biomedical Engineering",
        "Yonsei University"
      ]
    },
    {
      id: "member-7",
      name: "Chan Yeong Yu, MS",
      role: "Alumni",
      country: "Korea",
      description: "MS",
      image: "chan_yeong_yu.jpg",
      education: [
        "B.S. in Biomedical Electrical Engineering",
        "Yonsei University"
      ]
    },
    {
      id: "member-8",
      name: "Emmanuel Ackah",
      role: "Alumni",
      country: "Ghana",
      description: "MS/PhD student",
      image: "emmanuel_ackah.jpg",
      education: [
        "B.S. in Biomedical Engineering",
        "Valley View University"
      ]
    },
    {
      id: "member-9",
      name: "Ezekiel Edward Nettey-Oppong, PhD",
      role: "Alumni",
      country: "Ghana",
      description: "PhD",
      image: "ezekiel_edward.jpg",
      education: [
        "B.S. in Materials Engineering",
        "Kwame Nkrumah University of Science & Technology"
      ]
    },
    {
      id: "member-10",
      name: "Effah Elijah, M.S.",
      role: "Alumni",
      country: "Ghana",
      description: "M.S.",
      image: "effah_elijah.jpg",
      education: [
        "B.S. in Materials Engineering",
        "Kwame Nkrumah University of Science & Technology"
      ]
    },
    {
      id: "member-11",
      name: "Mwita Chacha Saidi, MS",
      role: "Alumni",
      country: "Tanzania",
      description: "MS",
      fellowship: "KOFIH Lee Jong-wook Fellowship Program",
      image: "mwita_chacha.jpg",
      education: [
        "B.S. in Medical Engineering",
        "Kenya National Medical Training College"
      ]
    },
    {
      id: "member-12",
      name: "Tien Son Ho, MS",
      role: "Alumni",
      country: "Vietnam",
      description: "MS",
      image: "tien_son_ho.jpg",
      education: [
        "B.S. in Biomedical Engineering",
        "Hanoi University of Science and Technology"
      ]
    },
    {
      id: "member-13",
      name: "Viet Phuong Han, MS",
      role: "Alumni",
      country: "Vietnam",
      description: "MS",
      image: "viet_phuong_han.jpg",
      education: [
        "B.S. in Electronic Materials and Nanotechnology",
        "Hanoi University of Science and Technology"
      ]
    },
    {
      id: "member-14",
      name: "Huynh Van Long, MS",
      role: "Alumni",
      country: "Vietnam",
      description: "MS",
      image: "huynh_van_long.jpg",
      education: [
        "B.S. in Materials Engineering",
        "Ho Chi Minh City University of Technology"
      ]
    },
    {
      id: "member-15",
      name: "Dinh Khac Huy, MS",
      role: "Alumni",
      country: "Vietnam",
      description: "MS",
      image: "dinh_khac_huy.jpg",
      education: [
        "B.S. in Engineering Physics",
        "Hanoi University of Science and Technology"
      ]
    },
    {
      id: "member-16",
      name: "Maria Claudia Rivas Ebner",
      role: "PhD",
      country: "Chile",
      description: "MS/PhD student",
      image: "maria_claudia.jpg",
      education: [
        "B.S. in Diplomado Kinesioterapia en UPC",
        "Universidad del Desarrollo"
      ]
    }
  ] as Member[],
  publications: [
    {
      id: "p21",
      year: 2018,
      authors: "Seung Ho Choi, Seong-Wan Kim, Zahyun Ku, Michelle A. Visbal Onufrak, Seong-Ryul Kim, Kwang-Ho Choi, Hakseok Ko, Wonshik Choi, Augustine M. Urbas, Tae-Won Goo, and Young L. Kim",
      title: "Anderson light localization in biological nanostructures of native silk",
      journal: "Nature Communications, vol. 9, pp. 452",
      image: andersonSilk,
      isSelected: true
    },
    {
      id: "p50",
      year: 2026,
      authors: "Hyuk Ju Kwon, Hoonkuk Son, Seung Ho Choi, and Kyung Min Byun",
      title: "Synergistic combination of convective self-assembly and hollow core fiber for sensitive SERS detection of glucose molecules",
      journal: "Biomedical Optics Express, accepted"
    },
    {
      id: "p49",
      year: 2026,
      authors: "María Claudia Rivas Ebner, Seong-Wan Kim, Giyeon Yu, Emmanuel Ackah, Hyun-Woo Jeong, Kyung Min Byun, Young-Seek Seok, and Seung Ho Choi",
      title: "Design and Fabrication of a Chitosan-Based Diaphragm Digital Stethoscope for Heart Sound Acquisition",
      journal: "Micromachines, vol. 17, pp. 555"
    },
    {
      id: "p48",
      year: 2026,
      authors: "Ji Won Ahn, Gi Yeon Yu, Seong-Wan Kim, Young-Seek Seok, Kyung Min Byun, and Seung Ho Choi",
      title: "A Cheonjiin layout mental speller: Developing a simple and cost-effective EEG-based BCI system",
      journal: "Sensors, vol. 26, pp. 2265"
    },
    {
      id: "p47",
      year: 2025,
      authors: "Ji Won Ahn, Gi Yeon Yu, Seong-Wan Kim, Young-Seek Seok, and Seung Ho Choi",
      title: "Rectus Femoris and Gastrocnemius EMG Driven Cheonjiin Speller for Korean Text Input",
      journal: "Sensors, vol. 25, pp. 7243"
    },
    {
      id: "p46",
      year: 2025,
      authors: "María Claudia Rivas Ebner, Emmanuel Ackah, Seong-Wan Kim, Young-Seek Seok, and Seung Ho Choi",
      title: "Kinematic Monitoring of the Thorax During the Respiratory Cycle Using a Biopolymer-Based Strain Sensor: A Chitosan–Glycerol–Graphite Composite",
      journal: "Biosensors, vol. 15, pp. 523"
    },
    {
      id: "p45",
      year: 2025,
      authors: "Ezekiel Edward Nettey-Oppong, Riaz Muhammad, Emmanuel Ackah, Hojun Yang, Ahmed Ali, Hyun-Woo Jeong, Seong-Wan Kim, Young-Seek Seok, and Seung Ho Choi",
      title: "Development of a Sustainable Flexible Humidity Sensor Based on Tenebrio molitor Larvae Biomass-Derived Chitosan",
      journal: "Sensors, vol. 25, pp. 575"
    },
    {
      id: "p44",
      year: 2025,
      authors: "Ezekiel Edward Nettey-Oppong, Riaz Muhammad, Dohyun Yoo, Sun-Hyeop Hwang, Ahmed Ali, Chacha Saidi Mwita, Hyun-Woo Jeong, Seong-Wan Kim, Young-Seek Seok, and Seung Ho Choi",
      title: "The Use of Biomass-Derived Chitosan for Colorimetric pH Detection",
      journal: "Photonics, vol. 12, pp. 231"
    },
    {
      id: "p43",
      year: 2024,
      authors: "Ezekiel Edward Nettey-Oppong, Riaz Muhammad, Ahmed Ali, Hyun-Woo Jeong, Young-Seek Seok, Seong-Wan Kim, and Seung Ho Choi",
      title: "The Impact of Temperature and Pressure on the Structural Stability of Solvated Solid-State Conformations of Bombyx mori Silk Fibroins: Insights from Molecular Dynamics Simulations",
      journal: "Materials, vol. 17, pp. 5686"
    },
    {
      id: "p42",
      year: 2024,
      authors: "Hyuck Ju Kwon, Yong Jun Cho, Kyeong Min Yuk, Jonghwan Lee, Seung Ho Choi, and Kyung Min Byun",
      title: "Development of nanogap-rich hybrid gold nanostructures by use of two non-lithographic deposition techniques for a sensitive and reliable SERS biosensor",
      journal: "Biomedical Engineering Letters, vol. 14, pp. 859–866"
    },
    {
      id: "p41",
      year: 2024,
      authors: "Chacha Saidi Mwita, Riaz Muhammad, Ezekiel Edward Nettey-Oppong, Doljinsuren Enkhbayar, Ahmed Ali, Jiwon Ahn, Seong-Wan Kim, Young-Seek Seok, and Seung Ho Choi",
      title: "Chitosan extracted from the biomass of Tenebrio molitor larvae as a sustainable packaging film",
      journal: "Materials, vol. 17, pp. 3670"
    },
    {
      id: "p40",
      year: 2024,
      authors: "Ezekiel Edward Nettey-Oppong, Ahmed Ali, Jiwon Ahn, Riaz Muhammad, Hyun Jin Lee, Hyun-Woo Jeong, Kyung Min Byun, and Seung Ho Choi",
      title: "Development of a 3D printing-enabled cost-effective multimodal Raman probe with high signal-to-noise ratio Raman spectrum measurements",
      journal: "ACS Omega, vol. 9, pp. 42822–42838"
    },
    {
      id: "p39",
      year: 2023,
      authors: "Riaz Muhammad, Seok-Ho Lee, Kay-Thwe Htun, Ezekiel Edward Nettey-Oppong, Ahmed Ali, Hyun-Woo Jeong, Young-Seek Seok, Seong-Wan Kim, and Seung Ho Choi",
      title: "Customized integrating-sphere system for absolute color measurement of silk cocoon with corrugated microstructure",
      journal: "Sensors, vol. 23, pp. 9778"
    },
    {
      id: "p38",
      year: 2023,
      authors: "Xudong Li, Min Lin, Imdad Ali, Ahmed Ali, Muhammad Irfan, Toufique A. Soomro, Seung Ho Choi, Weimin Yang, Haoyi Li, Saifur Rahman, Salim Nasar Faraj Mursal, Abdulnour Ali Jazem Ghanim, Othman Alyahyawy, and Morooj A. Al thagafi",
      title: "Characteristics Analysis of Plasticized Polyvinyl Chloride Gel-Based Microlens at Different Temperatures",
      journal: "ACS Omega, vol. 8, pp. 28924"
    },
    {
      id: "p37",
      year: 2023,
      authors: "Riaz Muhammad, Kay Thwe Htun, Ezekiel Edward Nettey-Oppong, Ahmed Ali, Dae Keun Jeon, Hyun-Woo Jeong, Kyung Min Byun, and Seung Ho Choi",
      title: "Pulse Oximetry Imaging System Using Spatially Uniform Dual Wavelength Illumination",
      journal: "Sensors, vol. 23, no. 7, p. 3723"
    },
    {
      id: "p36",
      year: 2023,
      authors: "Elijah Effah, Ezekiel Edward Nettey-Oppong, Ahmed Ali, Kyung Min Byun, and Seung Ho Choi",
      title: "Tunable Metasurfaces Based on Mechanically Deformable Polymeric Substrates",
      journal: "Photonics, vol. 10, pp. 119"
    },
    {
      id: "p35",
      year: 2022,
      authors: "Taeyoung Kang, Yongjun Cho, Kyeong Min Yuk, Chan Yeong Yu, Seung Ho Choi, and Kyung Min Byun",
      title: "Fabrication and characterization of novel silk fiber-optic SERS sensor with uniform assembly of gold nanoparticles",
      journal: "Sensors, vol. 22, pp. 9012"
    },
    {
      id: "p34",
      year: 2022,
      authors: "Ahmed Ali, Ezekiel Edward Nettey-Oppong, Elijah Effah, Chan Yeong Yu, Riaz Muhammad, Toufique Ahmed Soomro, Kyung Min Byun, and Seung Ho Choi",
      title: "Miniaturized Raman Instruments for SERS-Based Point-of-Care Testing on Respiratory Viruses",
      journal: "Biosensors, vol. 12, pp. 590"
    },
    {
      id: "p33",
      year: 2022,
      authors: "Hyunseon Yu, Sung Chan Lee, Gaye Park, Jaesun Kim, Hyunjoo Kim, Seung Ho Choi, and Byungjo Jung",
      title: "Development of a customized endoscopic dual-diffusing optical fiber probe for pancreatic cancer therapy: Toward clinical use",
      journal: "Photobiomodulation, Photomedicine, and Laser Surgery, vol. 40, pp. 1–7"
    },
    {
      id: "p32",
      year: 2022,
      authors: "Ji Hyeon Choi, Munsik Choi, Tien Son Ho, Soogeun Kim, Samjin Choi, Seung Ho Choi, and Kyung Min Byun",
      title: "Biological SERS-active sensor platform based on flexible silk fibroin film and gold nanoislands",
      journal: "Optics Express, vol. 30, pp. 7782–7794"
    },
    {
      id: "p31",
      year: 2022,
      authors: "Min Seok Kim, Gil Ju Lee, Jung Woo Leem, Seung Ho Choi, Young L. Kim, and Young Min Song",
      title: "Revisiting silk: a lens-free optical physical unclonable function",
      journal: "Nature Communications, vol. 13, 247",
      link: "https://www.nature.com/articles/s41467-021-27712-4",
      image: revisitingSilk,
      isSelected: true
    },
    {
      id: "p30",
      year: 2021,
      authors: "Ji Hyeon Choi, Munsik Choi, Taeyoung Kang, Tien Son Ho, Seung Ho Choi, and Kyung Min Byun",
      title: "Combination of porous silk fibroin substrate and gold nanocracks as a novel SERS platform for a high-sensitivity biosensor",
      journal: "Biosensors, vol. 11, pp. 441"
    },
    {
      id: "p29",
      year: 2021,
      authors: "Edalat Radfar, Hyunseon Yu, Tien Son Ho, Seung Ho Choi, and Byungjo Jung",
      title: "Depth perception on fundus images using a single-channel stereomicroscopy",
      journal: "Journal of Innovative Optical Health Sciences, vol. 14, pp. 2150012"
    },
    {
      id: "p28",
      year: 2021,
      authors: "Jong Yun Jeon, Seok Hyeon Hong, Eui Young Choi, Eun Bok, Seung Ho Choi, and Ji Won Seo",
      title: "Intuitive understandings of negative bulk modulus of metamaterials composed of Helmholtz resonators",
      journal: "Current Applied Physics, vol. 29, pp. 128–132"
    },
    {
      id: "p27",
      year: 2021,
      authors: "Munsik Choi, Taeyoung Kang, Seung Ho Choi, and Kyung Min Byun",
      title: "Dual modal plasmonic substrates based on convective self-assembly technique for enhancement in SERS and LSPR detection",
      journal: "Optics Express, vol. 29, pp. 6179-6187"
    },
    {
      id: "p26",
      year: 2021,
      authors: "Hyunseon Yu, Tien Son Ho, Heesung Kang, Youngwoo Bae, Eung Ho Choi, Seung Ho Choi, and Byungjo Jung",
      title: "Use of digital photography to identify neoplastic skin lesions after labelling by ALA-derived protoporphyrin",
      journal: "Journal of Porphyrins and Phthalocyanines, vol. 25, pp. 307–313"
    },
    {
      id: "p25",
      year: 2020,
      authors: "Munsik Choi, Soogeun Kim, Seung Ho Choi, Hyeong-Ho Park, and Kyung Min Byun",
      title: "Highly reliable SERS substrate based on plasmonic hybrid coupling between gold nanoislands and periodic nanopillar arrays",
      journal: "Optics Express, vol. 28, pp. 3598-3606"
    },
    {
      id: "p24",
      year: 2020,
      authors: "Jung Woo Leem, Min Seok Kim, Seung Ho Choi, Seong-Ryul Kim, Seong-Wan Kim, Young Min Song, Robert Young, and Young L. Kim",
      title: "Edible unclonable functions",
      journal: "Nature Communications, vol. 11, pp. 328",
      link: "https://www.nature.com/articles/s41467-019-14066-1",
      image: ediblePUF,
      isSelected: true
    },
    {
      id: "p23",
      year: 2019,
      authors: "Seung Ho Choi and Kyung Min Byun",
      title: "Naturally occurring order-disorder duality in photonic structures of the Haliotis fulgens abalone shell",
      journal: "Optical Materials Express, vol. 9, pp. 2206-2215"
    },
    {
      id: "p22",
      year: 2019,
      authors: "Sung Yeun Yang, Soocheol Kim, HyeIn Shin, Seung Ho Choi, Young L. Kim, Chulmin Joo, and WonHyoung Ryu",
      title: "Random lasing detection of structural transformation and compositions in silk fibroin scaffold",
      journal: "Nano Research, vol. 12, pp. 289"
    },
    {
      id: "p20",
      year: 2018,
      authors: "Seung Ho Choi, Kyung Min Byun, and Young L. Kim",
      title: "Lasing interactions disclose hidden modes of necklaces states in the Anderson localized regime",
      journal: "ACS Photonics, vol. 5, pp. 881-889",
      link: "https://pubs.acs.org/doi/10.1021/acsphotonics.7b01133",
      image: necklacesLasing,
      isSelected: true
    },
    {
      id: "p19",
      year: 2018,
      authors: "Jung Woo Leem, Jongwoo Park, Seong-Wan Kim, Seong-Ryul Kim, Seung Ho Choi, Kwang-Ho Choi, and Young L. Kim",
      title: "Green Light Activated Photoreaction via Genetic Hybridization of Far-red Fluorescent Protein and Silk",
      journal: "Advanced Science, vol. 5, pp. 1700863",
      link: "https://onlinelibrary.wiley.com/doi/full/10.1002/advs.201700863",
      image: greenSilkPhoto,
      isSelected: true
    },
    {
      id: "p18",
      year: 2017,
      authors: "Soocheol Kim, Sung Yeun Yang, Seung Ho Choi, Young L. Kim, Won Hyoung Ryu, and Chulmin Joo",
      title: "Random lasing from structurally modulated silk fibroin nanofibers",
      journal: "Scientific Reports, vol. 7, pp. 4506"
    },
    {
      id: "p17",
      year: 2017,
      authors: "Jung Woo Leem, Seung Ho Choi, Seong-Ryul Kim, Seong-Wan Kim, Kwang-Ho Choi, and Young L. Kim",
      title: "Scalable and continuous nanomaterial integration with transgenic fibers for enhanced photoluminescence",
      journal: "Materials Horizons, vol. 4, pp. 281-289"
    },
    {
      id: "p16",
      year: 2016,
      authors: "Taehoon Kim, Seung Ho Choi, Nathan Lambert-Cheatham, Zhengbin Xu, Janice E. Kritchevsky, Francois-René Bertin, and Young L. Kim",
      title: "Toward laboratory blood test-comparable photometric assessments for anemia in veterinary hematology",
      journal: "Journal of Biomedical Optics, vol. 21, pp. 107001-107001"
    },
    {
      id: "p15",
      year: 2016,
      authors: "Zhuoxian Wang, Xiangeng Meng, Seung Ho Choi, Sebastian Knitter, Young L. Kim, Hui Cao, Vladimir M. Shalaev, and Alexandra Boltasseva",
      title: "Controlling Random Lasing with Three-Dimensional Plasmonic Nanorod Metamaterials",
      journal: "Nano Letters, vol. 16, pp. 2471-2477",
      link: "https://pubs.acs.org/doi/10.1021/acs.nanolett.6b00034",
      image: randomLasingMeta,
      isSelected: true
    },
    {
      id: "p14",
      year: 2015,
      authors: "Seung Ho Choi, Kyung Min Byun, and Young L. Kim",
      title: "Excitation of multiple resonances in 1D Anderson localized systems for efficient light amplification",
      journal: "Optics Letters, vol. 40, pp. 847-850"
    },
    {
      id: "p13",
      year: 2014,
      authors: "Seung Ho Choi and Young L. Kim",
      title: "The potential of naturally occurring lasing for biological and chemical sensors",
      journal: "Biomedical Engineering Letters, vol. 4, pp. 201-212"
    },
    {
      id: "p12",
      year: 2014,
      authors: "Seung Ho Choi and Young L. Kim",
      title: "Hybridized/coupled multiple resonances in nacre",
      journal: "Physical Review B, vol. 89, pp. 035115"
    },
    {
      id: "p11",
      year: 2013,
      authors: "Nak-Hyeon Kim, Kyung Min Byun, Seung Ho Choi, and Young L. Kim",
      title: "Improvement of plasmonic field-matter interaction by subwavelength dielectric gratings",
      journal: "Applied Physics B, vol. 114, pp. 347–353"
    },
    {
      id: "p10",
      year: 2012,
      authors: "Seung Ho Choi, Bongseop Kwak, Bumsoo Han, and Young L. Kim",
      title: "Competition between excitation and emission enhancement of quantum dots on disordered plasmonic nanostructures",
      journal: "Optics Express, vol. 20, pp. 16785-16793"
    },
    {
      id: "p09",
      year: 2012,
      authors: "Seung Ho Choi and Young L. Kim",
      title: "Random lasing mode alterations by single-nanoparticle perturbations",
      journal: "Applied Physics Letters, vol. 100, pp. 041101-041104"
    },
    {
      id: "p08",
      year: 2011,
      authors: "Seong Min Jang, Donghyun Kim, Seung Ho Choi, Kyung Min Byun, and Sung June Kim",
      title: "Enhancement of localized surface plasmon resonance detection by incorporating metal-dielectric double-layered subwavelength gratings",
      journal: "Applied Optics, vol. 50(18), pp. 2846-2854"
    },
    {
      id: "p07",
      year: 2011,
      authors: "Seung Ho Choi, Sung June Kim, Chang-Hwan Im, Shin Ae Kim, and Daejoong Kim",
      title: "Quantitative model for the change of optical resonance in neural activity detection systems based on surface plasmon resonance",
      journal: "Optics & Laser Technology, vol. 43, pp. 938-948"
    },
    {
      id: "p06",
      year: 2011,
      authors: "Seung Ho Choi, Young L. Kim, and Kyung Min Byun",
      title: "Graphene-on-silver substrates for sensitive surface plasmon resonance imaging biosensors",
      journal: "Optics Express, vol. 19(2), pp. 458-466"
    },
    {
      id: "p05",
      year: 2010,
      authors: "Qinghai Song, Zhengbin Xu, Seung Ho Choi, Xuanhao Sun, Shumin Xiao, O Akkus, and Young L. Kim",
      title: "Detection of nanoscale structural changes in bone using random lasers",
      journal: "Biomedical Optics Express, vol. 1(5), pp. 1401-1407"
    },
    {
      id: "p04",
      year: 2010,
      authors: "Seung Ho Choi and Kyung Min Byun",
      title: "Investigation on an application of silver substrates for a sensitive surface plasmon resonance imaging detection",
      journal: "Journal of Optical Society of America A, vol. 27, pp. 2229-2236"
    },
    {
      id: "p03",
      year: 2010,
      authors: "Seung Ho Choi",
      title: "Fast and robust extraction of human skin optical and morphological properties using hybrid stochastic-deterministic algorithm: Monte-carlo simulation study",
      journal: "Lasers in Medical Science, vol. 25, pp. 733-741"
    },
    {
      id: "p02",
      year: 2010,
      authors: "Seung Ho Choi, Sung June Kim, and Kyung Min Byun",
      title: "Characteristics of light emission from surface plasmons based on silver diffraction gratings",
      journal: "Optics Communications, vol. 283, pp. 2961-2966"
    },
    {
      id: "p01",
      year: 2009,
      authors: "Seung Ho Choi, Sung June Kim, and Kyung Min Byun",
      title: "Design study for transmission improvement of resonant surface plasmons using dielectric diffraction gratings",
      journal: "Applied Optics, vol. 48, pp. 2924-2931"
    }
  ] as Publication[],
  news: [] as NewsItem[],
  gallery: [] as GalleryItem[],
  collaborators: [
    { name: "AFRL (Air Force Research Lab)", id: "afrl" },
    { name: "한국연구재단 (NRF)", id: "nrf" },
    { name: "농촌진흥청 국립농업과학원", id: "rda" },
    { name: "강원특별자치도", id: "gangwon" },
    { name: "LG CNS", id: "lgcns" },
    { name: "TODOC", id: "todoc" },
    { name: "Korea Nova", id: "koreanova" },
    { name: "MEDIANA", id: "mediana" },
    { name: "MEZOO", id: "mezoo" }
  ],
  contact: {
    address: "Yonsei University, 1 Yonseidae-gil, Room 202, Wonju, Gangwon-do 26493",
    email: "seunghochoi@yonsei.ac.kr"
  }
};

// Helper functions for dynamic client-side state of News and Gallery
export function getSavedNews(): NewsItem[] {
  const data = localStorage.getItem("lab_news");
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Filter out empty items or deprecated placeholders
        const filtered = parsed.filter(item => item.title && item.title.trim() !== "");
        if (filtered.length !== parsed.length) {
          localStorage.setItem("lab_news", JSON.stringify(filtered));
        }
        return filtered;
      }
    } catch (e) {
      // ignore
    }
  }
  return [...labData.news];
}

export function saveNews(newsList: NewsItem[]): void {
  localStorage.setItem("lab_news", JSON.stringify(newsList));
}

export function getSavedGallery(): GalleryItem[] {
  localStorage.removeItem("lab_gallery");
  return [];
}

export function saveGallery(galleryList: GalleryItem[]): void {
  localStorage.setItem("lab_gallery", JSON.stringify(galleryList));
}

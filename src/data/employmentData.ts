import { SalaryData, LifeInfo, CityInfo } from '../types/employment';

export const usaSalaryData: SalaryData[] = [
    {
        position: "Software Engineer",
        level: "Entry Level (0-2 years)",
        totalComp: "$120,000 - $180,000",
        base: "$100,000 - $130,000",
        bonus: "$10,000 - $20,000",
        equity: "$10,000 - $30,000",
        companies: ["Google", "Meta", "Amazon", "Microsoft"]
    },
    {
        position: "Software Engineer",
        level: "Mid Level (3-5 years)",
        totalComp: "$180,000 - $300,000",
        base: "$140,000 - $180,000",
        bonus: "$20,000 - $40,000",
        equity: "$20,000 - $80,000",
        companies: ["Apple", "Netflix", "Uber", "Airbnb"]
    },
    {
        position: "Software Engineer",
        level: "Senior Level (6+ years)",
        totalComp: "$300,000 - $500,000+",
        base: "$180,000 - $250,000",
        bonus: "$40,000 - $100,000",
        equity: "$80,000 - $150,000+",
        companies: ["Google", "Meta", "Netflix", "Apple"]
    }
];

export const canadaSalaryData: SalaryData[] = [
    {
        position: "Software Engineer",
        level: "Entry Level (0-2 years)",
        totalComp: "CAD 75,000 - 95,000",
        base: "CAD 70,000 - 85,000",
        bonus: "CAD 5,000 - 10,000",
        benefits: [
            "의료보험 (MSP)",
            "치과보험",
            "연금",
            "휴가 3주"
        ],
        companies: ["Shopify", "Amazon", "Microsoft", "SAP"]
    },
    {
        position: "Software Engineer",
        level: "Mid Level (3-5 years)",
        totalComp: "CAD 100,000 - 140,000",
        base: "CAD 90,000 - 120,000",
        bonus: "CAD 10,000 - 20,000",
        benefits: [
            "의료보험 (MSP)",
            "치과보험",
            "연금",
            "휴가 4주",
            "재택근무 옵션"
        ],
        companies: ["Shopify", "Amazon", "Microsoft", "Hootsuite"]
    },
    {
        position: "Software Engineer",
        level: "Senior Level (6+ years)",
        totalComp: "CAD 150,000 - 200,000+",
        base: "CAD 130,000 - 170,000",
        bonus: "CAD 20,000 - 30,000",
        benefits: [
            "의료보험 (MSP)",
            "치과보험",
            "연금",
            "휴가 5주",
            "주식 옵션"
        ],
        companies: ["Amazon", "Microsoft", "Shopify", "Google"]
    }
];

export const usaCityInfo: CityInfo[] = [
    {
        city: "San Francisco",
        costs: [
            "1베드룸 아파트: $3,500/월",
            "식비 (1인): $600/월",
            "교통비: $100/월",
            "헬스장: $80/월",
            "공과금: $150/월"
        ],
        highlights: [
            "테크 산업의 중심지",
            "높은 연봉 수준",
            "다양한 문화",
            "온화한 기후"
        ]
    },
    {
        city: "Seattle",
        costs: [
            "1베드룸 아파트: $2,500/월",
            "식비 (1인): $500/월",
            "교통비: $100/월",
            "헬스장: $70/월",
            "공과금: $130/월"
        ],
        highlights: [
            "아마존, 마이크로소프트 본사",
            "자연 친화적 환경",
            "무소득세 주",
            "커피 문화"
        ]
    },
    {
        city: "New York",
        costs: [
            "1베드룸 아파트: $4,000/월",
            "식비 (1인): $700/월",
            "교통비: $130/월",
            "헬스장: $100/월",
            "공과금: $170/월"
        ],
        highlights: [
            "금융 산업의 중심",
            "문화적 다양성",
            "24시간 도시",
            "높은 연봉 수준"
        ]
    }
];

export const canadaCityInfo: CityInfo[] = [
    {
        city: "Vancouver",
        costs: [
            "1베드룸 아파트: CAD 2,200/월",
            "식비 (1인): CAD 500/월",
            "교통비: CAD 100/월",
            "헬스장: CAD 60/월",
            "공과금: CAD 120/월"
        ],
        highlights: [
            "아름다운 자연환경",
            "높은 삶의 질",
            "다문화 도시",
            "테크 산업 성장"
        ]
    },
    {
        city: "Toronto",
        costs: [
            "1베드룸 아파트: CAD 2,400/월",
            "식비 (1인): CAD 500/월",
            "교통비: CAD 150/월",
            "헬스장: CAD 60/월",
            "공과금: CAD 130/월"
        ],
        highlights: [
            "캐나다 최대 도시",
            "다양한 취업 기회",
            "문화 중심지",
            "금융 산업 중심"
        ]
    },
    {
        city: "Montreal",
        costs: [
            "1베드룸 아파트: CAD 1,500/월",
            "식비 (1인): CAD 450/월",
            "교통비: CAD 90/월",
            "헬스장: CAD 50/월",
            "공과금: CAD 100/월"
        ],
        highlights: [
            "저렴한 생활비",
            "유럽풍 문화",
            "예술과 음악의 도시",
            "이중언어(영어/프랑스어)"
        ]
    }
];

export const lifeInfoUSA: LifeInfo[] = [
    {
        category: "세금",
        title: "세금 및 공제",
        description: "연방세, 주세, 각종 공제 항목 안내",
        details: [
            "연방세: 소득구간별 10-37%",
            "주세: 캘리포니아 최대 13.3%",
            "Social Security: 6.2%",
            "Medicare: 1.45%"
        ]
    },
    {
        category: "복리후생",
        title: "일반적인 복리후생",
        description: "주요 기업 기준 복리후생 패키지",
        details: [
            "의료보험 (건강, 치과, 안과)",
            "401(k) 매칭 (4-6%)",
            "무제한 PTO (Paid Time Off)",
            "원격근무 옵션"
        ]
    },
    {
        category: "주거",
        title: "주거 옵션",
        description: "지역별 주거 형태 및 계약 조건",
        details: [
            "아파트: 12개월 계약 일반적",
            "보증금: 1-2개월 월세",
            "신용점수 체크 필수",
            "렌터스 보험 권장"
        ]
    }
];

export const lifeInfoCanada: LifeInfo[] = [
    {
        category: "세금",
        title: "세금 체계",
        description: "연방세, 주세 및 각종 공제",
        details: [
            "연방세: 15-33%",
            "주세: 주별 상이 (5-25%)",
            "CPP 기여금: 5.7%",
            "EI 보험료: 1.58%"
        ]
    },
    {
        category: "의료",
        title: "의료 시스템",
        description: "공공 의료보험 시스템",
        details: [
            "기본 의료보험 무상 제공",
            "치과/안과 별도 가입 필요",
            "대기 시간이 있을 수 있음",
            "처방약 부분 자부담"
        ]
    },
    {
        category: "교육",
        title: "교육 시스템",
        description: "공교육 및 고등교육",
        details: [
            "공립학교 무상교육",
            "대학교 학비 미국보다 저렴",
            "자녀 교육비 세금공제",
            "다양한 장학금 제도"
        ]
    }
];

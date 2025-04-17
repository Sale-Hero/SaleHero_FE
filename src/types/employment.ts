export interface SalaryData {
    position: string;
    level: string;
    totalComp: string;
    base: string;
    bonus: string;
    equity?: string;
    benefits?: string[];
    companies: string[];
}

export interface LifeInfo {
    category: string;
    title: string;
    description: string;
    details: string[];
}

export interface CityInfo {
    city: string;
    costs: string[];
    highlights: string[];
}

export interface InterviewTopic {
    title: string;
    description: string;
    icon: string;
    examples: string[];
    tips: string[];
}

export interface InfoCard {
    title: string;
    description: string;
    icon: string;
    path: string;
    stats?: {
        label: string;
        value: string;
    }[];
}

export interface NavigationLink {
    path: string;
    label: string;
}

export interface QuickLink {
    title: string;
    icon: string;
    path: string;
}

export interface NewsItem {
    title: string;
    date: string;
    tag: string;
}

export interface WorkPermitInfo {
    type: string;
    title: string;
    description: string;
    requirements: string[];
    processingTime: string;
    validity: string;
}

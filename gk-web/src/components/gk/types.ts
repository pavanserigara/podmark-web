
export interface Certification {
    id: string;
    name: string;
    category: string;
    issuer?: string;
    description?: string;
    modules?: string[];
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface TrainingCourse {
    title: string;
    description: string;
    highlights: string[];
}

export interface ExperienceEntry {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string;
    icon: string;
    color: string;
    skills: string[];
    image?: string;
    duration?: string;
}

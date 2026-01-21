
export interface Certification {
    id: string;
    name: string;
    category: string;
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

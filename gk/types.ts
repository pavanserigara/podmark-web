
export interface Certification {
  id: string;
  name: string;
  category: 'Azure' | 'Windows' | 'CompTIA' | 'VMware' | 'M365' | 'Other';
  icon?: string;
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

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

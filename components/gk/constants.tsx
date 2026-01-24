
import React from 'react';
import {
  Cloud, Server, Shield, Cpu, GraduationCap, Briefcase,
  Terminal, Monitor, Network, Database, Globe, Zap, Code,
  Layers, Lock, Workflow, HardDrive, Share2, Award, ShieldAlert,
  Wrench, Building2
} from 'lucide-react';
import { Certification, Service, TrainingCourse, ExperienceEntry } from './types';

export const CERTIFICATIONS: Certification[] = [
  { id: 'mct', name: 'Microsoft Certified Trainer (MCT)', category: 'Other' },
  { id: 'az900', name: 'AZ-900: Azure Fundamentals', category: 'Azure' },
  { id: 'az104', name: 'AZ-104: Azure Administrator', category: 'Azure' },
  { id: 'az400', name: 'AZ-400: Azure DevOps Engineer', category: 'Azure' },
  { id: 'ai900', name: 'AI-900: Azure AI Fundamentals', category: 'Azure' },
  { id: 'azvdi', name: 'Azure Virtual Desktop (VDI)', category: 'Azure' },
  { id: 'ws2022', name: 'Windows Server 2022 Management', category: 'Windows' },
  { id: 'ws_legacy', name: 'Legacy Server (2003-2019) Migration', category: 'Windows' },
  { id: 'adds', name: 'Active Directory Domain Services', category: 'Windows' },
  { id: 'gpo', name: 'Group Policy & Identity Mgmt', category: 'Windows' },
  { id: 'hyperv', name: 'Hyper-V Virtualization', category: 'Windows' },
  { id: 'm365_f', name: 'M365 Fundamentals', category: 'M365' },
  { id: 'md102', name: 'MD-102: Endpoint Administrator', category: 'M365' },
  { id: 'ms100', name: 'MS-100: M365 Identity & Services', category: 'M365' },
  { id: 'exchange', name: 'Exchange Server Administration', category: 'M365' },
  { id: 'vmware', name: 'VMware VCP (Virtual Certified Professional)', category: 'VMware' },
  { id: 'comptia_a', name: 'CompTIA A+ (Hardware)', category: 'CompTIA' },
  { id: 'comptia_s', name: 'CompTIA Security+', category: 'CompTIA' },
  { id: 'comptia_n', name: 'CompTIA Network+', category: 'CompTIA' },
  { id: 'comptia_srv', name: 'CompTIA Server+', category: 'CompTIA' },
];

export const DETAILED_CERTIFICATIONS: Certification[] = [
  {
    id: 'comptia-a',
    name: 'A+ Certification',
    category: 'Hardware',
    issuer: 'CompTIA',
    description: 'Internationally recognized hardware course designed by CompTIA, completed at IIHT, Udupi.'
  },
  {
    id: 'comptia-n',
    name: 'N+ Certification',
    category: 'Networking',
    issuer: 'CompTIA',
    description: 'International recognized networking course designed by CompTIA, USA and completed at IIHT, Udupi.'
  },
  {
    id: 'mcsa-2012',
    name: 'MCSA: Windows Server 2012',
    category: 'Microsoft',
    issuer: 'Microsoft',
    modules: [
      '70-410: Installing and Configuring Windows Server 2012',
      '70-411: Administering Windows Server 2012',
      '70-412: Configuring Advanced Windows Server 2012 Services'
    ]
  },
  {
    id: 'mcse-cloud',
    name: 'MCSE: Private Cloud',
    category: 'Microsoft',
    issuer: 'Microsoft',
    modules: [
      '70-246: Monitoring and Operating a Private Cloud with System Center 2012',
      '70-247: Configuring and Deploying a Private Cloud with System Center 2012'
    ]
  },
  {
    id: 'mcse-messaging',
    name: 'MCSE: Messaging',
    category: 'Microsoft',
    issuer: 'Microsoft',
    modules: [
      '70-341: Core Solutions of Microsoft Exchange Server 2013',
      '70-342: Advanced Solutions of Microsoft Exchange Server 2013'
    ]
  },
  {
    id: 'mcts-sccm',
    name: 'MCTS: SCCM',
    category: 'Microsoft',
    issuer: 'Microsoft',
    modules: ['70-243: Administering and Deploying System Center 2012 Configuration Manager']
  },
  {
    id: 'itil-v3',
    name: 'ITIL Foundation v3',
    category: 'IT Service Management',
    issuer: 'ITIL',
    description: 'ITIL Foundation v3 certification.'
  },
  {
    id: 'mcsa-2016',
    name: 'MCSA: Windows Server 2016',
    category: 'Microsoft',
    issuer: 'Microsoft'
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Freelance Trainer",
    company: "Self-employed",
    period: "Oct 2014 - Present",
    location: "Bengaluru Area, India",
    description: "To achieve excellence in working as a dynamic professional, offering solutions to businesses using the best available resources where my analytical ability and analyzing quest are used maximum for the growth of the organization and to grow with the organization. Seeking a challenging position in a well established company that offers professional growth and ample opportu nity to learn and enrich my competencies in my profession. ",
    icon: "GraduationCap",
    color: "podPurple",
    skills: ["Azure", "CompTIA", "M365", "Consultancy"],
    duration: "11 yrs 4 mos"
  },
  {
    title: "CCNA and cyber security",
    company: "Cantonment indian army",
    period: "Jan 2025 - Feb 2025",
    location: "Hisar, Haryana, India",
    description: "As an MCT trainer, I conducted training sessions for the Indian Army's cantonment personnel, focusing on CCNA (Cisco Certified Network Associate) and Cyber Security. The training aimed to enhance their understanding of networking fundamentals, secure network management, and effective protection against cyber threats. I delivered practical knowledge and real-world applications to help them strengthen their network infrastructure and safeguard critical systems.",
    icon: "ShieldAlert",
    color: "podGold",
    skills: ["CCNA", "Cyber Security", "Network Defense"],
    duration: "2 mos"
  },
  {
    title: "Corporate Trainer",
    company: "Micro Academy (I) Pvt LTD",
    period: "Jul 2011 - Oct 2014",
    location: "Bengaluru, India",
    description: "As an MCT trainer, I conducted training sessions for the Indian Army's cantonment personnel, focusing on CCNA (Cisco Certified Network Associate) and Cyber Security. The training aimed to enhance their understanding of networking fundamentals, secure network management, and effective protection against cyber threats. I delivered practical knowledge and real-world applications to help them strengthen their network infrastructure and safeguard critical systems.",
    icon: "Building2",
    color: "podCyan",
    skills: ["Enterprise Training", "Consultancy", "Global Delivery"]
  },

  {
    title: "Computer Service Engineer",
    company: "Genius Computech",
    period: "May 2007 - Jun 2008",
    location: "Udupi, India",
    description: "Installing a new IT system, upgrading existing hardware and software, visiting home users to set up their PCs or fix faulty equipment. testing system, servicing printers and scanners.",
    icon: "Wrench",
    color: "podGold",
    skills: ["Hardware Engineering", "PC Repair", "Systems Upgrade"]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'corporate-training',
    title: 'Corporate Training',
    description: 'Expert-led technical workshops tailored for enterprise IT teams to bridge skill gaps.',
    icon: 'GraduationCap'
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    description: 'Strategic advisory on cloud migration, hybrid infrastructure, and system optimization.',
    icon: 'Briefcase'
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Practical training on endpoint management, network security, and threat mitigation.',
    icon: 'Shield'
  },
  {
    id: 'career-coaching',
    title: 'Career Coaching',
    description: 'Personalized guidance for IT professionals looking to clear high-stakes certifications.',
    icon: 'Zap'
  }
];

export const RUNNING_SERVICES = [
  "Windows Server 2022", "Azure Cloud Architecting", "VMware Virtualization",
  "CompTIA Security+", "Microsoft 365 Mastery", "Exchange Server Admin",
  "Generative AI on Azure", "Endpoint Management (MD-102)", "Network Infrastructure",
  "Identity & Access Management", "Azure VDI Solutions", "Cloud Governance"
];

export const PROJECTS = [
  {
    title: "Enterprise Azure Migration",
    client: "Global FinTech Hub",
    description: "Led the migration of 200+ on-prem servers to Azure using Site Recovery and Azure Migrate.",
    tags: ["Azure", "Migration", "FinTech"],
    icon: "Cloud",
    link: "#"
  },
  {
    title: "Secure Hybrid Identity",
    client: "National Health Service",
    description: "Architected a secure Entra ID (Azure AD) sync solution with on-prem AD for 5000+ users.",
    tags: ["Security", "ADDS", "Hybrid"],
    icon: "Lock",
    link: "#"
  },
  {
    title: "VDI Farm Deployment",
    client: "Logistics Leader",
    description: "Designed and deployed a global Azure Virtual Desktop (AVD) environment for remote engineers.",
    tags: ["AVD", "Infrastructure", "VDI"],
    icon: "Monitor",
    link: "#"
  }
];

export const GALLERY_IMAGES = [
  { url: "/images/gk.jpg", title: "Enterprise Datacenter", category: "Hardware" },
  { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000", title: "Cloud Architecture Flow", category: "Azure" },
  { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000", title: "Cyber Defense Systems", category: "Security" },
  { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000", title: "Training Masterclass", category: "MCT" },
  { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000", title: "Fibre Core Networking", category: "Networking" },
  { url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000", title: "AI Deployment Engine", category: "Generative AI" },
];

export const TRAINING_OFFERINGS: TrainingCourse[] = [
  {
    title: 'Windows Server Mastery',
    description: 'Complete lifecycle management from version 2003 to 2022.',
    highlights: ['ADDS Configuration', 'Group Policy Management', 'Hybrid Cloud Setup']
  },
  {
    title: 'Azure Cloud Solutions',
    description: 'End-to-end training for AZ-900, AZ-104, and AZ-400 paths.',
    highlights: ['Cloud Architecting', 'Azure AI Integration', 'DevOps Pipelines']
  },
  {
    title: 'Modern Workplace (M365)',
    description: 'Administering Office 365, Exchange Server, and MDM solutions.',
    highlights: ['Exchange Server Admin', 'MD-102 Endpoint Mgmt', 'Azure VDI']
  },
  {
    title: 'Virtualization & Networking',
    description: 'Infrastructure foundations through CompTIA and VMware VCP.',
    highlights: ['VMware Data Center', 'Network Infrastructure', 'Hardware Fundamentals']
  }
];

export const TIMELINE = [
  { year: '2008', event: 'Started IT career as a Systems Administrator for Windows Server 2003 environments.' },
  { year: '2012', event: 'Certified as a Microsoft Certified Trainer (MCT) and began leading professional workshops.' },
  { year: '2016', event: 'Specialized in Enterprise Virtualization and data center consolidation projects.' },
  { year: '2019', event: 'Focused on Cloud Transformation, architecting Azure hybrid identity solutions.' },
  { year: '2022', event: 'Expert training lead for M365 Endpoint Administrator and Security+ certifications.' },
  { year: '2025', event: 'Specialized Cyber Security training for Indian Army Cantonment personnel.' },
];

export const CORPORATE_CLIENTS = [
  { name: "HP", domain: "hp.com", logoPath: "/images/hp_logo.png" },
  { name: "Dell", domain: "dell.com", logoPath: "/images/dell_logo.png" },
  { name: "Wipro", domain: "wipro.com", logoPath: "/images/wipro_logo.png" },
  { name: "HCL", domain: "hcltech.com", logoPath: "/images/hcl_logo.png" },
  { name: "CGI", domain: "cgi.com", logoPath: "/images/cgi_logo.png" },
  { name: "Cognizant", domain: "cognizant.com", logoPath: "/images/cognizant_logo.png" },
  { name: "Mphasis", domain: "mphasis.com", logoPath: "/images/mphasis_logo.png" },
  { name: "ITC InfoTech", domain: "itcinfotech.com", logoPath: "/images/itc_infotech_logo.png" },
  { name: "Mindtree", domain: "mindtree.com", logoPath: "/images/mindtree_logo.png" },
  { name: "Capgemini", domain: "capgemini.com", logoPath: "/images/capgemini_logo.png" },
  { name: "CSC", domain: "dxc.com", logoPath: "/images/csc_logo.png" },
  { name: "Logica", domain: "cgi.com" },
  { name: "EMC2", domain: "dell.com", logoPath: "/images/emc2_logo.png" }
];

export const IconMap: Record<string, React.ElementType> = {
  Cloud, Server, Shield, Cpu, GraduationCap, Briefcase, Terminal, Monitor, Network, Database, Globe, Zap, Code, Layers, Lock, Workflow, HardDrive, Share2, Award, ShieldAlert, Wrench, Building2
};

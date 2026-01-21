
import React from 'react';
import { 
  Cloud, Server, Shield, Cpu, GraduationCap, Briefcase, 
  Terminal, Monitor, Network, Database, Globe, Zap, Code, 
  Layers, Lock, Workflow, HardDrive, Share2, Award, ShieldAlert,
  Wrench, Building2
} from 'lucide-react';
import { Certification, Service, TrainingCourse } from './types';

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

export const EXPERIENCE = [
  {
    title: "Freelance MCT Trainer",
    company: "Self-employed",
    period: "Oct 2014 - Present",
    location: "Bengaluru, India",
    description: "Delivering high-end technical solutions and training for global businesses. Focused on maximizing analytical quest and organizational growth through specialized Azure, CompTIA, and Microsoft 365 workshops.",
    icon: "GraduationCap",
    color: "pod-purple",
    skills: ["Azure", "CompTIA", "M365", "Consultancy"]
  },
  {
    title: "CCNA & Cyber Security Trainer",
    company: "Cantonment Indian Army",
    period: "Jan 2025 - Feb 2025",
    location: "Hisar, Haryana",
    description: "Conducted specialized training for the Indian Army personnel. Focused on networking fundamentals, secure network management, and protection against cyber threats for critical infrastructure.",
    icon: "ShieldAlert",
    color: "pod-gold",
    skills: ["CCNA", "Cyber Security", "Network Defense"]
  },
  {
    title: "Corporate Trainer",
    company: "Micro Academy (I) Pvt LTD",
    period: "Jul 2011 - Oct 2014",
    location: "Bengaluru, India",
    description: "Provided high-end technical training and recruitment services across India, Africa, and the Middle East. Specialized in enterprise-scale IT infrastructure and systems training.",
    icon: "Building2",
    color: "pod-cyan",
    skills: ["Enterprise Training", "Consultancy", "Global Delivery"]
  },
  {
    title: "Technical Trainer",
    company: "IIHT Ltd",
    period: "May 2008 - Jun 2011",
    location: "Global",
    description: "Empowering students and professionals through intensive IT infrastructure management and systems training programs.",
    icon: "Award",
    color: "pod-purple",
    skills: ["IT Infrastructure", "Training Delivery"]
  },
  {
    title: "Computer Service Engineer",
    company: "Genius Computech",
    period: "May 2007 - Jun 2008",
    location: "Udupi, India",
    description: "Hands-on engineering: installing new IT systems, upgrading hardware/software, and servicing enterprise-grade printers and scanners. Solid foundational hardware roots.",
    icon: "Wrench",
    color: "pod-gold",
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
  { url: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=1200&auto=format&fit=crop", title: "Enterprise Datacenter", category: "Hardware" },
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

export const IconMap: Record<string, React.ElementType> = {
  Cloud, Server, Shield, Cpu, GraduationCap, Briefcase, Terminal, Monitor, Network, Database, Globe, Zap, Code, Layers, Lock, Workflow, HardDrive, Share2, Award, ShieldAlert, Wrench, Building2
};

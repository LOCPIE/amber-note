export type ProductColor = 'space-gray' | 'blossom-pink';

export interface DemoPreset {
  id: string;
  title: string;
  duration: string;
  category: string;
  audioUrl?: string;
  transcript: {
    speaker: string;
    text: string;
    time: string;
  }[];
  summary: {
    overview: string;
    keyPoints: string[];
  };
  tasks: {
    title: string;
    assignee: string;
    deadline: string;
    status: string;
    baseApp: 'Base Workflow' | 'Base Meeting' | 'Base CRM';
  }[];
  crmSync?: {
    dealName: string;
    stage: string;
    value: string;
    notes: string;
  };
}

export interface SpecItem {
  iconName: string;
  label: string;
  value: string;
  desc: string;
}

export interface WhyCard {
  title: string;
  description: string;
  iconName: string;
}

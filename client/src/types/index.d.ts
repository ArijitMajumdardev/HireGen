interface Interview {
    id: string;
    role: string;
    level: string;
    questions: string[];
    techstack: string[];
    createdAt: string;
    userId: string;
    type: string;
    finalized: boolean;
}
  
interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}
interface TechIconProps {
  techStack: string[];
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
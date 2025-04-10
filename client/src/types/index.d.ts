interface CategoryScore {
  name:
    | "Communication Skills"
    | "Technical Knowledge"
    | "Problem Solving"
    | "Cultural Fit"
    | "Confidence and Clarity";
  score: number;
  comment: string;
}

interface Feedback {
  totalScore: number;
  categoryScores: CategoryScore[]; // Tuple converted to an array for flexibility
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

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
  feedback?: Feedback;
}

interface InterviewCardProps {
  id: string;
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
  feedback?: Feedback;
}
interface TechIconProps {
  techStack: string[];
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

declare type Experience = {
    id?: string;
    title?: string;
    companyName?: string;
    city?: string;
    state?: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking?: boolean;
    workSummery?: string;
  };
  
  declare type Education = {
    id?: number;
    universityName?: string;
    startDate?: string;
    endDate?: string;
    degree?: string;
    major?: string;
    description?: string;
  };
  
  declare type Skill = {
    id: number;
    name: string;
    rating: number;
  };
  
  declare type IResumeInfo = {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    themeColor: string;
    summary: string;
    experiences: Experience[];
    education: Education[];
    skills: Skill[] ;
  };
  


declare type AISummary = {
  experience_level: string;
  summary: string;
}
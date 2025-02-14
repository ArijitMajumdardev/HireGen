declare type Experience = {
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    currentlyWorking: boolean;
    workSummery: string;
  };
  
  declare type Education = {
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
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
    summery: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
  };
  
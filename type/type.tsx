// Types for the candidate detail data
export interface Skill {
    id: string;
    name: string;
  }
  
  export interface Country {
    id: string;
    iso: string;
    nicename: string;
    phonecode: string;
  }
  
  export interface Experience {
    id: string;
    candidate_id: string;
    title: string;
    company: string;
    location: string;
    currently_working: boolean;
    start_date: string;
    end_date: string | null;
    description: string;
    country: Country;
  }
  
  export interface Education {
    id: string;
    school: string;
    degree: string;
    field_of_study: string;
    date_attended: string;
    graduated_date: string;
    description: string;
  }
  
  export interface Certification {
    id: string;
    name: string;
    organization: string;
    issued_date: string;
    expiry_date: string;
    credential_id: string;
    credential_url: string;
  }
  
  export interface Language {
    id: string;
    language: string;
    proficiency: string;
  }
  
  export interface CandidateInfo {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    status: string | null;
    is_favourite: boolean | null;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    company_id: string | null;
    user_type: string;
    password: string;
    status: string;
    candidate: CandidateInfo;
  }
  
  export interface CandidateData {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    status: string | null;
    is_favourite: boolean | null;
    skills: Skill[];
    experiences: Experience[];
    education: Education[];
    certifications: Certification[];
    languages: Language[];
    user: User;
  }
  
  export interface CandidateDetailResponse {
    candidateDetail: {
      success: boolean;
      message: string;
      data: CandidateData;
    };
  }
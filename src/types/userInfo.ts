export interface UserInfoFormData {
    school: string;
    major: string;
    graduationYear: string;
    location: string;
    desiredCountry: string;
    skills: string[];
    interests: string[];
    introduction: string;
    githubUrl?: string;
    portfolioUrl?: string;
}

export interface UserInfoDTO {
    id?: number;
    user_id: number;
    employment_status: 'employed' | 'student';
    years_of_experience?: string;       // 직장인인 경우
    salary_range?: string;              // 직장인인 경우
    work_style?: string;                // 직장인인 경우
    birth_date: string;
    location: string;
    desired_country: string;
    skills: string[];
    interests: string[];
    introduction: string;
    github_url: string | null;
    portfolio_url: string | null;
    role?: string;
}

export interface ApiResponse<T> {

    message?: string;
    data: T;
    error?: string;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
export interface CompanyInformationDTO {
    id: string;
    companyName: string;
    companyUrl: string;
    companyLocation: string;
    companyCategory: string;
    companyDescription: string;
    companyLogo: string;
    companyId: string;
    companySize: string;
    companyFoundedAt: string;
    companySalaryRange: string;
    companyBenefits: string;
    companyTechStack: string;
    companyRequirements: string;
    companyPreferredQualifications: string;
    companyResponsibilities: string;
}

// export enum CommunityType {
//     COMMUNITY = "COMMUNITY",
//     TIPS = "TIPS",
// }

// eslint-disable-next-line
enum ApiCategory{
    ADZUNA = "ADZUNA",
}
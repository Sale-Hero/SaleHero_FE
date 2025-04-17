export interface ResponseDTO{
    result: any;
    message: string;
    code: number;
}

export interface PageResponseDTO{
    data: any;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}

export interface LoginResponseDTO{
    accessToken: string;
    message: string;
}
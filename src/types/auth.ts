export interface UserDTO {
    id: number,
    userEmail: string,
    userName: string,
    role: UserRole,

}

export enum UserRole{
    USER = "USER",
    ADMIN = "ADMIN"
}
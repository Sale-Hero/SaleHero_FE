import {AdminUser} from "./adminUser";

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed",
}

export interface SliceState {
    status: Status;
}

export interface PageInfo{
    total: number;
    currentPage: number;
    totalPages: number;
}

export interface PageResponse<T>{
    totalPages: number;
    totalElement: number;
    content: Array<T>;
}

export interface JsonResponseDTO<T>{
    success: string;
    data: T;
}

// admin ~
export interface ApiMeta {
    total: number;
    currentPage: number;
    totalPages: number;
}

export interface ApiResponse {
    data: AdminUser[];
    meta: ApiMeta;
}

type ChipStatus = {
    label: string;
    color: 'success' | 'error' | 'warning' | 'primary' | 'default';
};
export type StatusMapping = {
    [key: string]: ChipStatus;
};

interface BaseMenuItem {
    label: string;
    icon: JSX.Element;
    path: string;
}

interface SubMenuItem extends BaseMenuItem {}

interface SubMenuGroup extends BaseMenuItem {
    subItems: SubMenuItem[];
}

// interface MenuItem extends BaseMenuItem {
//     status: HeaderStatus;
//     subItems?: SubMenuGroup[];
// }

export enum SubMenu{

}

export interface ResponseDTO<T>{
    success: boolean,
    message: string,
    data: T
}

export interface SearchCondition {
    pageCondition: PageSearchDTO;
}

export interface PageSearchDTO{
    page?: number;
    size?: number;
}


export enum HeaderStatus {
    COMMUNITY = "COMMUNITY",
    DEALS = "DEALS",
    CONTACT = "CONTACT",
    NONE = "NONE",
}

export interface ChildrenProp {
    children: JSX.Element;
}
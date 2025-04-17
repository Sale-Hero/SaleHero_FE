import {HeaderStatus} from "../components/common/Header";
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
    meta: PageInfo;
    data: Array<T>;
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

interface MenuItem extends BaseMenuItem {
    status: HeaderStatus;
    subItems?: SubMenuGroup[];
}

export enum SubMenu{

}

export interface ResponseDTO<T>{
    success: boolean,
    message: string,
    data: T
}

// ~admin
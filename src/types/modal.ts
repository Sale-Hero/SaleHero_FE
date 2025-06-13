export enum ModalType {
    NONE = "NONE",
    CONFIRM = "CONFIRM",
}

export enum SubscribeStep{
    EMAIL_INPUT = "EMAIL_INPUT",
    VERIFICATION = "VERIFICATION"
}

export interface WeekDay {
    key: string;
    label: string;
}

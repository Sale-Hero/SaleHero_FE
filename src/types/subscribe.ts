
export enum DayOfWeek{
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
}

export interface SubscribePostDTO{
    userEmail: string,
    isMarketingAgreed: boolean;
    dayOfWeek: DayOfWeek[];
}
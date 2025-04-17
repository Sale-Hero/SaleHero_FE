export enum NewsLetterFrequency{
    WEEKLY_ONCE = "WEEKLY_ONCE",
    WEEKLY_FIVE = "WEEKLY_FIVE",
}

export interface SubscribePostDTO{
    userEmail: string,
    frequency: NewsLetterFrequency,
    isMarketingAgreed: boolean
}
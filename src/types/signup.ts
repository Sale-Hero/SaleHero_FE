export interface UserPostDTO {
  user_email: string;
  username: string;
  password: string;
  nation: string;
}

export enum ValidateStatus {
  NONE = "NONE",
  UNFILLED = "UNFILLED",
  BELOW_REQUIRED_LENGTH = "BELOW_REQUIRED_LENGTH",
  INVALID = "INVALID"
}

export interface Args {
  id: string;
  nickName: string;
  password: string;
  passwordCheck: string;
  nation: string;
}
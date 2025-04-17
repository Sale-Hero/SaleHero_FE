import { useState, useCallback } from 'react';
import { ValidateStatus } from '../../types/signup';

interface SignInValidationFields {
  email: string;
  password: string;
}

interface SignUpValidationFields extends SignInValidationFields {
  nation: string;
  nickName: string;
  passwordCheck: string;
}

type ValidationMode = 'signin' | 'signup';

export function useAuthValidator(mode: ValidationMode, fields: SignInValidationFields | SignUpValidationFields) {
  const [emailValidate, setEmailValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [passwordValidate, setPasswordValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [nationValidate, setNationValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [nickNameValidate, setNickNameValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [passwordCheckValidate, setPasswordCheckValidate] = useState<ValidateStatus>(ValidateStatus.NONE);

  const validateSignIn = useCallback((fields: SignInValidationFields) => {
    let isValid = true;
    const { email, password } = fields;

    if (email.length === 0) {
      setEmailValidate(ValidateStatus.UNFILLED);
      isValid = false;
    }

    if (password.length === 0) {
      setPasswordValidate(ValidateStatus.UNFILLED);
      isValid = false;
    }

    return isValid;
  }, []);

  const validateSignUp = useCallback((fields: SignUpValidationFields) => {
    let isValid = true;
    const { email, password, nation, nickName, passwordCheck } = fields;

    if (nation === '국가를 선택해주세요!') {
      setNationValidate(ValidateStatus.UNFILLED);
      isValid = false;
    }

    if (email.length === 0) {
      setEmailValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValid = false;
    }

    if (nickName.length < 4 || nickName.length > 16) {
      setNickNameValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValid = false;
    }

    if (password.length < 4) {
      setPasswordValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValid = false;
    }

    if (passwordCheck.length < 4) {
      setPasswordCheckValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValid = false;
    }

    if (password !== passwordCheck) {
      setPasswordCheckValidate(ValidateStatus.INVALID);
      isValid = false;
    }

    return isValid;
  }, []);

  const validate = useCallback(() => {
    if (mode === 'signin') {
      return validateSignIn(fields as SignInValidationFields);
    }
    return validateSignUp(fields as SignUpValidationFields);
  }, [mode, fields, validateSignIn, validateSignUp]);

  const resetValidation = useCallback(() => {
    setEmailValidate(ValidateStatus.NONE);
    setPasswordValidate(ValidateStatus.NONE);
    if (mode === 'signup') {
      setNationValidate(ValidateStatus.NONE);
      setNickNameValidate(ValidateStatus.NONE);
      setPasswordCheckValidate(ValidateStatus.NONE);
    }
  }, [mode]);

  return {
    emailValidate,
    setEmailValidate,
    passwordValidate,
    setPasswordValidate,
    ...(mode === 'signup' && {
      nationValidate,
      setNationValidate,
      nickNameValidate,
      setNickNameValidate,
      passwordCheckValidate,
      setPasswordCheckValidate,
    }),
    validate,
    resetValidation,
  };
}

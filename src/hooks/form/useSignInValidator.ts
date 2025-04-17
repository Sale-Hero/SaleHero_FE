import {useCallback, useState} from "react";
import {ValidateStatus} from "../../types/signup";

interface Args{
    nation: string;
    id: string;
    nickName: string;
    password: string;
    passwordCheck: string;
}

export function useSignUpValidator({
                                       nation, id, nickName, password, passwordCheck
                                   }:Args) {
    const [nationValidate, setNationValidate] = useState(ValidateStatus.NONE);
    const [idValidate, setIdValidate] = useState(ValidateStatus.NONE);
    const [nickNameValidate, setNickNameValidate] = useState(ValidateStatus.NONE);
    const [passwordValidate, setPasswordValidate] = useState(ValidateStatus.NONE);
    const [passwordCheckValidate, setPasswordCheckValidate] = useState(ValidateStatus.NONE);

    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    let isValidate = true

    const validate = useCallback(() => {
        if (nation === '국가를 선택해주세요!') {
            setNationValidate(ValidateStatus.UNFILLED)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isValidate = false;
        }

        if (id.length === 0) {
            setIdValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
            isValidate = false;
        }

        if (idValidate === ValidateStatus.UNFILLED) {
            isValidate = false;
        }

        // if (!emailRegex.test(id)) {
        //     setIdValidate(ValidateStatus.INVALID)
        //     isValidate = false;
        // }

        if (nickName.length < 4 || nickName.length > 16) {
            setNickNameValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
            isValidate = false;
        }

        if (password.length < 4) {
            setPasswordValidate(ValidateStatus.BELOW_REQUIRED_LENGTH)
            isValidate = false;
        }

        if (passwordCheck.length < 4) {
            setPasswordCheckValidate(ValidateStatus.BELOW_REQUIRED_LENGTH)
            isValidate = false;
        }

        if (password !== passwordCheck) {
            setPasswordCheckValidate(ValidateStatus.INVALID);
            isValidate = false;
        }

        return isValidate
    }, [nation, id, nickName, password, passwordCheck,
        idValidate, nationValidate, nickNameValidate, passwordValidate, passwordCheckValidate]);
    return {
        validate,
        nationValidate, setNationValidate,
        idValidate, setIdValidate,
        nickNameValidate, setNickNameValidate,
        passwordValidate, setPasswordValidate,
        passwordCheckValidate, setPasswordCheckValidate,
    }
}
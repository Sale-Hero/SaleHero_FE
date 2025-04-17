import {useCallback, useState} from "react";
import {ValidateStatus} from "../../../types/signup";
import {CommunityCategories} from "../../../types/community";

interface Args{
  title: string;
  content: string;
  category: CommunityCategories | "";
}

export function useCommunityValidator(
    {title, content, category}:Args) {


  const [titleValidate, setTitleValidate] = useState(ValidateStatus.NONE)
  const [contentValidate, setContentValidate] = useState(ValidateStatus.NONE)
  // eslint-disable-next-line max-len
  const [categoryValidate, setCategoryValidate] = useState(ValidateStatus.NONE)
  let isValidate = true

  const validate = useCallback(() => {

    if (title === '' || title.length>=100) {
      setTitleValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    if (content === '' || content.length>=300) {
      setContentValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    if (category === undefined) {
      setCategoryValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    return isValidate;
  }, [title, content, category, titleValidate, contentValidate, categoryValidate]);

  return {
    validate,
    titleValidate, setTitleValidate,
    contentValidate, setContentValidate,
    categoryValidate, setCategoryValidate
  }
}
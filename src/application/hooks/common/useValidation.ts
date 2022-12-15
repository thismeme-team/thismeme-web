interface ValidationProps {
  text: string;
  regularValidation: RegExp;
}

const useValidation = ({ text, regularValidation }: ValidationProps) => {
  //확장성을 고려하여 정규식을 props 로 받기
  const checkValidation = !regularValidation.test(text);

  return { checkValidation };
};
export default useValidation;

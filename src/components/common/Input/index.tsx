import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  endComponents?: ReactNode;
}

//FIX : forwardRef 적용(추후에 autofocus 등을 위해 ref 사용 고려) , 나중에 Form 추가 고려
export const InputBase = forwardRef(function InputBase(
  props: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { endComponents, ...rest } = props;

  return (
    <>
      <input {...rest} ref={ref} />
      {endComponents}
    </>
  );
});

import { clsx } from "clsx";
import type { FieldPath } from "react-hook-form";
import { useFormContext, useWatch } from "react-hook-form";

import type { MemeFormValues } from "@/pages/upload";

const MAX_TITLE_LENGTH = 24;
interface Props {
  name: FieldPath<MemeFormValues>;
}

export const TitleInput = (props: Props) => {
  const { register } = useFormContext<MemeFormValues>();
  const title = useWatch({ name: props.name });

  return (
    <label className="relative w-full px-16 text-18-semibold-140 leading-[160%]">
      <input
        placeholder=" "
        type="text"
        {...register(props.name, {
          required: true,
          maxLength: MAX_TITLE_LENGTH,
        })}
        className={clsx(
          "peer w-full border-b border-gray-200 px-4 pb-4 placeholder:text-gray-500 focus:border-primary-800 focus:outline-none",
          title && "[&:not(:focus)]:border-b-0",
        )}
      />
      <span className="pointer-events-none absolute inset-y-0 left-20 text-gray-500 peer-autofill:invisible peer-[:not(:placeholder-shown)]:invisible">
        제목 작성 <span className="text-secondary-700">*</span>
      </span>
      <p className="invisible flex justify-between px-4 peer-focus:visible">
        <span className="text-12-regular-160 text-gray-500">
          밈을 잘 설명할 수 있는 제목을 작성해주세요.
        </span>
        <span className="text-12-regular-160 text-gray-500">
          {title.length}/{MAX_TITLE_LENGTH}
        </span>
      </p>
    </label>
  );
};

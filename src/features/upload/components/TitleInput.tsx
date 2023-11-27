import { clsx } from "clsx";
import type { FieldPath } from "react-hook-form";
import { useFormContext, useWatch } from "react-hook-form";

import type { MemeFormValues } from "@/pages/upload";

const MAX_TITLE_LENGTH = 24;
interface Props {
  index: number;
  name: FieldPath<MemeFormValues>;
}

export const TitleInput = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<MemeFormValues>();
  const title = useWatch({ name: props.name });
  const maxLengthError = errors.memes?.[props.index]?.title?.type === "maxLength";

  return (
    <label className="relative w-full px-16 text-18-semibold-140 leading-[160%]">
      <input
        placeholder=" "
        type="text"
        {...register(props.name, {
          required: true,
          maxLength: {
            value: MAX_TITLE_LENGTH,
            message: `${MAX_TITLE_LENGTH}자 이하로 작성해주세요.`,
          },
        })}
        className={clsx(
          "peer w-full border-b px-4 pb-4 placeholder:text-gray-500 focus:outline-none",
          maxLengthError
            ? "border-secondary-800 focus:border-secondary-800"
            : "border-gray-200 focus:border-primary-800",
          !maxLengthError && title && "[&:not(:focus)]:border-b-0",
        )}
      />
      <span className="pointer-events-none absolute inset-y-0 left-20 text-gray-500 peer-autofill:invisible peer-[:not(:placeholder-shown)]:invisible">
        제목 작성 <span className="text-secondary-700">*</span>
      </span>
      <p
        className={clsx(
          "flex justify-between px-4 peer-focus:visible",
          maxLengthError ? "visible" : "invisible",
        )}
      >
        <span className="text-12-regular-160 text-gray-500">
          {maxLengthError ? (
            <>{errors.memes?.[props.index]?.title?.message}</>
          ) : (
            <>밈을 잘 설명할 수 있는 제목을 작성해주세요.</>
          )}
        </span>
        <span className="text-12-regular-160 text-gray-500">
          {title.length}/{MAX_TITLE_LENGTH}
        </span>
      </p>
    </label>
  );
};

import { normalizeProps, useMachine } from "@zag-js/react";
import * as tagsInput from "@zag-js/tags-input";
import { clsx } from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { FieldPath } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { Chip } from "@/common/components/Chip";
import { Icon } from "@/common/components/Icon";
import type { MemeFormValues } from "@/pages/upload";

const MAX_TAG_COUNT = 3;
const MAX_LENGTH = 11;
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  rightDecoration: ReactNode;
  description: string;
  name: FieldPath<MemeFormValues>;
}

export const TagsInput = (props: Props) => {
  const { setValue } = useFormContext<MemeFormValues>();
  const [state, send] = useMachine(
    tagsInput.machine({
      id: props.placeholder as string,
      max: MAX_TAG_COUNT,
      allowEditTag: false,
      maxLength: MAX_LENGTH,
      onValueChange(details) {
        // NOTE: 태그 중간에 띄어쓰기(space) 제거
        const value = details.value.map((value) => value.split(value).join());
        setValue(props.name, value, { shouldDirty: true });
      },
      validate(details) {
        // NOTE: 중복된 태그를 허용하지 않음
        return !details.value.includes(details.inputValue);
      },
    }),
  );

  const api = tagsInput.connect(state, send, normalizeProps);

  // TODO: 연관 태그 검색 API 연결

  return (
    <div className="px-16 text-16-semibold-140 leading-[160%]">
      <div className="flex w-full gap-8" {...api.rootProps}>
        <div className="flex w-198 flex-col">
          <div
            className={clsx(
              "w-full border-b border-gray-200 pb-4 data-[focus]:border-primary-800",
              api.isEmpty || "[&:not([data-focus])]:border-b-0",
            )}
            {...api.controlProps}
          >
            <div className="flex flex-wrap gap-8">
              {api.value.map((value, index) => (
                <span className="inline-block" key={index}>
                  <div
                    {...api.getItemProps({ index, value })}
                    className="flex items-center gap-8 whitespace-nowrap rounded-8 bg-gray-100 px-8 py-4 text-14-semibold-140 text-gray-700"
                  >
                    <span>{value}</span>
                    <button {...api.getItemDeleteTriggerProps({ index, value })}>
                      <Icon id="delete3" name="delete3" />
                    </button>
                  </div>
                </span>
              ))}
            </div>
            <input
              {...api.inputProps}
              className="ml-4 placeholder:text-gray-500 focus:outline-none"
              placeholder={api.isEmpty ? props.placeholder : ""}
              /**
               * TODO: 자동으로 포커스가 넘어가게 하는 거 구현
               * api.focus 함수 이용
               */
            />
          </div>
          <p className="text-12-regular-160 text-gray-500">{props.description}</p>
        </div>
        <span className="text-gray-500">{props.rightDecoration}</span>
      </div>

      <div css={{ height: "1.6rem" }} />
      {
        /**
         * TODO: 연관 태그 검색 결과
         */
        <Chip color="primary" label="박명수" />
      }
    </div>
  );
};

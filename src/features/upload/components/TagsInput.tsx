import { normalizeProps, useMachine } from "@zag-js/react";
import * as tagsInput from "@zag-js/tags-input";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";

import { Icon } from "@/common/components/Icon";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  word: string;
  description: string;
}

const borderStyle = {
  active: "border-primary-800",
  error: "border-secondary-800",
  normal: "border-gray-500",
};

export const TagsInput = (props: Props) => {
  const [focus, setFocus] = useState(false);
  const [state, send] = useMachine(
    tagsInput.machine({
      id: props.placeholder as string,
      max: 3,
      allowEditTag: false,
      validate(details) {
        return details.inputValue.length < 11;
      },
    }),
  );

  const api = tagsInput.connect(state, send, normalizeProps);
  const isValidInput = api.inputValue.length < 11;
  //TODO: 연관 검색 태그 api 연결

  return (
    <div className="px-16 text-16-semibold-140 leading-[160%]">
      <div className="flex">
        <div className="w-200" {...api.rootProps}>
          <div
            className={`flex overflow-x-auto border-b px-4 pb-4 ${
              !isValidInput ? borderStyle.error : focus ? borderStyle.active : borderStyle.normal
            }`}
          >
            <div className="flex gap-4">
              {api.value.map((value, index) => (
                <div
                  className="cursor-pointer rounded-8 bg-gray-100 p-8 text-14-semibold-140 text-gray-700"
                  key={index}
                >
                  <div
                    {...api.getItemProps({ index, value })}
                    className="flex gap-4 whitespace-nowrap"
                  >
                    <span>{value.trim()}</span>
                    <button {...api.getItemDeleteTriggerProps({ index, value })}>
                      <Icon id="delete3" name="delete3" />
                    </button>
                  </div>
                  <input {...api.getItemInputProps({ index, value })} />
                </div>
              ))}
            </div>
            <input
              {...api.inputProps}
              className="ml-4 placeholder:text-gray-500 focus:outline-none"
              placeholder={api.count ? "" : props.placeholder}
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
              /**
               * TODO: 자동으로 포커스가 넘어가게 하는 거 구현
               * api.focus 함수 이용
               */
            />
          </div>
        </div>
        <span className="text-gray-500 ">{props.word}</span>
      </div>
      <span className="text-12-regular-160 text-gray-500">
        {isValidInput ? props.description : "태그는 11자로 이내로 작성해주세요"}
      </span>
      {/**
       * 입력한 태그의 연관 검색 태그 리스트
       */}
    </div>
  );
};

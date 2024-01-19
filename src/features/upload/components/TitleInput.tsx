import { useState } from "react";

import { borderStyle } from "../styles";

export const TitleInput = () => {
  const [text, setText] = useState<string>("");
  const [focus, setFocus] = useState(false);

  const isValidInput = text.length < 24;
  const isFilled = !focus && text.length;

  return (
    <>
      <input
        maxLength={24}
        placeholder=" "
        type="text"
        value={text}
        className={`peer w-full border-b px-4 pb-4 placeholder:text-gray-500 focus:outline-none ${
          !isValidInput
            ? borderStyle.error
            : focus
            ? borderStyle.active
            : isFilled
            ? borderStyle.none
            : borderStyle.normal
        }`}
        onBlur={() => setFocus(false)}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setFocus(true)}
      />
      <div className="flex justify-between px-4">
        <span className="text-12-regular-160 text-gray-500">
          {isValidInput
            ? "밈을 잘 설명할 수 있는 제목을 작성해주세요."
            : "24자 미만으로 작성해주세요."}
        </span>
        <span className="text-12-regular-160 text-gray-500">{text.length}/24</span>
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-20 text-gray-500 peer-[:not(:placeholder-shown)]:opacity-0">
        제목 작성 <span className="text-secondary-700">*</span>
      </span>
    </>
  );
};

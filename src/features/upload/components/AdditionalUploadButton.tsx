import type { ComponentProps } from "react";

import { Icon } from "@/common/components/Icon";

const uploadButtonStyle = {
  focus: "focus:border-gray-100 focus:text-gray-600 [&_*]:focus:stroke-gray-600",
  hover: "hover:border-gray-100 hover:text-gray-600 [&_*]:hover:stroke-gray-600",
  active: "active:border-gray-400 active:text-gray-800 [&_*]:active:stroke-gray-800",
  disabled: "disabled:border-gray-400 disabled:text-gray-300 [&_*]:disabled:stroke-gray-300",
};
export const AdditionalUploadButton = ({ className, ...rest }: ComponentProps<"button">) => {
  return (
    <button
      {...rest}
      className={`flex w-fit gap-6 rounded-26 border border-gray-300 bg-white px-24 py-14 text-16-semibold-140 text-gray-700 ${Object.values(
        uploadButtonStyle,
      ).join(" ")} ${className}`}
    >
      <Icon className="h-24 w-24" name="memeShare" stroke="gray-700" />
      추가 업로드
    </button>
  );
};

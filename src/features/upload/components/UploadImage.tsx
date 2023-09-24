import type { ChangeEventHandler } from "react";

import { Icon } from "@/common/components/Icon";

interface Props {
  handleUploadImage?: ChangeEventHandler<HTMLInputElement>;
}
export const UploadImage = ({ handleUploadImage }: Props) => {
  /**
   * @todo 이미지 10mb 크기 조정
   */
  return (
    <div className="mx-16 flex aspect-square flex-col items-center justify-center gap-16 rounded-16 bg-gray-200">
      <input hidden id="image" type="file" onChange={handleUploadImage} />
      <label
        className="flex cursor-pointer items-center gap-6 rounded-26 bg-primary-700 px-24 py-14 text-16-semibold-140 text-white hover:bg-primary-500 focus:bg-primary-500 active:bg-primary-800"
        htmlFor="image"
      >
        <Icon height={24} name="memeShare" stroke="white" width={24} />
        업로드
      </label>
      <ul className="list-disc text-12-regular-160 text-gray-700">
        <li>jpg,jpeg,gif,png 이미지만 올릴 수 있어요.</li>
        <li>10MB 미만의 이미지를 권장해요.</li>
        <li>사이즈는 0:0 비율로 추천해요!</li>
      </ul>
    </div>
  );
};

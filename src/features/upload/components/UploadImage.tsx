import { useCallback, useRef, useState } from "react";

import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";

export const UploadImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>();

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);
  return image ? (
    <Photo alt="uploadedPhoto" className="my-24 rounded-16" height={100} src={image} width={200} />
  ) : (
    <section className="my-24 flex flex-col items-center justify-center gap-16 rounded-16 bg-gray-200 py-[9.8rem]">
      <Button
        className="gap-8 rounded-26 bg-primary-700 px-24 py-14 text-16-semibold-140 text-white hover:bg-primary-500 active:bg-primary-900"
        onClick={onUploadImageButtonClick}
      >
        <input
          accept="image/*"
          className="hidden"
          ref={inputRef}
          type="file"
          onChange={onUploadImage}
        />
        <Icon name="memeShare" stroke="white" />
        업로드
      </Button>
      <ul className="list-disc text-12-regular-160 text-gray-700">
        <li>jpg,jpeg,gif,png 이미지만 올릴 수 있어요.</li>
        <li>00MB 미만의 이미지를 권장해요.</li>
        <li>00MB 미만의 이미지를 권장해요.</li>
      </ul>
    </section>
  );
};

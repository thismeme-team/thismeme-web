import type { ChangeEventHandler, Dispatch, SetStateAction } from "react";

import { Icon } from "@/common/components/Icon";
import { useToast } from "@/common/hooks";
import { UploadImage } from "@/features/upload/components/UploadImage";
import { UploadMemeData } from "@/features/upload/components/UploadMemeData";
import type { MemeUploadFormData } from "@/types";

interface Props {
  onChange?: () => void;
  setMemeData: Dispatch<SetStateAction<MemeUploadFormData[]>>;
}

export const UploadInitialMeme = ({ onChange, setMemeData }: Props) => {
  const { show } = useToast();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) {
      return;
    }
    onChange?.();
    const length = e.target?.files?.length || 0;
    const imageArray = Array.from(e.target.files);

    imageArray.forEach((image, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        setMemeData((prevMemeData) => [
          ...prevMemeData,
          { index: index, image: reader.result, title: "", tags: [] },
        ]);
      };

      reader.readAsDataURL(image);
    });
    show(`${length > 1 ? "여러" : length}개의 밈을 선택했어요!`, {
      className: "mb-16 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]",
    });
  };
  return (
    <section className="relative">
      <button className="absolute top-16 left-16">
        <Icon color="gray-600" name="meatball" />
      </button>
      <div className="group w-full rounded-24 border bg-white pt-64 pb-16">
        <UploadImage onChange={handleChange} />
        <UploadMemeData />
      </div>
    </section>
  );
};

import type { NextPage } from "next";
import { useCallback, useRef } from "react";

import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { UploadPageNavigation } from "@/components/common/Navigation";

const UploadPage: NextPage = () => {
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) {
  //     return;
  //   }
  //   console.log(e.target.files[0].name);
  // }, []);

  // const onUploadImageButtonClick = useCallback(() => {
  //   if (!inputRef.current) {
  //     return;
  //   }
  //   inputRef.current.click();
  // }, []);

  return (
    <div className="min-h-[100dvh] w-[calc(100%+3.6rem)] -translate-x-[1.8rem] !bg-gray-100 px-18">
      <UploadPageNavigation />
      <div className="mt-16 h-screen rounded-24 bg-white p-16">
        <Icon color="gray-600" name="meatball" />
        <section className="my-24 flex flex-col items-center justify-center gap-16 rounded-16 bg-gray-200 py-[9.8rem]">
          <Button className="rounded-3 bg-primary-500 px-24 py-14 text-16-semibold-140 text-white">
            {/* <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={onUploadImage}/> */}
            <Icon name="memeShare" stroke="white" />
            업로드
          </Button>
          <ul className="list-disc text-12-regular-160 text-gray-700">
            <li>jpg,jpeg,gif,png 이미지만 올릴 수 있어요.</li>
            <li>00MB 미만의 이미지를 권장해요.</li>
            <li>00MB 미만의 이미지를 권장해요.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default UploadPage;

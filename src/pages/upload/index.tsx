import type { NextPage } from "next";

import { Icon } from "@/common/components/Icon";
import { UploadPageNavigation } from "@/common/components/Navigation";
import { UploadImage } from "@/features/upload/components";

const UploadPage: NextPage = () => {
  return (
    <div className="min-h-[100dvh] w-[calc(100%+3.6rem)] -translate-x-[1.8rem] !bg-gray-100 px-18">
      <UploadPageNavigation />
      <div className="mt-16 h-screen rounded-24 bg-white p-16">
        <Icon color="gray-600" name="meatball" />
        <UploadImage />
      </div>
    </div>
  );
};

export default UploadPage;

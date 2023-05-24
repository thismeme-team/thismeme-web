import Image from "next/image";

import { thismemeGuideUrl } from "@/application/util";

import { Button } from "../Button";

export const ServiceGuide = () => {
  const serviceGuide = "/img/serviceGuide.svg";

  return (
    <aside className="invisible fixed left-[5%] right-[17%] top-[20%] w-fit xl:visible xl:right-[40%]">
      <Image alt="serviceGuide" height={447} src={serviceGuide} width={880} />
      <Button
        as="a"
        className="absolute bottom-[16%] right-[8%] w-fit rounded-30 bg-[#6D7BFF] py-16 px-32 font-pretendard text-18-bold-140 font-semibold text-white"
        href={thismemeGuideUrl}
        rel="noreferrer"
        target="_blank"
      >
        앱으로 사용하고 싶다면?
      </Button>
    </aside>
  );
};

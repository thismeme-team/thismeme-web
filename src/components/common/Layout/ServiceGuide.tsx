import Image from "next/image";

import { thismemeGuideUrl } from "@/application/util";

import { Button } from "../Button";

export const ServiceGuide = () => {
  const serviceGuide = "/img/serviceGuide.svg";

  return (
    <div className="invisible fixed top-[41%] flex w-[calc((100%-44rem)/2)] justify-end pr-42 xl:visible">
      <div className="flex flex-col justify-end">
        <Image alt="serviceGuide" height={216} src={serviceGuide} width={360} />
        <Button
          as="a"
          className="absolute bottom-[-10%] right-0 mr-118 w-fit rounded-30 bg-[#6D7BFF] py-16 px-32 font-pretendard text-18-bold-140 font-semibold text-white"
          href={thismemeGuideUrl}
          rel="noreferrer"
          target="_blank"
        >
          앱으로 사용하고 싶다면?
        </Button>
      </div>
    </div>
  );
};

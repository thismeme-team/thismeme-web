import Image from "next/image";
import { css } from "twin.macro";

import { thismemeGuideUrl } from "@/application/util";

import { Button } from "../Button";

export const ServiceGuide = () => {
  const serviceGuide = "/img/serviceGuide.svg";

  return (
    <aside
      className="invisible fixed left-[3%] top-[41%] w-fit xl:visible"
      css={css`
        @media screen and (min-width: 1680px) {
          left: 12%;
        }
      `}
    >
      <Image alt="serviceGuide" height={400} src={serviceGuide} width={360} />
      <Button
        as="a"
        className="absolute bottom-[-10%] right-[20%] w-fit rounded-30 bg-[#6D7BFF] py-16 px-32 font-pretendard text-18-bold-140 font-semibold text-white"
        href={thismemeGuideUrl}
        rel="noreferrer"
        target="_blank"
      >
        앱으로 사용하고 싶다면?
      </Button>
    </aside>
  );
};

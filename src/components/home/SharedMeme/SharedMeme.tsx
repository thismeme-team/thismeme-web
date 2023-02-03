import Link from "next/link";
import { css } from "twin.macro";

import { Chip } from "@/components/common/Chip";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

export const SharedMeme = () => {
  return (
    <>
      <div className="my-16 flex justify-between font-suit text-22-bold-140">
        @nickname 이 공유했던 밈
        <Icon
          name="chevronDown"
          css={css`
            transform: rotate(-90deg);
          `}
        />
      </div>
      <div>
        <Photo
          unoptimized
          className="m-auto mb-8 rounded-15"
          height={44}
          src="https://picsum.photos/100/200"
          width={40}
        />
      </div>
      <section className="flex items-center justify-between font-suit text-18-bold-140">
        밈 제목
        <span className="flex items-center">
          00
          <Icon className="ml-8" name="memeShare" />
        </span>
      </section>
      <section className="flex">
        {["상위태그", "상위태그", "상위태그"].map((tag, i) => (
          <Link href={`explore/tags?q=${tag}`} key={i}>
            <Chip as="button" className="mt-8 mr-8" color="white" label={tag} size="medium" />
          </Link>
        ))}
      </section>
    </>
  );
};

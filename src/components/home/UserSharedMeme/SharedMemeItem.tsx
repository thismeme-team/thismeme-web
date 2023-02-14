import Link from "next/link";

import { PATH } from "@/application/util";
import { Chip } from "@/components/common/Chip";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

export const SharedMemeItem = () => {
  return (
    <li className="min-w-full snap-center">
      <Link href="/memes/1">
        <div>
          <Photo
            className="m-auto mb-8 rounded-15"
            height={44}
            src="https://picsum.photos/100/200"
            width={40}
          />
        </div>
        <section className="mb-8 flex items-center justify-between font-suit text-18-bold-140">
          밈 제목
          <span className="flex items-center">
            00
            <Icon className="ml-8" name="memeShare" />
          </span>
        </section>
      </Link>
      <ul className="flex gap-8 overflow-x-scroll">
        {["상위태그", "상위태그상위태그", "상위태그상위태그상위태그"].map((tag, i) => (
          <li className="shrink-0" key={i}>
            <Link href={`${PATH.getExploreByTagPath(tag)}`}>
              <Chip as="button" color="white" label={tag} size="medium" />
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

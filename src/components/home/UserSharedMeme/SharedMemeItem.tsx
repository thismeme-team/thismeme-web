import Link from "next/link";

import { PATH } from "@/application/util";
import { Chip } from "@/components/common/Chip";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
}

export const SharedMemeItem = ({ meme }: Props) => {
  return (
    <li className="min-w-full snap-center">
      <Link href={`/memes/${meme.memeId}`}>
        <div>
          <Photo
            className="m-auto mb-8 rounded-15"
            height={44}
            src={meme.image.images[0]?.imageUrl}
            width={40}
          />
        </div>
        <section className="mb-8 flex items-center justify-between font-suit text-18-bold-140">
          {meme.name}
          <span className="flex items-center gap-8 text-gray-600">
            <Icon className="ml-8" name="memeShare" />
            {meme.shareCount}
          </span>
        </section>
      </Link>
      <ul className="flex gap-8 overflow-x-scroll">
        {meme.tags?.map((tag, i) => (
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

import Link from "next/link";

import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/types";

import { SharedMemeTagList } from "./SharedMemeTagList";

interface Props {
  meme: Meme;
}

export const SharedMemeItem = ({ meme }: Props) => {
  return (
    <li className="min-w-[calc(100%-3.6rem)] snap-center">
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
      <SharedMemeTagList id={String(meme.memeId)} />
    </li>
  );
};

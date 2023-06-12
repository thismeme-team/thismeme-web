import Link from "next/link";

import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { SSRSuspense } from "@/common/components/Suspense";
import type { Meme } from "@/types";

import { SkeletonTagList } from "../Skeleton";
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
            className="m-auto mb-8 h-[40rem] w-full rounded-15"
            src={meme.image.images[0]?.imageUrl}
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
      <SSRSuspense fallback={<SkeletonTagList count={3} />}>
        <SharedMemeTagList id={String(meme.memeId)} />
      </SSRSuspense>
    </li>
  );
};

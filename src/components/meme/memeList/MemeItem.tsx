import Link from "next/link";
import type { LiHTMLAttributes } from "react";

import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

interface MemeItemProps extends LiHTMLAttributes<HTMLLIElement> {
  meme: any;
}
export const MemeItem = ({ meme }: MemeItemProps) => {
  return (
    <li>
      <Link className="mb-9 flex break-inside-avoid flex-col gap-6" href={`/meme/${meme.id}`}>
        <Photo className="rounded-15" src={meme.image_url} />
        <div className="flex items-center justify-between">
          <span className="text-12-bold-160">{meme.title}</span>
          <span className="flex items-center text-12-regular-160">
            <Icon name="memeShare" />
            {meme.share_count}
          </span>
        </div>
      </Link>
    </li>
  );
};

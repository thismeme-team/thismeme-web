import Link from "next/link";
import { css } from "twin.macro";

import { useGetUserSharedMemes } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";

import { SharedMemeItem } from "./SharedMemeItem";

interface Props {
  name?: string;
}
export const UserSharedMemeList = ({ name }: Props) => {
  const { data: memeList } = useGetUserSharedMemes();

  return (
    <div>
      <Link href="/share">
        <div className="bg-red- my-16 flex justify-between font-suit text-22-bold-140">
          {`@${name} 이 공유했던 밈`}
          <Icon
            height={32}
            name="chevronDown"
            width={32}
            css={css`
              transform: rotate(-90deg);
            `}
          />
        </div>
      </Link>
      <ul className="mb-24 flex w-[calc(100%+2rem)] snap-x snap-mandatory gap-10 overflow-x-scroll">
        {memeList.map((meme) => (
          <SharedMemeItem key={meme.memeId} meme={meme} />
        ))}
      </ul>
    </div>
  );
};

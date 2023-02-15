import { css } from "twin.macro";

import { Icon } from "@/components/common/Icon";

import { SharedMemeItem } from "./SharedMemeItem";

interface Props {
  name?: string;
}
export const SharedMemeList = ({ name }: Props) => {
  return (
    <div>
      <div className="flex justify-between py-16 font-suit text-22-bold-140">
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
      <ul className="mb-24 flex snap-x snap-mandatory gap-10 overflow-x-scroll">
        <SharedMemeItem />
        <SharedMemeItem />
        <SharedMemeItem />
      </ul>
    </div>
  );
};

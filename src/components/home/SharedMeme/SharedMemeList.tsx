import { css } from "twin.macro";

import { Icon } from "@/components/common/Icon";

import { SharedMemeItem } from "./SharedMemeItem";

interface Props {
  name?: string;
}
export const SharedMemeList = ({ name }: Props) => {
  return (
    <div>
      <div className="my-16 flex justify-between font-suit text-22-bold-140">
        {`@${name} 이 공유했던 밈`}
        <Icon
          name="chevronDown"
          css={css`
            transform: rotate(-90deg);
          `}
        />
      </div>
      <ul className="mb-24 flex overflow-x-scroll">
        <SharedMemeItem />
        <SharedMemeItem />
        <SharedMemeItem />
      </ul>
    </div>
  );
};

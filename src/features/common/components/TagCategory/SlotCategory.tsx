import { keyframes } from "@emotion/react";
import { useMemo } from "react";
import { css } from "twin.macro";

import type { Tag } from "@/infra/api/tags/types";

const categoryName: { [key: string]: string } = {
  "OOO이 사용하는 밈": "이(가) 사용하는 밈",
  "OOO을 느낄 때": "을(를) 느낄 때",
  "OOO할 때": "",
};

const ANIMATION_DURATION = 1000;

interface Props {
  tags: Pick<Tag, "tagId" | "name">[];
  name: string;
  open: boolean;
}

export const SlotCategory = ({ tags, name, open }: Props) => {
  const animationTags = useMemo(() => [...tags, tags[0]], [tags]);
  const slider = useMemo(() => getSliderStyle(tags.length), [tags]);

  return (
    <div className="flex">
      <div className={`flex ${open ? "absolute opacity-0" : ""}`}>
        <div className="h-22 w-fit overflow-hidden text-16-semibold-140">
          <span
            css={css`
              height: ${tags.length * 100}%;
              animation: ${slider} ${ANIMATION_DURATION * tags.length}ms linear infinite;
              display: flex;
              flex-direction: column;
            `}
          >
            {animationTags.map((tag, index) => (
              <div className="h-22" key={`${tag.tagId}-${index}`}>
                {tag.name}
              </div>
            ))}
          </span>
        </div>
      </div>

      {open ? name : categoryName[name]}
    </div>
  );
};

function getSliderStyle(length: number) {
  const offset = 100 / length;
  return keyframes(
    Array.from(Array(length))
      .map(
        (_, idx) => `${offset * (idx + 0.5)}% {transform: translateY(-${offset * (idx + 1)}%);} 
          ${offset * (idx + 1)}% {transform: translateY(-${offset * (idx + 1)}%);}`,
      )
      .join(""),
  );
}

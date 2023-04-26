import { keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { css } from "twin.macro";

import type { Tag } from "@/infra/api/tags/types";

const categoryName = {
  사용자: "이(가) 찾는 밈",
  감정: "을(를) 느낄 때",
  행위: "",
};

const ANIMATION_DURATION = 1000;

interface Props {
  tags: Pick<Tag, "tagId" | "name">[];
  name: string;
}

type OpenType = "open" | "closed";

export const SlotCategory = ({ tags, name }: Props) => {
  const animationTags = [...tags, tags[0]];
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<OpenType>("closed");

  useEffect(() => {
    const parent = ref.current?.closest("[data-state]") as HTMLElement;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-state") {
          const mutatedParent = mutation.target as HTMLElement;
          const currentState = mutatedParent.dataset.state;
          setIsOpen(currentState as OpenType);
        }
      });
    });

    observer.observe(parent, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const offset = 100 / tags.length;
  const rotate = keyframes(
    tags
      .map(
        (tag, idx) =>
          `${offset * (idx + 0.5)}% {transform: translateY(-${offset * (idx + 1)}%);} 
          ${offset * (idx + 1)}% {transform: translateY(-${offset * (idx + 1)}%);}`,
      )
      .join(""),
  );

  return (
    <div className="flex" ref={ref}>
      <div className={`flex ${isOpen === "open" ? "absolute opacity-0" : ""}`}>
        <div className="h-22 w-fit overflow-hidden text-16-semibold-140">
          <span
            css={css`
              height: ${tags.length * 100}%;
              animation: ${rotate} ${ANIMATION_DURATION * tags.length}ms linear infinite;
              display: flex;
              flex-direction: column;
            `}
          >
            {animationTags.map((tag) => (
              <div className="h-22" key={tag.tagId}>
                {tag.name}
              </div>
            ))}
          </span>
        </div>
      </div>

      <div className={`flex ${isOpen === "closed" ? "absolute opacity-0" : ""}`}>
        <span>OOO</span>
        {name === "행위" && <span>할때</span>}
      </div>
      <span>{categoryName[name as keyof typeof categoryName]}</span>
    </div>
  );
};

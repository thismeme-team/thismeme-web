import { keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { css } from "twin.macro";

import type { Tag } from "@/infra/api/tags/types";

const categoryName = {
  사용자: "가 찾는 밈",
  감정: "를 느낄 때",
  행위: "",
};

const ANIMATION_DURATION = 800;

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

  const rotate = keyframes`
    100% {
      transform: translateY(-100%);
    }
  `;

  return (
    <div className="flex" ref={ref}>
      {isOpen === "closed" ? (
        <div className="flex">
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
                <div key={tag.tagId}>{tag.name}</div>
              ))}
            </span>
          </div>
        </div>
      ) : (
        <>
          <span>ooo</span>
          {name === "행위" && <span>할때</span>}
        </>
      )}
      <span>{categoryName[name as keyof typeof categoryName]}</span>
    </div>
  );
};

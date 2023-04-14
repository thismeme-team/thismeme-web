import { keyframes } from "@emotion/react";
import { css } from "twin.macro";

import type { Tag } from "@/infra/api/tags/types";

interface Props {
  tags: Pick<Tag, "tagId" | "name" | "viewCount">[];
  name: string;
}

export const SlotCateogry = ({ tags, name }: Props) => {
  const rotate = keyframes`
    
        0%{
            transform: translateY(0);
        }
    
        25%{
            transform: translateY(-20%);
        }
    
        50%{
            transform: translateY(-40%);
        }
    
        75%{
            transform: translateY(-60%);
        }
    
        100%{
            transform: translateY(-80%);
        }
    
    `;

  return (
    <div className="flex">
      <div className="h-22 w-fit overflow-hidden text-16-semibold-140">
        <span
          css={css`
            height: ${tags.length * 100}%;
            animation: ${rotate} 4s linear infinite;
            display: flex;
            flex-direction: column;
          `}
        >
          {tags.map((tag) => (
            <span key={tag.tagId}>{tag.name}</span>
          ))}
        </span>
      </div>
      <span>{name.substring(3)}</span>
    </div>
  );
};

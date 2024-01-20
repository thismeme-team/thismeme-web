import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import { css } from "twin.macro";

import { useScrollDirection } from "@/common/hooks";
import { TagCategory } from "@/features/common";
import { SearchInput } from "@/features/search/components";

import { BackButton } from "../BackButton";

const DELAY = 300;

interface Props {
  searchValue?: string;
  isBack?: boolean;
}

export const SearchHeader = ({ searchValue, isBack = true }: Props) => {
  const direction = useScrollDirection();
  const router = useRouter();

  return (
    <section
      className={`sticky z-10 flex items-center gap-7 bg-white transition-[top] ${
        direction === "DOWN" ? "top-54" : "top-0"
      }`}
    >
      <div className="flex w-full">
        {isBack && (
          <CSSTransition mountOnEnter unmountOnExit in={direction === "UP"} timeout={DELAY}>
            <BackButton
              css={css`
                &.enter-done,
                &.enter-active {
                  max-width: 50px;
                  padding-right: 0.8rem;
                }
                transition: max-width ${DELAY}ms ease, padding ${DELAY}ms ease;
                max-width: 0;
              `}
            />
          </CSSTransition>
        )}

        <SearchInput
          readOnly
          className="ga-search-bar-click"
          inputMode="none"
          isDelete={false}
          placeholder={"당신이 생각한 '그 밈' 검색하기"}
          value={searchValue}
          onClick={() => {
            router.push("/search");
          }}
        />
      </div>

      <TagCategory topOffset={direction === "UP" ? "8.8rem" : "14.2rem"} />
    </section>
  );
};

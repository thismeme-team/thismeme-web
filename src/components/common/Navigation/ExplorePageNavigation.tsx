import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import tw, { css } from "twin.macro";

import { useScrollDirection } from "@/application/hooks";
import { BackButton } from "@/components/common/Navigation/BackButton";
import { Logo } from "@/components/common/Navigation/Logo";
import { SearchInput } from "@/components/search";
import { TagCategory } from "@/components/tags";

import { Navigation } from "./Navigation";
import { SideBar } from "./SideBar";

const DELAY = 300;

interface Props {
  title?: string;
}

export const ExplorePageNavigation = ({ title }: Props) => {
  const router = useRouter();
  const direction = useScrollDirection();
  return (
    <>
      <Navigation>
        <Navigation.Left>
          <Logo />
        </Navigation.Left>
        <Navigation.Right>
          <SideBar />
        </Navigation.Right>
      </Navigation>
      <section
        className={`sticky z-10 flex items-center gap-7 bg-white transition-[top] ${
          direction === "DOWN" ? "top-54" : "top-0"
        }`}
      >
        <div className="flex w-full">
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

          <SearchInput
            css={tw`placeholder:text-gray-900`}
            inputMode="none"
            placeholder={title}
            onClick={() => {
              router.push("/search");
            }}
          />
        </div>

        <TagCategory topOffset={direction === "UP" ? "8.8rem" : "14.2rem"} />
      </section>
    </>
  );
};

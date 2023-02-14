import { useDrag } from "@use-gesture/react";
import type { PropsWithChildren } from "react";
import { useRef, useState } from "react";
import { css } from "twin.macro";

import { delay } from "@/application/util";

import { RefreshContent } from "./RefreshContent";
import { getScrollParent, getScrollTop } from "./utils";

interface Props {
  completeDelay?: number;
  headHeight?: number;
  threshold?: number;
  disabled?: boolean;
}

type PullStatus = "pulling" | "canRelease" | "refreshing" | "complete";

//https://codesandbox.io/s/pulltorefresh-b0mi3p?from-embed=&file=/src/pullToRefresh/PullToRefresh.tsx

export const PullToRefresh = ({
  headHeight = 54,
  threshold = 60,
  disabled = false,
  completeDelay = 500,
  children,
}: PropsWithChildren<Props>) => {
  const [status, setStatus] = useState<PullStatus>("pulling");
  const elementRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pullingRef = useRef(false);

  const setContentTopOffset = (offset: number) => {
    contentRef.current!.style.transform = `translateY(${offset}px)`;
  };

  const slide = (height: number, { cb, threshold }: { cb?: () => void; threshold?: number }) => {
    requestAnimationFrame(function animate() {
      const currentHeight =
        contentRef.current!.getBoundingClientRect().top - contentRef.current!.offsetTop;

      const decreasing = threshold ?? currentHeight - height > 20 ? 5 : 1;
      if (currentHeight > height) {
        setContentTopOffset(currentHeight - decreasing);
        requestAnimationFrame(animate);
      } else if (currentHeight <= height) cb?.();
    });
  };

  const doRefresh = () => {
    setStatus("refreshing");
    slide(headHeight, {
      cb: async () => {
        await delay(1000);

        // TODO refresh 로직 처리
        setStatus("complete");
        await delay(completeDelay);

        setStatus("pulling");
        slide(0, { threshold: 2 });
      },
    });
  };

  //https://mobile.ant.design/components/pull-to-refresh

  useDrag(
    (state) => {
      if (status === "refreshing" || status === "complete") return;

      const { event } = state;

      if (state.last) {
        pullingRef.current = false;
        if (status === "canRelease") {
          doRefresh();
        } else {
          slide(0, { threshold: 2 });
        }
        return;
      }

      const [, y] = state.movement;
      // 첫 이벤트 시점에 pullToRefresh 발동이 가능한지 체크한다.
      // 스크롤이 최상단에 존재해야만(scrollTop=0) pullToRefresh 의 발동 조건이다.
      if (state.first && y > 0) {
        const { target } = state.event;
        if (!target || !(target instanceof Element)) return;

        let scrollParent = getScrollParent(target);
        while (true) {
          // for 중첩 스크롤 영역
          if (!scrollParent) return;
          const scrollTop = getScrollTop(scrollParent);
          if (scrollTop > 0) return;
          if (scrollParent instanceof Window) break;

          scrollParent = getScrollParent(scrollParent.parentNode as Element);
        }
        pullingRef.current = true;
      }

      if (!pullingRef.current) return;

      if (event.cancelable) {
        event.preventDefault();
      }
      event.stopPropagation();

      if (y < headHeight) {
        setContentTopOffset(y);
      } else {
        setContentTopOffset(headHeight + (y - headHeight) * 0.25);
      }
      setStatus(y > threshold ? "canRelease" : "pulling");
    },
    {
      pointer: { touch: true },
      axis: "y",
      target: elementRef,
      enabled: !disabled,
      eventOptions: { passive: false },
    },
  );

  return (
    <div className="overscroll-y-contain" ref={elementRef}>
      <div
        css={css`
          padding-top: 0.8rem;
          height: ${headHeight}px;
          position: absolute;
          top: 5.4rem;
          inset-inline: 0;
        `}
      >
        {status !== "pulling" && <RefreshContent />}
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

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

  const slide = (height: number, options?: { threshold: number }) => {
    const offsetTop = contentRef.current!.offsetTop;
    let prevHeight = contentRef.current!.getBoundingClientRect().top - offsetTop;
    const decreasing = options?.threshold ?? prevHeight - height > 20 ? 5 : 1;

    return new Promise<void>((res) =>
      requestAnimationFrame(function animate() {
        const currentHeight = prevHeight;

        if (currentHeight > height) {
          prevHeight = currentHeight - decreasing;
          setContentTopOffset(currentHeight - decreasing);
          requestAnimationFrame(animate);
        } else res();
      }),
    );
  };

  const doRefresh = async () => {
    setStatus("refreshing");
    await slide(headHeight);
    await delay(1000);

    setStatus("complete");

    await delay(completeDelay);

    setStatus("pulling");
    await slide(0, { threshold: 2 }).then(() => {
      /**
       * TODO
       * - Refresh 로직(ex - 페이지 reload)
       */
      location.reload();
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
          height: ${headHeight}px;
          position: absolute;
          top: 14.2rem;
          inset-inline: 0;
        `}
      >
        {status !== "pulling" && <RefreshContent />}
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

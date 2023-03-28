import { useEffect, useRef, useState } from "react";

import { throttle } from "@/application/util";

const SCROLL_DIRECTION = {
  up: "UP",
  down: "DOWN",
} as const;
type DIRECTION = typeof SCROLL_DIRECTION[keyof typeof SCROLL_DIRECTION];

const OFFSET = 100;
const DELAY = 200;
export const useScrollDirection = () => {
  const prevScrollY = useRef(0);
  const [direction, setDirection] = useState<DIRECTION>(SCROLL_DIRECTION.up);
  console.log({ direction });
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      console.log({ currentScrollY, prevScrollY: prevScrollY.current });
      if (currentScrollY > prevScrollY.current + OFFSET) {
        // 위로 스크롤하는 중
        setDirection(SCROLL_DIRECTION.up);
      } else if (currentScrollY < prevScrollY.current - OFFSET) {
        // 아래로 스크롤하는 중
        setDirection(SCROLL_DIRECTION.down);
      }
      prevScrollY.current = currentScrollY;
    }, DELAY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return direction;
};

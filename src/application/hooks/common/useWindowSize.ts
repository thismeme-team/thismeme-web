import { useEffect, useState } from "react";

interface Size {
  width: number;
  height: number;
}
export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

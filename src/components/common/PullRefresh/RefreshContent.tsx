import lottie from "lottie-web";
import { useEffect, useRef } from "react";

import refresh from "./refresh.json";

export const RefreshContent = () => {
  const logoContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshAnimation: any = lottie.loadAnimation({
      container: logoContainer.current as HTMLDivElement,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: refresh,
    });
  }, []);

  return (
    <div className="m-auto w-60">
      <div className="w-60" ref={logoContainer} />
    </div>
  );
};

import lottie from "lottie-web";
import { useEffect, useRef } from "react";

import refresh from "./refresh.json";

export const RefreshContent = () => {
  const logoContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refreshAnimation = lottie.loadAnimation({
      container: logoContainer.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: refresh,
    });

    return () => {
      refreshAnimation?.destroy();
    };
  }, []);

  return (
    <div>
      <div className="m-auto h-80 w-80" ref={logoContainer} />
    </div>
  );
};

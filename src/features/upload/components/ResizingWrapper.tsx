import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const WrapperContext = createContext(1000);
const useWrapperContext = () => useContext(WrapperContext);

interface Props {
  focus?: boolean;
}

export const ResizingWrapper = ({ focus, children }: PropsWithChildren<Props>) => {
  const [height, setHeight] = useState(1000);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focus) {
      ref.current?.focus();
    }
  }, [focus]);

  return (
    <WrapperContext.Provider value={height}>
      <div
        ref={ref}
        // eslint-disable-next-line react/jsx-sort-props
        onPointerDown={(e) => {
          if (!e.currentTarget) return;
          e.currentTarget.focus({ preventScroll: true });
          const h = e.currentTarget.getBoundingClientRect().height;
          if (h === 0) return;
          setHeight(h);
        }}
        className="group relative w-full rounded-24 border bg-white pb-16 pt-64 focus-within:border-primary-500 focus:outline-none"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {children}
      </div>
    </WrapperContext.Provider>
  );
};

const Hidden = ({ children }: PropsWithChildren) => {
  const height = useWrapperContext();

  return (
    <div
      className="max-h-[100rem] overflow-hidden transition-[max-height] duration-500 ease-in-out group-[:not(:focus-within)]:max-h-0"
      css={{ maxHeight: height / 10 + "rem" }}
    >
      {children}
    </div>
  );
};
ResizingWrapper.Hidden = Hidden;

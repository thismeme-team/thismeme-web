import { useContext, useEffect, useMemo, useRef, useState } from "react";

import type { OverlayControlRef } from "./OverlayController";
import { OverlayController } from "./OverlayController";
import { OverlayContext } from "./OverlayProvider";
import type { CreateOverlayElement } from "./types";

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
}

export function useOverlay({ exitOnUnmount = true }: Options = {}) {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error("useOverlay is only available within OverlayProvider.");
  }

  const { mount, unmount } = context;
  const [id] = useState(() => String(elementId++));

  const overlayRef = useRef<OverlayControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            // NOTE: state should be reset every time we open an overlay
            key={Date.now()}
            overlayElement={overlayElement}
            ref={overlayRef}
            onExit={() => {
              unmount(id);
            }}
          />,
        );
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        unmount(id);
      },
    }),
    [id, mount, unmount],
  );
}

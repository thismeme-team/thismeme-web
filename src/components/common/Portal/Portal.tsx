import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { useIsMount } from "@/application/hooks";

interface Props {
  id: string;
}
export const Portal = ({ id, children }: PropsWithChildren<Props>) => {
  const isMount = useIsMount();
  if (!isMount) return null;

  let root = document.getElementById(id);
  if (!root) {
    root = document.createElement("div");
    root.id = id;

    document.body.prepend(root);
  }

  return createPortal(<>{children}</>, root);
};

import { IS_CSR } from "@/common/utils";

type ScrollElement = HTMLElement | Window;
const defaultRoot = IS_CSR ? window : null;
const overflowStylePatterns = ["scroll", "auto", "overlay"];

const isElement = (node: Element) => {
  const ELEMENT_NODE_TYPE = 1;
  return node.nodeType === ELEMENT_NODE_TYPE;
};

export const getScrollParent = (
  el: Element | null,
  root: ScrollElement | null | undefined = defaultRoot,
): Window | Element | null | undefined => {
  if (!el) {
    return root;
  }

  let node = el;
  while (node && node !== root && isElement(node)) {
    if (node === document.body) {
      return root;
    }
    const styles = IS_CSR ? window.getComputedStyle(node) : { overflowY: "" };
    const overflowY = styles.overflowY;
    if (overflowStylePatterns.includes(overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentNode as Element;
  }
  return root;
};

export const getScrollTop = (element: Window | Element) => {
  return "scrollTop" in element ? element.scrollTop : element.scrollY;
};

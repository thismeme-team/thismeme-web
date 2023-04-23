import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

const MARK_KEY = "scroll-locker-key";
const UNIQUE_ID = `key-${Date.now()}`;

let uuid = 0;

export const useScrollLocker = (lock?: boolean) => {
  const mergedLock = !!lock;
  const [id] = useState(() => {
    uuid += 1;
    return `${UNIQUE_ID}_${uuid}`;
  });

  useIsomorphicLayoutEffect(() => {
    if (mergedLock) {
      updateCSS(
        `
      html body {
        overflow-y: hidden;
      }`,
        id,
      );
    } else {
      removeCSS(id);
    }

    return () => {
      removeCSS(id);
    };
  }, [mergedLock, id]);
};

const updateCSS = (css: string, key: string) => {
  const container = getContainer();
  const existNode = findExistNode(key);

  if (existNode) {
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }

    return existNode;
  }

  if (!canUseDom()) {
    return null;
  }
  const newNode = document.createElement("style");
  newNode.innerHTML = css;
  container.appendChild(newNode);
  newNode.setAttribute(MARK_KEY, key);
  return newNode;
};

const removeCSS = (key: string) => {
  const existNode = findExistNode(key);
  if (existNode) {
    const container = getContainer();
    container.removeChild(existNode);
  }
};

const getContainer = () => {
  const head = document.querySelector("head");
  return head || document.body;
};

const canUseDom = () => {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
};

const findExistNode = (key: string) => {
  const container = getContainer();

  return findStyles(container).find((node) => node.getAttribute(MARK_KEY) === key);
};

const findStyles = (container: Element | ShadowRoot) => {
  return Array.from(container.children).filter(
    (node) => node.tagName === "STYLE",
  ) as HTMLStyleElement[];
};

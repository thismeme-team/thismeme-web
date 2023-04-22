import { useLayoutEffect, useState } from "react";

const UNIQUE_ID = `scroll-locker-${Date.now()}`;

let uuid = 0;

export const useScrollLocker = (lock?: boolean) => {
  const mergedLock = !!lock;
  const [id] = useState(() => {
    uuid += 1;
    return `${UNIQUE_ID}_${uuid}`;
  });

  useLayoutEffect(() => {
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

const MARK_KEY = `drawer-key`;

const updateCSS = (css: string, key: string) => {
  const container = getContainer();
  const existNode = findExistNode(key);

  if (existNode) {
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }

    return existNode;
  }

  const newNode = document.createElement("style");
  newNode.innerHTML = css;
  container.appendChild(newNode);
  newNode.setAttribute(getMark(), key);
  return newNode;
};
export function removeCSS(key: string) {
  const existNode = findExistNode(key);
  if (existNode) {
    const container = getContainer();
    container.removeChild(existNode);
  }
}

const canUseDom = () => {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
};

function getContainer() {
  const head = document.querySelector("head");
  return head || document.body;
}

function findExistNode(key: string) {
  const container = getContainer();

  return findStyles(container).find((node) => node.getAttribute(getMark()) === key);
}

function findStyles(container: Element | ShadowRoot) {
  return Array.from(container.children).filter(
    (node) => node.tagName === "STYLE",
  ) as HTMLStyleElement[];
}

function getMark({ mark }: { mark?: string } = {}) {
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}

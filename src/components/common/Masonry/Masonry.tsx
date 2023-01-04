import type { ComponentPropsWithoutRef, ElementType } from "react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import tw from "twin.macro";

export const parseToNumber = (val: string) => {
  return Number(val.replace("px", ""));
};

type Props<T extends ElementType> = {
  as?: T;
  spacing?: number;
  columns?: number;
  defaultColumns?: number;
  defaultSpacing?: number;
  defaultHeight?: number;
} & ComponentPropsWithoutRef<T>;

export const Masonry = <T extends ElementType = "div">({
  as,
  children,
  spacing = 8,
  columns = 4,
  defaultSpacing,
  defaultColumns,
  defaultHeight,
  className = "",
  ...rest
}: Props<T>) => {
  const [maxColumnHeight, setMaxColumnHeight] = useState<number>();
  const isSSR =
    !maxColumnHeight &&
    defaultHeight &&
    defaultColumns !== undefined &&
    defaultSpacing !== undefined;
  const [numberOfLineBreaks, setNumberOfLineBreaks] = useState(isSSR ? defaultColumns - 1 : 0);
  const masonryRef = useRef<HTMLElement>();

  const handleResize = (masonryChildren: ResizeObserverEntry[]) => {
    if (
      !masonryRef.current ||
      !masonryRef.current.firstChild ||
      !masonryChildren ||
      masonryChildren.length === 0
    ) {
      return;
    }
    const masonry = masonryRef.current;
    const masonryFirstChild = masonryRef.current.firstChild as Element;
    const parentWidth = masonry.clientWidth;
    const firstChildWidth = masonryFirstChild.clientWidth;

    if (parentWidth === 0 || firstChildWidth === 0) {
      return;
    }
    const firstChildComputedStyle = window.getComputedStyle(masonryFirstChild);
    const firstChildMarginLeft = parseToNumber(firstChildComputedStyle.marginLeft);
    const firstChildMarginRight = parseToNumber(firstChildComputedStyle.marginRight);

    const currentNumberOfColumns = Math.round(
      parentWidth / (firstChildWidth + firstChildMarginLeft + firstChildMarginRight),
    );

    const columnHeights = new Array(currentNumberOfColumns).fill(0);
    let skip = false;
    (masonry.childNodes as NodeListOf<HTMLElement>).forEach((child) => {
      if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === "line-break" || skip) {
        return;
      }
      const childComputedStyle = window.getComputedStyle(child);
      const childMarginTop = parseToNumber(childComputedStyle.marginTop);
      const childMarginBottom = parseToNumber(childComputedStyle.marginBottom);

      // if any one of children isn't rendered yet, masonry's height shouldn't be computed yet
      const childHeight = parseToNumber(childComputedStyle.height)
        ? Math.ceil(parseToNumber(childComputedStyle.height)) + childMarginTop + childMarginBottom
        : 0;
      if (childHeight === 0) {
        skip = true;
        return;
      }

      // if there is a nested image that isn't rendered yet, masonry's height shouldn't be computed yet
      for (let i = 0; i < child.childNodes.length; i += 1) {
        const nestedChild = child.childNodes[i] as Element;
        if (nestedChild.tagName === "IMG" && nestedChild.clientHeight === 0) {
          skip = true;
          break;
        }
      }
      if (!skip) {
        // find the current shortest column (where the current item will be placed)
        const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columnHeights[currentMinColumnIndex] += childHeight;
        const order = currentMinColumnIndex + 1;
        child.style.order = String(order);
      }
    });
    if (!skip) {
      flushSync(() => {
        setMaxColumnHeight(Math.max(...columnHeights));
        setNumberOfLineBreaks(currentNumberOfColumns > 0 ? currentNumberOfColumns - 1 : 0);
      });
    }
  };
  const observer = useRef(
    typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(handleResize),
  );

  useEffect(() => {
    const resizeObserver = observer.current;
    // IE and old browsers are not supported
    if (resizeObserver === undefined) {
      return undefined;
    }

    if (masonryRef.current) {
      (masonryRef.current.childNodes as NodeListOf<HTMLElement>).forEach((childNode) => {
        resizeObserver.observe(childNode);
      });
    }

    return () => resizeObserver.disconnect();
  }, [children]);

  const lineBreaks = new Array(numberOfLineBreaks)
    .fill("")
    .map((_, index) => (
      <span
        data-class="line-break"
        key={index}
        style={{ margin: 0, width: 0, flexFlow: "column wrap", padding: 0, order: index + 1 }}
      />
    ));

  const MasonryRoot = as || ("div" as ElementType);

  return (
    <MasonryRoot
      ref={masonryRef}
      css={[
        tw`box-border flex w-full flex-col flex-wrap content-start`,
        {
          ...(maxColumnHeight && { height: maxColumnHeight }),
          margin: `calc(0px - (${spacing} / 2))`,
          "& > *": {
            margin: `calc(${spacing}px / 2)`,
            width: `calc(${(100 / columns).toFixed(2)}% - ${spacing}px)`,
          },
        },
      ]}
      {...rest}
    >
      {children}
      {lineBreaks}
    </MasonryRoot>
  );
};

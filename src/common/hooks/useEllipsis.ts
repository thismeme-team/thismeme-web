import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  lineClamp: number;
  expanded?: boolean;
}

export const useEllipsis = <T extends HTMLElement = HTMLParagraphElement>({
  lineClamp,
  expanded,
}: Props) => {
  const ref = useRef<T>(null);
  const [isExpanded, setIsExpanded] = useState(expanded);

  const ellipsisStyle = `line-clamp-${lineClamp}`;

  if (ref.current) {
    ref.current.classList.toggle(ellipsisStyle, !isExpanded);
  }

  useLayoutEffect(() => {
    if (ref.current && !expanded) ref.current.classList.add(ellipsisStyle);
  }, [ellipsisStyle, expanded]);

  const onToggle = () => setIsExpanded((prev) => !prev);

  return { ref, onToggle, isExpanded };
};

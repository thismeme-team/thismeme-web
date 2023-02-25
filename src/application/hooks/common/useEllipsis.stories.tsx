import { useEllipsis } from "@/application/hooks";
import { Button } from "@/components/common/Button";

export default {
  title: "hooks/common/useEllipsis",
  component: null,
};

const LONG_TEXT = "엄청 긴 문자열 ".repeat(20);

export const Default = (args: Parameters<typeof useEllipsis>[0]) => {
  const { ref, isExpanded, onToggle } = useEllipsis(args);
  return (
    <>
      <p ref={ref}>{LONG_TEXT}</p>
      <Button className="border border-black line-clamp-1" size="medium" onClick={onToggle}>
        {isExpanded ? "닫기" : "더보기"}
      </Button>
    </>
  );
};

Default.args = {
  lineClamp: 1,
  expanded: false,
};

import { useClipboard } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  target: string;
  onSuccess?: () => void;
}
export const ClipboardCopyButton = ({ target, onSuccess }: Props) => {
  const { writeText } = useClipboard();
  const handleClick = () => writeText(target, { onSuccess });

  return (
    <Button className="flex h-50 w-50 gap-8 rounded-10 bg-gray-900" onClick={handleClick}>
      <Icon color="white" name="share" />
    </Button>
  );
};

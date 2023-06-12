import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";
import { useClipboard } from "@/common/hooks";

interface Props {
  target: string;
  onSuccess?: () => void;
}
export const ClipboardCopyButton = ({ target, onSuccess }: Props) => {
  const { writeText } = useClipboard();
  const handleClick = () => writeText(target, { onSuccess });

  return (
    <Button
      className="ga-meme-item-add-link-share-click h-50 w-50 gap-8 rounded-10 bg-gray-900 hover:bg-black active:bg-black"
      onClick={handleClick}
    >
      <Icon fill="white" name="share" />
    </Button>
  );
};

import { useClipboard } from "@/application/hooks";
import { IconButton } from "@/components/common/Button";

interface Props {
  target: string;
  onSuccess?: () => void;
}
export const ClipboardCopyButton = ({ target, onSuccess }: Props) => {
  const { writeText } = useClipboard();
  const handleClick = () => writeText(target, { onSuccess });

  return (
    <IconButton
      as="li"
      className="bg-light-gray-10"
      icon="share"
      size="medium"
      onClick={handleClick}
    />
  );
};

import { useToast } from "@/application/hooks";
import { clipboard } from "@/application/util";
import { IconButton } from "@/components/common/Button";

interface Props {
  target: string;
}
export const ClipboardCopyButton = ({ target }: Props) => {
  const { show } = useToast();
  const handleClick = () =>
    clipboard.writeText(target).then(() => show("링크를 복사했습니다", { icon: "share" }));

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

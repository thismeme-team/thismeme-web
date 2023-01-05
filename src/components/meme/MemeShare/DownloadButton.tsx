import { IconButton } from "@/components/common/Button";

interface Props {
  onSuccess?: () => void;
}
export const DownloadButton = ({ onSuccess }: Props) => {
  return (
    <IconButton
      as="li"
      className="bg-light-gray-10"
      icon="download"
      size="medium"
      onClick={() => {
        // 다운로드 로직..
        onSuccess?.();
      }}
    />
  );
};

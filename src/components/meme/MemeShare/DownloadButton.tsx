import { useDownload } from "@/application/hooks";
import { IconButton } from "@/components/common/Button";

interface Props {
  target: string;
  name?: string;
  onSuccess?: () => void;
}

export const DownloadButton = ({ target, name = "download", onSuccess }: Props) => {
  const { download } = useDownload();
  return (
    <IconButton
      as="li"
      className="bg-light-gray-10"
      icon="download"
      size="medium"
      onClick={() => {
        download({ target, name, onSuccess });
      }}
    />
  );
};

import type { KakaoShareOptions } from "@/application/hooks/domain/share";
import { useKakaoShare } from "@/application/hooks/domain/share";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  onSuccess?: () => void;
  resource: KakaoShareOptions;
}
export const KakaoShareButton = ({ onSuccess, resource }: Props) => {
  const { share } = useKakaoShare();
  return (
    <Button
      className="flex h-50 w-50 gap-8 rounded-10 bg-gray-900"
      onClick={() => {
        share(resource);
        onSuccess?.();
      }}
    >
      <Icon name="whiteKakao" />
    </Button>
  );
};

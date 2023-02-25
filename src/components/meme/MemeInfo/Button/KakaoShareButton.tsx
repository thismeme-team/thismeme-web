import type { KakaoShareOptions } from "@/application/hooks/domain/share";
import { useKakaoShare } from "@/application/hooks/domain/share";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  resource: Omit<KakaoShareOptions, "onSuccess" | "onError">;
  onSuccess?: () => void;
  onError?: () => void;
}
export const KakaoShareButton = ({ resource, onSuccess, onError }: Props) => {
  const { share } = useKakaoShare();
  return (
    <Button
      className="flex h-50 w-50 gap-8 rounded-10 bg-gray-900"
      onClick={() => {
        share({ ...resource, onSuccess, onError });
      }}
    >
      <Icon name="whiteKakao" />
    </Button>
  );
};

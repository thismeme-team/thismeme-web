import type { KakaoShareOptions } from "@/application/hooks/domain/share";
import { useKakaoShare } from "@/application/hooks/domain/share";
import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";

interface Props {
  resource: Omit<KakaoShareOptions, "onSuccess" | "onError">;
  onSuccess?: () => void;
  onError?: () => void;
}
export const KakaoShareButton = ({ resource, onSuccess, onError }: Props) => {
  const { share } = useKakaoShare();
  return (
    <Button
      className="ga-meme-item-add-kakao-share-click h-50 w-50 gap-8 rounded-10 bg-gray-900 hover:bg-black active:bg-black"
      onClick={() => {
        share({ ...resource, onSuccess, onError });
      }}
    >
      <Icon name="whiteKakao" />
    </Button>
  );
};

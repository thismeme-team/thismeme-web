import type { KakaoShareOptions } from "@/application/hooks";
import { useKakaoShare } from "@/application/hooks";
import { IconButton } from "@/components/common/Button";

interface Props {
  onSuccess?: () => void;
  resource: KakaoShareOptions;
}
export const KakaoShareButton = ({ onSuccess, resource }: Props) => {
  const { share } = useKakaoShare();
  return (
    <IconButton
      as="li"
      className="bg-[#FFE812]"
      icon="kakao"
      size="medium"
      onClick={() => {
        // 카카오 공유 로직
        share(resource);
        onSuccess?.();
      }}
    />
  );
};

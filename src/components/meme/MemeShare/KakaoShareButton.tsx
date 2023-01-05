import { IconButton } from "@/components/common/Button";

interface Props {
  onSuccess?: () => void;
  target: string;
}
export const KakaoShareButton = ({ onSuccess }: Props) => {
  return (
    <IconButton
      as="li"
      className="bg-[#FFE812]"
      icon="kakao"
      size="medium"
      onClick={() => {
        // 카카오 공유 로직
        onSuccess?.();
      }}
    />
  );
};

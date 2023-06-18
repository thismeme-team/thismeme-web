import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";

interface Props {
  title: string;
  text: string;
  url: string;
  onSuccess?: () => void;
  onError?: () => void;
}
export const NativeShareButton = ({ title, text, url, onSuccess, onError }: Props) => {
  /**
   * @todo navigator.share undefined error
   *
   * share API가 지원되는 브라우저 환경이 제한되어있음
   * - localhost
   * - https (http는 제한)
   *
   * pc chrome에서 테스트 시 chrome://flags/#web-share enabled 필요
   */

  const handleClick = () => {
    if (!navigator.share) {
      onError?.();
      return;
    }
    navigator.share({ title, text, url }).then(onSuccess);
  };

  return (
    <Button
      className="ga-meme-item-add-other-share-click h-50 w-50 gap-8 rounded-10 bg-gray-900 hover:bg-black active:bg-black"
      onClick={handleClick}
    >
      <Icon color="white" name="meatball" />
    </Button>
  );
};

import { useAuth, useModal, useToast } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { SignUpModal } from "@/components/common/Modal";

interface Props {
  onClick?: () => void;
}
export const CollectionSaveButton = ({ onClick }: Props) => {
  const { isLogin } = useAuth();
  const modalProps = useModal();
  const { show } = useToast();

  const handleCollectionClick = () => {
    /**
     * TODO
     * 콜렉션 저장 mutate 호출
     */

    show("콜렉션에 저장했습니다!");
  };

  if (!isLogin) {
    return (
      <>
        <Button
          className="flex h-52 w-full items-center gap-8 rounded-10 bg-gray-900"
          onClick={modalProps.onOpen}
        >
          <Icon name="collection" />
          <span className="font-suit text-16-semibold-140 text-white">콜렉션에 저장</span>
        </Button>
        <SignUpModal {...modalProps} />
      </>
    );
  }
  return (
    <Button
      className="flex h-52 w-full items-center gap-8 rounded-10 bg-gray-900"
      onClick={handleCollectionClick}
    >
      <Icon name="collection" />
      <span className="font-suit text-16-semibold-140 text-white">콜렉션에 저장</span>
    </Button>
  );
};

import { useAuth, useCollection, useModal } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { SignUpModal } from "@/components/common/Modal";
import { MemeShareModal } from "@/components/meme/MemeInfo/Modal";

interface Props {
  id: string;
}

export const MemeCTAList = ({ id }: Props) => {
  const { isLogin } = useAuth();
  const memeShareModalProps = useModal();
  const signUpModalProps = useModal();
  const { isAdded, onUpdateCollection } = useCollection({ memeId: Number(id) });

  return (
    <div className="flex w-full gap-10 py-40">
      <Button
        className="h-52 w-52 shrink-0 rounded-10 bg-gray-900"
        onClick={memeShareModalProps.onOpen}
      >
        <Icon color="stroke-white" name="memeShare" />
      </Button>
      <MemeShareModal id={id} {...memeShareModalProps} />

      <Button
        className={`flex h-52 w-full items-center gap-8 rounded-10 ${
          isAdded ? "bg-gray-300" : "bg-gray-900"
        }`}
        onClick={isLogin ? onUpdateCollection : signUpModalProps.onOpen}
      >
        <Icon
          className={`${isAdded ? "[&_*]:fill-gray-800" : "[&_*]:fill-secondary-1000"}`}
          name="collection"
        />
        <span
          className={`font-suit text-16-semibold-140 ${isAdded ? "text-gray-800" : "text-white"}`}
        >
          콜렉션에 저장
        </span>
      </Button>
      <SignUpModal {...signUpModalProps} />
    </div>
  );
};

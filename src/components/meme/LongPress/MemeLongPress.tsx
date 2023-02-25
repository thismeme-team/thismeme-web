import {
  useAuthValidation,
  useCollection,
  usePostMemeToSharedCollection,
  useToast,
} from "@/application/hooks";
import { ActionSheet } from "@/components/common/ActionSheet";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
  onClose: () => void;
  isOpen: boolean;
}
export const MemeLongPress = ({ meme, onClose, isOpen }: Props) => {
  const { show } = useToast();
  const { validate, isLogin, user } = useAuthValidation();
  const { onUpdateCollection } = useCollection({ memeId: meme.memeId, isLogin });
  const { mutate: postMemeToSharedCollection } = usePostMemeToSharedCollection({
    memeId: meme.memeId,
    sharedId: user?.sharedCollectionId as number,
  });

  const name = meme?.name || "";
  const description = meme?.description || "";
  const url = meme?.image?.images[0].imageUrl || "";

  const handleNaviteShare = async () => {
    if (!navigator.share) return show("공유하기가 지원되지 않는 브라우저 입니다");
    await navigator
      .share({ title: name, text: description, url })
      .then(validate(postMemeToSharedCollection, { needSignUpModal: false }));
  };
  return (
    <ActionSheet isOpen={isOpen}>
      <ActionSheet.Button
        onClick={() => {
          onClose();
          validate(onUpdateCollection)();
        }}
      >
        콜렉션에 저장하기
      </ActionSheet.Button>
      <ActionSheet.Button
        onClick={() => {
          onClose();
          handleNaviteShare();
        }}
      >
        공유하기
      </ActionSheet.Button>
      <ActionSheet.Button css={{ color: "#eb4e3d" }} onClick={onClose}>
        취소하기
      </ActionSheet.Button>
    </ActionSheet>
  );
};

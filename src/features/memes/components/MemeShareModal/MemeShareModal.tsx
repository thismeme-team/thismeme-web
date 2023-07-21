import { usePostMemeToSharedCollection } from "@/api/collection";
import { useGetMemeDetailById } from "@/api/meme";
import { Modal } from "@/common/components/Modal";
import { Photo } from "@/common/components/Photo";
import { useToast } from "@/common/hooks";
import { DOMAIN, PATH } from "@/common/utils";
import { useAuth } from "@/features/common";

import { ClipboardCopyButton } from "./ClipboardCopyButton";
import { KakaoShareButton } from "./KakaoShareButton";
import { NativeShareButton } from "./NativeShareButton";

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}
export const MemeShareModal = ({ id, isOpen, onClose }: Props) => {
  const { show } = useToast();
  const { validate, user } = useAuth();
  const pageUrl = `${DOMAIN}${PATH.getMemeDetailPage(Number(id))}`;

  const {
    name,
    description,
    image: { images },
  } = useGetMemeDetailById(id);

  const src = images[0].imageUrl;

  const { mutate: postMemeToSharedCollection } = usePostMemeToSharedCollection({
    memeId: Number(id),
    sharedId: user?.sharedCollectionId as number,
  });

  const showClipboardCopyToast = () => show("밈을 담아서 링크를 복사했어요 :)");
  const showNativeShareErrorToast = () => show("공유하기가 지원되지 않습니다.");

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header />
      <Photo className="my-24 h-300 w-300 rounded-15" src={src} />
      <ul className="mx-auto mb-32 flex h-77 w-fit gap-16 whitespace-nowrap text-gray-600">
        <li className="relative flex flex-col items-center gap-8">
          <KakaoShareButton
            resource={{
              url: pageUrl,
              imageUrl: src,
              title: name,
              description,
            }}
            onSuccess={validate(postMemeToSharedCollection, { needSignUpModal: false })}
          />
          <span className="absolute bottom-0 font-suit text-12-bold-160">카카오로 공유</span>
        </li>
        <li className="relative flex flex-col items-center gap-8">
          <ClipboardCopyButton
            target={pageUrl}
            onSuccess={() => {
              onClose();
              showClipboardCopyToast();
              validate(postMemeToSharedCollection, { needSignUpModal: false })();
            }}
          />
          <span className="absolute bottom-0 font-suit text-12-bold-160">링크 복사</span>
        </li>
        <li className="relative flex flex-col items-center gap-8">
          <NativeShareButton
            text={description}
            title={name}
            url={pageUrl}
            onSuccess={validate(postMemeToSharedCollection, { needSignUpModal: false })}
            onError={() => {
              onClose();
              showNativeShareErrorToast();
            }}
          />
          <span className="absolute bottom-0 font-suit text-12-bold-160">다른 앱 공유</span>
        </li>
      </ul>
    </Modal>
  );
};

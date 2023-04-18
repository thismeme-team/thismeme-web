import { useAuth, useToast } from "@/application/hooks";
import { usePostMemeToSharedCollection } from "@/application/hooks/api/collection";
import { DOMAIN, PATH } from "@/application/util";
import { Modal } from "@/components/common/Modal";
import { Photo } from "@/components/common/Photo";
import {
  ClipboardCopyButton,
  KakaoShareButton,
  NativeShareButton,
} from "@/components/meme/MemeInfo/Button";
import type { Meme } from "@/types";

interface Props {
  id: string;
  meme: Meme;
  isOpen: boolean;
  onClose: () => void;
}
export const MemeShareModal = ({ id, meme, isOpen, onClose }: Props) => {
  const { show } = useToast();
  const { validate, user } = useAuth();
  const pageUrl = `${DOMAIN}${PATH.getMemeDetailPage(Number(id))}`;

  const {
    name,
    description,
    image: { images },
  } = meme;
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

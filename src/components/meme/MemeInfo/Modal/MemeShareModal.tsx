import { useMemeDetailById, useToast } from "@/application/hooks";
import { PAGE_URL } from "@/application/util";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Modal } from "@/components/common/Modal";
import { Photo } from "@/components/common/Photo";
import {
  ClipboardCopyButton,
  KakaoShareButton,
  NativeShareButton,
} from "@/components/meme/MemeInfo/Button";

interface Props {
  id: string;
}
export const MemeShareModal = ({ id }: Props) => {
  const { show } = useToast();

  const {
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);

  const src = images[0].imageUrl;

  const showClipboardCopyToast = () => show("링크를 복사했습니다!");

  return (
    <Modal>
      <Modal.Trigger>
        <Button className="h-52 w-52 shrink-0 rounded-10 bg-gray-900">
          <Icon color="stroke-white" name="memeShare" />
        </Button>
      </Modal.Trigger>
      <Modal.Header />
      <Modal.Content>
        {({ onClose }) => (
          <>
            <Photo className="h-187 w-300 py-24" src={src} />
            <ul className="mx-auto mb-32 flex h-77 w-fit gap-16 whitespace-nowrap text-gray-600">
              <li className="relative flex flex-col items-center gap-8">
                <KakaoShareButton
                  resource={{
                    url: PAGE_URL,
                    imageUrl: src,
                    title: name,
                    description,
                  }}
                />
                <span className="absolute bottom-0 font-suit text-12-bold-160">카카오로 공유</span>
              </li>
              <li className="relative flex flex-col items-center gap-8">
                <ClipboardCopyButton
                  target={PAGE_URL}
                  onSuccess={() => {
                    onClose();
                    showClipboardCopyToast();
                  }}
                />
                <span className="absolute bottom-0 font-suit text-12-bold-160">링크 복사</span>
              </li>
              <li className="relative flex flex-col items-center gap-8">
                <NativeShareButton text={description} title={name} url={PAGE_URL} />
                <span className="absolute bottom-0 font-suit text-12-bold-160">다른 앱 공유</span>
              </li>
            </ul>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

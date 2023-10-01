import { Modal } from "../../Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * TODO
 * 업로드 기능 완성 후 제거
 */
export const UploadModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header />
      <section className="mx-auto flex flex-col py-24 text-gray-900">
        <h3 className="mb-16 px-33 text-22-bold-140">밈 업로드에 관심있는 당신!</h3>
        <p className="px-26 text-center text-16-regular-140">
          그밈 팀은 업로드 기능을 준비 중이에요!
          <br />
          <br />
          이메일을 남겨주시면
          <br />
          업로드 기능이 완성되었을 때
          <br />
          미리 체험할 수 있도록 알려드릴게요.
          <br />
        </p>
      </section>
      <Modal.Footer className="flex h-66 text-18-bold-140">
        <button className="flex-1 bg-gray-400 text-white" onClick={onClose}>
          사람 잘못 보셨
        </button>
        <a
          className="flex h-full flex-1 items-center justify-center border-black bg-black text-white"
          href="https://forms.gle/Dt2qVYV562trURPi6"
          rel="noreferrer"
          target="_blank"
        >
          좋아요
        </a>
      </Modal.Footer>
    </Modal>
  );
};

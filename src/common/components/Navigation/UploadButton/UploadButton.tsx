import { useOverlay } from "@/common/hooks";

import { UploadModal } from "./UploadModal";

export const UploadButton = () => {
  const overlay = useOverlay();
  const handleClick = () => {
    /**
     * TODO
     * 업로드 기능 완료 후,
     * 1. 업로드 페이지로 이동하는 버튼으로 변경
     * 2. UploadModal 삭제
     */
    overlay.open(({ isOpen, close }) => <UploadModal open={isOpen} onClose={close} />);
  };

  return (
    <button
      className="rounded-20 bg-primary-700 px-16 py-8 text-14-semibold-140 text-white"
      onClick={handleClick}
    >
      업로드
    </button>
  );
};

import { UploadNavigation } from "@/common/components/Navigation";
import {
  AdditionalUploadButton,
  UploadInitialMeme,
  UploadMeme,
} from "@/features/upload/components";

const UploadPage = () => {
  /**
   * @todo 밈 입력폼 상태관리
   */

  return (
    <>
      <UploadNavigation />
      <div className="flex flex-col gap-16 pt-16 pb-60">
        <UploadInitialMeme />
        <UploadMeme isFocus src="https://picsum.photos/200/100" />
        <UploadMeme src="https://picsum.photos/200/150" />
        <UploadMeme src="https://picsum.photos/200/150" />
        <AdditionalUploadButton className="mx-auto" />
      </div>
    </>
  );
};

export default UploadPage;

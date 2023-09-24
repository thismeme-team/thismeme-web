import { UploadNavigation } from "@/common/components/Navigation";
import { UploadInitialForm, UploadMeme } from "@/features/upload/components";

const UploadPage = () => {
  /**
   * @todo 밈 입력폼 상태관리
   */
  return (
    <>
      <UploadNavigation />
      <div className="flex flex-col gap-16 pt-16 pb-60">
        <UploadInitialForm />
        <UploadMeme />
      </div>
    </>
  );
};

export default UploadPage;

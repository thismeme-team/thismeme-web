import { useRouter } from "next/router";

import { PATH } from "@/common/utils";
import { useAuth } from "@/features/common";

export const UploadButton = () => {
  const { validate } = useAuth();
  const { push } = useRouter();
  const handleClick = validate(() => {
    push(PATH.getUploadPage());
  });
  return (
    <button
      className="rounded-20 bg-primary-700 px-16 py-8 text-14-semibold-140 text-white"
      onClick={handleClick}
    >
      업로드
    </button>
  );
};

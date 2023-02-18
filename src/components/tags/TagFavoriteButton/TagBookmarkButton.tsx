import { useState } from "react";

import { useToast } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

export const TagBookmarkButton = () => {
  /**
   * FIX
   * 태그 즐겨찾기 api 연동
   */
  const [isSuccess, setIsSuccess] = useState(false);
  const { show } = useToast();
  const handleSaveBookmark = () => {
    // TODO Save Mutation
    setIsSuccess(true);
    show("즐겨찾기에 추가했습니다.");
  };

  const handleDeleteBookmark = () => {
    // TODO Delete Mutation
    setIsSuccess(false);

    show("즐겨찾기에서 해제했습니다.");
  };

  return (
    <label className="fixed bottom-32 right-18 text-center">
      <input checked={isSuccess} className="peer hidden" type="checkbox" />
      <Button
        className="mb-3 flex h-60 w-60 items-center justify-center rounded-full bg-gray-700 focus:bg-black peer-checked:bg-primary-300"
        id="bookmark"
        onClick={isSuccess ? handleDeleteBookmark : handleSaveBookmark}
      >
        <Icon height={30} name="star" width={30} />
      </Button>
      <span className="text-12-bold-160 text-gray-700 peer-checked:text-gray-600 peer-focus:text-black ">
        {isSuccess ? "북마크 완료!" : "태그 북마크"}
      </span>
    </label>
  );
};

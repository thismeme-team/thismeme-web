import { useState } from "react";

import { useToast } from "@/application/hooks";
import { AuthValidateHandler } from "@/hocs/auth";

import { TagBookmarkButtonView } from "./TagBookmarkButtonView";

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
    <AuthValidateHandler handler={["onClick"]}>
      <TagBookmarkButtonView
        checked={isSuccess}
        onClick={isSuccess ? handleDeleteBookmark : handleSaveBookmark}
      />
    </AuthValidateHandler>
  );
};

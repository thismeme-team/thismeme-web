import { useState } from "react";

import { Button } from "@/components/common/Button";

export const TagFavoriteButton = () => {
  /**
   * FIX
   * 태그 즐겨찾기 api 연동
   */
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <Button
      className={`fixed bottom-32 right-18 rounded-full p-13 font-tossface text-4xl ${
        isSuccess ? "bg-primary-300" : "bg-gray-700"
      }`}
      onClick={() => {
        if (isSuccess) return;
        setIsSuccess(true);
        alert("태그 즐겨찾기 성공(임시)");
      }}
    >
      ⭐️
    </Button>
  );
};

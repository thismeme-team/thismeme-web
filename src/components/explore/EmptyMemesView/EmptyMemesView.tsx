import Link from "next/link";

import { RandomImage } from "@/components/common/RandomImge";

export const EmptyMemesView = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center font-suit">
      <span className="flex items-center text-32-bold-140">
        당신이 찾는{" "}
        <Link href="/">
          <RandomImage className="h-32 w-32 rounded-8" />
        </Link>
        은
      </span>
      <span className="text-32-bold-140">아직 없나봐요</span>
      <span className="mt-24 text-center text-16-semibold-140 text-gray-600">
        다른 키워드로 검색하거나
        <br />
        밈의 바다에서 서핑해보세요!
      </span>
    </div>
  );
};

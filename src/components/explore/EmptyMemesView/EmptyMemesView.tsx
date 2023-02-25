import Link from "next/link";

import { RandomImage } from "@/components/common/RandomImge";

export const EmptyMemesView = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-y-2/4 -translate-x-2/4 flex-col items-center justify-center font-suit">
      <span className="whitespace-nowrap text-32-bold-140">
        당신이 찾는{" "}
        <Link href="/">
          <RandomImage className="-mb-[calc(1.4em-3.2rem)/2] inline-block h-32 w-32 rounded-8" />
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

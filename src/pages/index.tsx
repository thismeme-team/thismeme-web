import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { IntroNavigation } from "@/components/common/Navigation/Navigation.stories";
import { Photo } from "@/components/common/Photo";
import { PopularMemeList, PopularTagList } from "@/components/home";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <IntroNavigation />
      <Photo className="m-auto my-10 h-190 w-230 overflow-visible" src="/img/brandimage.png" />
      <SearchInput
        placeholder="당신이 찾는 밈 여기 있다."
        onClick={() => {
          router.push("/search");
        }}
      />

      <div className="mt-60 mb-13 text-center text-16-regular-130">인기검색어</div>
      <Suspense fallback={<div className="text-20-bold-140">loading</div>}>
        <ul className="flex flex-row flex-wrap justify-center px-36">
          <PopularTagList />
        </ul>
      </Suspense>
      <div className="text-center text-20-bold-140">어쩌면 당신이 찾았을 밈</div>
      <PopularMemeList />
    </>
  );
};

export default HomePage;

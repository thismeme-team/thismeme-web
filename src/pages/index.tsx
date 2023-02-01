import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { IntroNavigation } from "@/components/common/Navigation/Navigation.stories";
import { PopularMemeList, PopularTagList } from "@/components/home";
import { ShareMeme } from "@/components/home/ShareMeme/ShareMeme";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <IntroNavigation />
      <section className="mt-16">
        <SearchInput
          placeholder="당신이 찾는 밈 여기 있다."
          onClick={() => {
            router.push("/search");
          }}
        />
      </section>
      <Suspense fallback={<div className="text-20-bold-140">loading</div>}>
        <ul className="flex overflow-x-visible pt-8 pb-40 ">
          <PopularTagList />
        </ul>
      </Suspense>
      <ShareMeme />
      <div className="text-center text-20-bold-140">어쩌면 당신이 찾았을 밈</div>
      <PopularMemeList />
    </>
  );
};

export default HomePage;

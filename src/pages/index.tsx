import type { NextPage } from "next";
import { useRouter } from "next/router";

import { IntroPageNavigation } from "@/components/common/Navigation";
import { MemeList, PopularTagList, SharedMeme } from "@/components/home";
import { MemeSortDropDown } from "@/components/home/DropDown";
import { SearchInput } from "@/components/search";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <IntroPageNavigation />
      <section className="pt-16" />
      <SearchInput
        placeholder="당신이 찾는 밈 여기 있다."
        onClick={() => {
          router.push("/search");
        }}
      />
      <ul className="flex overflow-x-visible pt-8 pb-40">
        <PopularTagList />
      </ul>
      <SharedMeme />
      <MemeSortDropDown />
      <MemeList />
    </>
  );
};

export default HomePage;

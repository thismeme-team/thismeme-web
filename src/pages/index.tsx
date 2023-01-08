import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { Navigation } from "@/components/common/Navigation";
import { HomePopular } from "@/components/home";
import { SearchInput } from "@/components/search";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Navigation page="intro" />
      <Image
        priority
        alt="brandimage"
        className="m-auto my-10 h-auto w-auto"
        height={190}
        src="/img/brandimage.png"
        width={230}
      />
      <SearchInput
        placeholder="당신이 찾는 밈 여기 있다."
        onClick={() => {
          router.push("/search");
        }}
      />

      <div className="mt-60 mb-13 text-center text-16-regular-130">인기검색어</div>
      <Suspense fallback={<div className="text-20-bold-140">loading</div>}>
        <ul className="flex flex-row flex-wrap justify-center px-36">
          <HomePopular />
        </ul>
      </Suspense>
      <div className="text-center text-20-bold-140">어쩌면 당신이 찾았을 밈</div>
    </>
  );
};

export default Home;

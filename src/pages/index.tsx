import type { Post } from "mocks/types";
import type { NextPage } from "next";

import Chip from "@/components/common/Chip";
import Navigation from "@/components/common/Navigation";
import { PostItem } from "@/components/common/PostList/PostItem";
import SearchInput from "@/components/search/SearchInput";

type HomeProps = {
  posts: Post[];
};
const Home: NextPage<HomeProps> = ({ posts }) => {
  const handleLogin = () => {
    // Client-side request are mocked by `mocks/browser.ts`.
    fetch("/login", { method: "POST" })
      .then((res) => res.json())
      .then((user) => alert(`성공 !\n${user.nickname}, ${user.email}`));
  };
  return (
    <div>
      <Navigation page="intro" />
      <Navigation page="search" />
      <Navigation page="result" />
      test test
      <span>test</span>
      <SearchInput placeholder="ex) 네비게이션 검색바 테스트" />
      <button onClick={handleLogin}>Login(Click Me)</button>
      <div className="text-header">tailwindcss 테스트입니다.</div>
      <div className="text-title">tailwindcss 테스트입니다.</div>
      <div className="text-tag">tailwindcss 테스트입니다.</div>
      <div className="text-regular">tailwindcss 테스트입니다.</div>
      <div className="text-semi-bold">tailwindcss 테스트입니다.</div>
      <div className="text-label">tailwindcss 테스트입니다.</div>
      <div className="text-sm">tailwindcss 테스트입니다.</div>
      <div className="flex gap-2">
        <div className="h-10 w-10 bg-light-gray-10"></div>
        <div className="h-10 w-10 bg-light-gray-20"></div>
        <div className="h-10 w-10 bg-light-gray-30"></div>
        <div className="h-10 w-10 bg-gray-10"></div>
        <div className="h-10 w-10 bg-gray-20"></div>
        <div className="h-10 w-10 bg-dark-gray-10"></div>
        <div className="h-10 w-10 bg-dark-gray-20"></div>
        <div className="h-10 w-10 bg-black"></div>
        <div className="h-10 w-10 bg-brand"></div>
        <div className="h-10 w-10 bg-bookmark"></div>
      </div>
      {posts && (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}
      <Chip
        label="무한도전"
        type="recent"
        size="medium"
        onClick={() => {
          console.log(2);
        }}
      />
    </div>
  );
};

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.ts`.
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Home;

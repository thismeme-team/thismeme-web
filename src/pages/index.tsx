import type { Post } from "mocks/types";
import type { NextPage } from "next";

import { PostItem } from "@/components/common/PostList/PostItem";

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
      <div className="border bg-green-200 p-4">tailwindcss 테스트입니다.</div>
      <div className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        tailwindcss 테스트입니다.
      </div>
      <button onClick={handleLogin}>Login(Click Me)</button>
      {posts && (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
            // <li key={post.id}>
            //   <h1 className="font-bold">{post.title}</h1>
            //   <p>{post.body}</p>
            // </li>
          ))}
        </ul>
      )}
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

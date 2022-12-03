import { useEffect, useState } from "react";

import { PostItem } from "./PostItem";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
function useFetchPostList() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    setStatus("loading");

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setStatus("success");
        setData(data);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return {
    status,
    data,
  };
}

export const PostList = () => {
  const { status, data: posts } = useFetchPostList();

  if (status === "loading") {
    return <p>Fetching Star Wars data...</p>;
  }

  if (status === "error") {
    return <p>Could not fetch Star Wars data</p>;
  }
  return (
    <ul className="grid grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

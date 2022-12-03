interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
interface PostItemProps {
  post: Post;
}
export const PostItem = ({ post }: PostItemProps) => {
  return (
    <li className="rounded-lg border-2 border-[#c7d2fe] bg-[#e0e7ff] px-5 py-3 leading-5">
      <h4 className="mt-0 mb-2 text-2xl text-[#1e40af]">{post.title}</h4>
      <p>{post.body}</p>
    </li>
  );
};

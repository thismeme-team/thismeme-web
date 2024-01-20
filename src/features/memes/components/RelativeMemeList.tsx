import { useGetMemesBySort } from "@/api/meme";
import { InfiniteMemeList, useAuth } from "@/features/common";

export const RelativeMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetMemesBySort("popular");
  const { user } = useAuth();

  return (
    <>
      <h2 className="py-16 font-suit text-22-bold-140">
        {user?.name ? `${user.name} ` : "당신"}이 찾는 연관 밈
      </h2>
      <InfiniteMemeList
        memeList={memeList}
        onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
      />
    </>
  );
};

import { Skeleton } from "@/components/common/Skeleton";
import { SkeletonMemeTagList } from "@/components/meme";

export const SkeletonMemeDetail = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        className="mt-16 mb-40 rounded-20"
        height="40rem"
        variant="rectangular"
        width="100%"
      />
      <Skeleton
        animation="wave"
        as="div"
        className="my-16 rounded-10"
        height="3.08rem"
        variant="rectangular"
        width="20rem"
      />
      <Skeleton
        animation="wave"
        as="div"
        className="my-8 rounded-10"
        height="1.6rem"
        variant="rectangular"
        width="100%"
      />
      <Skeleton
        animation="wave"
        as="div"
        className="my-8 rounded-10"
        height="1.6rem"
        variant="rectangular"
        width="100%"
      />
      <SkeletonMemeTagList />
    </>
  );
};

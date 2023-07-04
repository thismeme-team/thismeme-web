import { Skeleton } from "@/common/components/Skeleton";
import { SkeletonTagList } from "@/components/home/Skeleton";

export const SkeletonMemeTagList = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        as="div"
        className="mb-16 mt-32 rounded-10"
        height="3.08rem"
        variant="rectangular"
        width="10rem"
      />
      <SkeletonTagList count={3} />
    </>
  );
};

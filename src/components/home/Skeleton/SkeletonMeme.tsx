import { Skeleton } from "@/components/common/Skeleton";

export const SkeletonMeme = () => {
  return (
    <Skeleton
      animation="wave"
      as="div"
      style={{ width: "100%", height: "40rem", borderRadius: "2rem" }}
      variant="rectangular"
    />
  );
};

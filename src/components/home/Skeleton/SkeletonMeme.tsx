import { Skeleton } from "@/components/common/Skeleton";

import { SkeletonTagList } from "./SkeletonTagList";

export const SkeletonMeme = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        as="div"
        variant="rectangular"
        style={{
          width: "100%",
          fontSize: "2.2rem",
          borderRadius: "2rem",
          marginBottom: "1.6rem",
        }}
      />
      <Skeleton
        animation="wave"
        as="div"
        style={{ width: "100%", height: "34rem", borderRadius: "2rem", marginBottom: "1rem" }}
        variant="rectangular"
      />
      <div className="flex justify-between gap-20">
        <Skeleton
          animation="wave"
          as="div"
          style={{ width: "50%", borderRadius: "2rem", marginBottom: "1rem", fontSize: "1.8rem" }}
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          as="div"
          style={{ width: "50%", borderRadius: "2rem", marginBottom: "1rem", fontSize: "1.8rem" }}
          variant="rectangular"
        />
      </div>
      <SkeletonTagList count={3} />
    </>
  );
};

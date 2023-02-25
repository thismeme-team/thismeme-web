import { Skeleton } from "@/components/common/Skeleton";

import { SkeletonTagList } from "./SkeletonTagList";

export const SkeletonMeme = () => {
  return (
    <div className="mb-24">
      <Skeleton
        animation="wave"
        as="div"
        variant="rectangular"
        style={{
          width: "100%",
          height: "3.2rem",
          borderRadius: "2rem",
          marginBottom: "1.6rem",
          marginTop: "1.6rem",
        }}
      />
      <Skeleton
        animation="wave"
        as="div"
        style={{ width: "100%", height: "40rem", borderRadius: "2rem", marginBottom: "0.8rem" }}
        variant="rectangular"
      />
      <div className="my-8 flex justify-between gap-20 text-18-bold-140">
        <Skeleton
          animation="wave"
          as="div"
          style={{ width: "50%", height: "2.52rem", borderRadius: "2rem" }}
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          as="div"
          style={{ width: "50%", height: "2.52rem", borderRadius: "2rem" }}
          variant="rectangular"
        />
      </div>
      <SkeletonTagList count={3} />
    </div>
  );
};

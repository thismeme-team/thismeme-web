import { Skeleton } from "@/components/common/Skeleton";

import { SkeletonTagList } from "./SkeletonTagList";

export const SkeletonMeme = () => {
  return (
    <div>
      <Skeleton
        animation="wave"
        as="div"
        variant="rectangular"
        style={{
          width: "100%",
          height: "4rem",
          borderRadius: "2rem",
          marginBottom: "1rem",
          marginTop: "4.2rem",
        }}
      />
      <Skeleton
        animation="wave"
        as="div"
        style={{ width: "100%", height: "40rem", borderRadius: "2rem", marginBottom: "1rem" }}
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
    </div>
  );
};

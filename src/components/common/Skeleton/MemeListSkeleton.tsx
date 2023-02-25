import { memo } from "react";

import { Skeleton } from "./Skeleton";

export const MemeItemSkeleton = memo(() => {
  return (
    <span className="w-auto">
      <Skeleton
        animation="wave"
        style={{ width: "100%", height: "20rem", borderRadius: "1.5rem" }}
        variant="rectangular"
      />
      <Skeleton animation="wave" style={{ width: "80%", fontSize: "1.4rem" }} />
    </span>
  );
});
MemeItemSkeleton.displayName = "MemeItemSkeleton";

interface MemeListSkeletonProps {
  length?: number;
}
export const MemeListSkeleton = memo(({ length = 8 }: MemeListSkeletonProps) => {
  return <div className="grid grid-cols-2 gap-9">{renderMemeItemSkeletons(length)}</div>;
});
MemeListSkeleton.displayName = "MemeListSkeleton";

export const renderMemeItemSkeletons = (length: number) =>
  Array.from(Array(length).keys()).map((_, index) => {
    return <MemeItemSkeleton key={`${MemeItemSkeleton.displayName}${index}`} />;
  });

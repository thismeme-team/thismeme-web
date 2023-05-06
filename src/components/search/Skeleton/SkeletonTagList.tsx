import { Skeleton } from "@/components/common/Skeleton";

export const SkeletonTagList = () => {
  return (
    <div className="flex gap-8 overflow-x-auto py-12">
      {Array.from(Array(3).keys()).map((i) => (
        <Skeleton as="div" key={i} style={{ width: "8rem", height: "5.2rem" }} variant="rounded" />
      ))}
    </div>
  );
};

import { Skeleton } from "@/components/common/Skeleton";

export const SkeletonTagList = () => {
  return (
    <div className="flex flex-col gap-10 px-14">
      {Array.from(Array(5).keys()).map((i) => (
        <Skeleton as="div" key={i} style={{ width: "100%", height: "5rem" }} variant="rounded" />
      ))}
    </div>
  );
};

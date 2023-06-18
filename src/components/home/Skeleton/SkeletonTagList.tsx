import { Skeleton } from "@/common/components/Skeleton";

export const SkeletonTagList = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-8">
      {Array.from(Array(count).keys()).map((i) => (
        <Skeleton
          animation="wave"
          as="div"
          key={i}
          style={{ borderRadius: "2.8rem", height: "3.6rem", width: "8.5rem" }}
          variant="rounded"
        />
      ))}
    </div>
  );
};

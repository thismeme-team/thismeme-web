import { Skeleton } from "@/components/common/Skeleton";

export const SkeletonTagList = () => {
  return (
    <div className="flex gap-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton
          animation="wave"
          as="div"
          key={i}
          style={{ borderRadius: "2.8rem", height: "6rem", width: "8.5rem" }}
          variant="rounded"
        />
      ))}
    </div>
  );
};

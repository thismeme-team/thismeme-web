import { Skeleton } from "@/common/components/Skeleton";

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
      <div className="flex gap-8">
        {Array.from(Array(3).keys()).map((i) => (
          <Skeleton
            animation="wave"
            as="div"
            key={i}
            style={{ borderRadius: "2.8rem", height: "3.6rem", width: "8.5rem" }}
            variant="rounded"
          />
        ))}
      </div>
    </>
  );
};

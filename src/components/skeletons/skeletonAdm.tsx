import { Skeleton } from "../ui/skeleton";

export const SkeletonAdm = () => {
  return (
    <div className="w-full max-w-3xl m-auto px-3 mb-72">
      <div className="mb-36">
        <Skeleton className="w-full h-5" />
      </div>
      <div className="w-full flex flex-col space-y-3">
        <Skeleton className="w-full h-14" />
      </div>
    </div>
  );
};

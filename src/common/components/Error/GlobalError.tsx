import { Navigation } from "../Navigation";

export const GlobalError = () => {
  return (
    <>
      <Navigation />
      <div className="flex h-[calc(100dvh-5.4rem)] flex-col items-center justify-center font-suit">
        <span className="text-32-bold-140 ">오류 발생</span>
        <span className="mt-16 text-16-semibold-140 text-gray-600">
          이 페이지를 새로고침 해보세요.
        </span>
      </div>
    </>
  );
};

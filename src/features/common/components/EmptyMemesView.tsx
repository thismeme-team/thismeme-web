import { Button } from "@/common/components/Button";
import { Icon } from "@/common/components/Icon";
import { channelUrl } from "@/common/utils";

export const EmptyMemesView = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-y-2/4 -translate-x-2/4 flex-col items-center justify-center text-32-bold-140">
      <span className="whitespace-nowrap">꽤 유니크한 밈을</span>
      <span className="whitespace-nowrap">찾고 계시는군요!</span>
      <a href={channelUrl} rel="noreferrer" target="_blank">
        <Button className="mt-16 flex h-56 w-160 justify-between rounded-50 bg-gray-800 px-24 py-16 text-14-semibold-140 text-white active:bg-black">
          <Icon height={24} name="memeChannel" width={24} />그 밈 알려주기
        </Button>
      </a>
      <span className="mt-8 text-center text-12-regular-160 text-gray-600">
        찾고 싶은 밈 팀에 알려주실래요?
      </span>
    </div>
  );
};

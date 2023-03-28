import type { useAuth } from "@/application/hooks";
import { channelUrl } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";

const defaultAvatarUrl = "/img/default-avatar.png";
const defaultName = "로그인하기";

type LogoutSideBarContentProps = ReturnType<typeof useAuth>;

export const LogoutSideBarContent = (props: LogoutSideBarContentProps) => {
  const { validate } = props;

  return (
    <>
      <button className="w-full rounded-24 bg-gray-100 px-16 pt-16 pb-24" onClick={validate()}>
        <div className="flex items-center gap-12">
          <Photo className="h-50 w-50 rounded-20" src={defaultAvatarUrl} />
          <span className="grow text-left text-18-bold-140 text-gray-900">{defaultName}</span>
          <Icon name="setting" />
        </div>

        <div className="mt-24 flex justify-center divide-x divide-solid divide-gray-200">
          <div className="pr-40 text-center">
            <span className="block text-32-bold-140">0</span>
            <span className="block text-16-semibold-140">share</span>
          </div>
          <div className="pl-40 text-center">
            <span className="block text-32-bold-140">0</span>
            <span className="block text-16-semibold-140">collect</span>
          </div>
        </div>
      </button>

      <section className="mt-40 flex grow flex-col gap-20">
        <a
          className="flex items-center justify-between text-16-semibold-140"
          href={channelUrl}
          rel="noreferrer"
          target="_blank"
        >
          게시물 신고
        </a>

        <a
          className="flex items-center justify-between text-16-semibold-140"
          href={channelUrl}
          rel="noreferrer"
          target="_blank"
        >
          서비스 이용 문의
        </a>
      </section>
    </>
  );
};

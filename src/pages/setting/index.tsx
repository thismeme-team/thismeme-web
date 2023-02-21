import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuth, useChannelIO, useModal } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Button } from "@/components/common/Button";
import { SignOutModal } from "@/components/common/Modal";
import { BackButtonNavigation } from "@/components/common/Navigation";
import { Photo } from "@/components/common/Photo";

const SettingPage = () => {
  const modalProps = useModal();

  const { user, isLogin, isLoading } = useAuth();
  const { replace } = useRouter();
  useEffect(() => {
    if (!isLoading && !isLogin) replace(PATH.getMainPage);
  }, [isLoading, isLogin, replace]);

  useChannelIO({ user });

  return (
    <>
      <BackButtonNavigation title="설정" />
      <article className="flex h-[calc(100vh-5.4rem)] flex-col justify-between">
        <section>
          <div className="mt-24 flex h-64 items-center justify-between border-b border-gray-200">
            <span className="text-22-bold-140">계정 정보</span>
            <span className="text-16-semibold-140 text-gray-600">{user?.email}</span>
          </div>
          <div className="flex h-64 justify-between py-16">
            <span className="text-22-bold-140">문의하기</span>
            <Photo className="h-32 w-32" src="/img/fallbackImage.png" />
          </div>
        </section>
        <section className="mb-28 flex flex-wrap justify-center">
          <Button
            className="w-full rounded-10 bg-black py-20 text-18-bold-140 text-white"
            onClick={modalProps.onOpen}
          >
            Log out
          </Button>
          <Button className="mt-8 text-12-regular-160 text-gray-600">회원 탈퇴</Button>
        </section>
      </article>
      <SignOutModal {...modalProps} />
    </>
  );
};

export default SettingPage;

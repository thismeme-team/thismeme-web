import { Button } from "@/common/components/Button";
import { SignOutModal } from "@/common/components/Modal";
import { BackButtonNavigation } from "@/common/components/Navigation";
import { Photo } from "@/common/components/Photo";
import { useModal } from "@/common/hooks";
import { useAuth, useChannelIO, withAuth } from "@/features/common";

const SettingPage = () => {
  const modalProps = useModal();

  const { user } = useAuth();

  useChannelIO({ user });

  return (
    <>
      <BackButtonNavigation title="설정" />
      <article className="flex h-[calc(100dvh-5.4rem)] flex-col justify-between">
        <section>
          <div className="mt-24 flex h-64 items-center justify-between border-b border-gray-200">
            <span className="text-22-bold-140">계정 정보</span>
            <span className="text-16-semibold-140 text-gray-600">{user?.email}</span>
          </div>
          <div className="flex h-64 justify-between py-16">
            <span className="text-22-bold-140">문의하기</span>
            <Photo
              unoptimized
              alt="폴백 이미지"
              className="h-32 w-32"
              src="/img/fallbackImage.png"
            />
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

export default withAuth(SettingPage);

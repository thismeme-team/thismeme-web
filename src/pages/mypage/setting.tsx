import { Button } from "@/components/common/Button";
import { Navigation } from "@/components/common/Navigation";
import { BackButton } from "@/components/common/Navigation/BackButton";
import { Photo } from "@/components/common/Photo";

const SettingPage = () => {
  return (
    <>
      <Navigation>
        <Navigation.Left>
          <BackButton />
        </Navigation.Left>
        <Navigation.Center>설정</Navigation.Center>
      </Navigation>

      <article className="flex h-[calc(100vh-5.4rem)] flex-col justify-between">
        <section>
          <div className="mt-24 flex h-64 items-center justify-between border-b border-gray-200">
            <span className="text-22-bold-140">계정 정보</span>
            <span className="text-16-semibold-140 text-gray-600">email@email.com</span>
          </div>
          <div className="flex h-64 justify-between py-16">
            <span className="text-22-bold-140">문의하기</span>
            <Photo className="h-32 w-32" />
          </div>
        </section>
        <section className="mb-28 flex flex-wrap justify-center">
          <Button className="w-full rounded-10 bg-black py-20 text-18-bold-140 text-white">
            Log out
          </Button>
          <Button className="mt-8 text-12-regular-160 text-gray-600">회원 탈퇴</Button>
        </section>
      </article>
    </>
  );
};

export default SettingPage;

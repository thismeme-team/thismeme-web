import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { RandomImage } from "@/components/common/RandomImge";

import { Modal } from "../Modal";
import { useSignUpModalContext } from "./context";

export const SignUpModal = () => {
  const modalProps = useSignUpModalContext();

  return (
    <Modal {...modalProps}>
      <Modal.Header />
      <div className="m-auto w-300 rounded-24 pb-24">
        <section className="align-left mt-36 mb-10 text-left font-suit text-32-bold-140">
          <div>
            킹 받는{" "}
            <RandomImage className="-mb-[calc(1.4em-3.2rem)/2] inline-block h-32 w-32 rounded-8" />
            을
          </div>
          <div>바로 찾아서</div>
          <div>보낼 수 있어요!</div>
        </section>
        <span className="font-suit text-16-semibold-140 text-gray-800">
          This meme 에 오신 걸 환영합니다
        </span>
        <section className="m-auto flex justify-between pt-32">
          <Button
            as="a"
            className="h-50 w-290 rounded-10 bg-[#FEE500] px-40 py-14 font-suit text-16-semibold-140"
            href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}
          >
            <Icon className="mr-8" name="kakao2" />
            카카오로 3초 만에 시작하기
          </Button>
        </section>
      </div>
    </Modal>
  );
};

import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { RandomImage } from "@/components/common/RandomImge";

import type { ModalProps } from "./Modal";
import { Modal } from "./Modal";

export const SignUpModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <Modal.Header />
      <div className="m-auto w-300 rounded-24 px-8 pb-24">
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
        <section className="m-auto flex w-116 justify-between pt-32">
          <Button className="h-50 w-50 rounded-10 border border-solid border-light-gray-30">
            <Icon name="google" />
          </Button>
          <Button
            as="a"
            className="h-50 w-50 rounded-10 bg-[#FEE500]"
            href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}
            size="large"
          >
            <Icon name="kakao2" />
          </Button>
        </section>
      </div>
    </Modal>
  );
};

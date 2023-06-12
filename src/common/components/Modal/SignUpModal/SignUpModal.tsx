import { IS_CSR } from "@/common/utils";

import { Button } from "../../Button";
import { Icon } from "../../Icon";
import { RandomImage } from "../../RandomImge";
import { Modal } from "../Modal";
import { useSignUpModalContext } from "./context";

export const SignUpModal = () => {
  const modalProps = useSignUpModalContext();

  const handleSetCookie = () => {
    // NOTE: 쿠키 만료시간은 1분으로 지정
    const EXPIRES = new Date();
    EXPIRES.setMinutes(EXPIRES.getMinutes() + 1);
    if (IS_CSR) {
      document.cookie = `nextPageUrl=${
        window.location
      }; path=/; domain=.thismeme.me; expires=  ${EXPIRES.toUTCString()} ;`;
    }
  };

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
            className="ga-signup-click h-50 w-290 rounded-10 bg-[#FEE500] px-40 py-14 font-suit text-16-semibold-140"
            href={`${process.env.NEXT_PUBLIC_KAKAO_OAUTH2_URL}`}
            onClick={handleSetCookie}
          >
            <Icon className="mr-8" name="kakao2" />
            카카오로 3초 만에 시작하기
          </Button>
        </section>
      </div>
    </Modal>
  );
};

import { useRouter } from "next/router";

import { useAuth, useToast } from "@/application/hooks";
import { PATH } from "@/application/util";
import { RandomImage } from "@/components/common/RandomImge";

import { Modal } from "./Modal";
import type { ModalProps } from "./types";

export const SignOutModal = (props: ModalProps) => {
  const { onClose } = props;
  const { logout } = useAuth();
  const { show } = useToast();
  const { push } = useRouter();

  const handleCancel = () => {
    onClose();
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        onClose();
        push(PATH.getMainPage);
      },
      onError: () => show("오류가 발생하였습니다"),
    });
  };

  return (
    <Modal {...props}>
      <Modal.Header />
      <div className="m-auto my-24 w-300 rounded-24 pb-8 pt-12">
        <section className="align-left mb-10 text-left font-suit text-32-bold-140">
          <div>
            킹 받는{" "}
            <RandomImage className="-mb-[calc(1.4em-3.2rem)/2] inline-block h-32 w-32 rounded-8" />
            을
          </div>
          <div>바로 찾아서</div>
          <div>보낼 수 있어요!</div>
        </section>
        <span className="font-suit text-16-semibold-140 text-gray-800">
          정말 로그아웃 하시나요?
        </span>
      </div>
      <Modal.Footer className="flex h-66 text-18-bold-140">
        <button className="grow bg-gray-400 text-white" onClick={handleLogout}>
          로그아웃
        </button>
        <button className="grow border-black bg-black text-white" onClick={handleCancel}>
          그냥 살기
        </button>
      </Modal.Footer>
    </Modal>
  );
};

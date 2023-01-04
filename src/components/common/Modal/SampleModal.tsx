import Image from "next/image";

import { Button } from "../Button";
import { Icon } from "../Icon";
import { ModalBase } from "./ModalBase";

interface Props {
  onClose: () => void;
}

export const SampleModal = ({ onClose }: Props) => {
  return (
    <ModalBase onClose={onClose}>
      <div className="m-auto h-[38rem] w-[34rem] rounded-10 bg-white px-25">
        <div className="pt-28 text-center align-middle text-20-bold-140">
          자주 찾는 태그를 북마크하면, 엄청 재밌을 걸요
        </div>
        <Image
          alt="signup"
          className="m-auto my-10"
          height={150}
          src="/img/signup.png"
          width={160}
        />
        <Button
          className="mt-8 w-290 border border-solid border-light-gray-30 text-16-regular-130"
          size="large"
        >
          <Icon className="mr-6" name="google" />
          구글 계정으로 시작하기
        </Button>
        <Button className="mt-8 w-290 bg-[#FEE500] text-16-regular-130" size="large">
          <Icon className="mr-6" name="kakao2" />
          카카오로 3초 만에 시작하기
        </Button>
      </div>
    </ModalBase>
  );
};

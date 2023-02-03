import { Button } from "../Button";
import { Icon } from "../Icon";
import { ModalBase } from "./ModalBase";

interface Props {
  onClose: () => void;
}

export const SignUpModal = ({ onClose }: Props) => {
  return (
    <ModalBase onClose={onClose}>
      <div className="m-auto h-[38rem] w-[34rem] rounded-24 bg-white p-24">
        <section className="flex justify-between pb-24">
          <Icon name="logo2" />
          <Icon name="cancel" onClick={onClose} />
        </section>
        <section className="align-left mt-36 mb-10 text-left font-suit text-32-bold-140">
          <div>
            킹 받는
            <span>밈</span>을
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
            className="h-50 w-50 rounded-10 bg-[#FEE500]"
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`)
            }
          >
            <Icon name="kakao2" />
          </Button>
        </section>
      </div>
    </ModalBase>
  );
};

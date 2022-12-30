import { IconButton } from "@/components/common/Button/IconButton";
import { useToast } from "@/components/common/Toast";

interface Props {
  className: string;
}
export const MemeShareList = ({ className = "" }: Props) => {
  const { success } = useToast();

  return (
    <div className={`flex flex-col items-center gap-16 ${className}`}>
      <ul className="flex gap-10">
        <IconButton
          as="li"
          className="bg-[#FFE812]"
          icon="kakao"
          size="medium"
          onClick={(
            (id) => () =>
              success("hello!!" + id++).then(() => console.log("complete"))
          )(1)}
        />
        <IconButton as="li" className="bg-light-gray-10" icon="download" size="medium" />
        <IconButton as="li" className="bg-light-gray-10" icon="share" size="medium" />
        <IconButton as="li" className="bg-light-gray-10" icon="meatball" size="medium" />
      </ul>
      <span className="text-16-semibold-130 text-dark-gray-20">친구에게 밈을 공유해 보세요</span>
    </div>
  );
};

import { IconButton } from "@/components/common/Button/IconButton";

interface Props {
  className: string;
}
export const MemeShareList = ({ className }: Props) => {
  return (
    <div className={"flex flex-col items-center gap-16 " + className}>
      <ul className="flex gap-10">
        <li>
          <IconButton className="bg-[#FFE812]" icon="kakao" size="medium" />
        </li>
        <li>
          <IconButton className="bg-light-gray-10" icon="download" size="medium" />
        </li>
        <li>
          <IconButton className="bg-light-gray-10" icon="share" size="medium" />
        </li>
        <li>
          <IconButton className="bg-light-gray-10" icon="meatball" size="medium" />
        </li>
      </ul>
      <span className="text-16-semibold-130 text-dark-gray-20">친구에게 밈을 공유해 보세요</span>
    </div>
  );
};

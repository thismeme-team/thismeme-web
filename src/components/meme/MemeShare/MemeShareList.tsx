import { Button } from "@/components/common/Button";

interface Props {
  className: string;
}
export const MemeShareList = ({ className }: Props) => {
  return (
    <div className={"flex flex-col items-center gap-16 " + className}>
      <ul className="flex gap-10">
        <li>
          <Button className="h-46 w-46 rounded-20 bg-amber-300" icon="kakao" size="default" />
        </li>
        <li>
          <Button className="h-46 w-46 rounded-20 bg-amber-300" icon="kakao" size="default" />
        </li>
        <li>
          <Button className="h-46 w-46 rounded-20 bg-amber-300" icon="kakao" size="default" />
        </li>
        <li>
          <Button className="h-46 w-46 rounded-20 bg-amber-300" icon="kakao" size="default" />
        </li>
      </ul>
      <span className="text-label">친구에게 밈을 공유해 보세요</span>
    </div>
  );
};

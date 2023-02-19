import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  onClick: () => void;
  checked: boolean;
}

const animation = "transition-colors duration-200 ease-in-out";

export const TagBookmarkButtonView = ({ onClick, checked }: Props) => {
  return (
    <label className="fixed bottom-32 right-18 text-center">
      <Button
        id="bookmark"
        className={`${
          checked ? "bg-primary-300" : "bg-gray-700"
        } ${animation} peer mb-3 h-60 w-60 rounded-full active:bg-black`}
        onClick={onClick}
      >
        <Icon height={30} name="star" width={30} />
      </Button>
      <span
        className={`${
          checked ? "text-gray-600" : "text-gray-700"
        } ${animation} text-12-bold-160 peer-active:text-black`}
      >
        {checked ? "북마크 완료!" : "태그 북마크"}
      </span>
    </label>
  );
};

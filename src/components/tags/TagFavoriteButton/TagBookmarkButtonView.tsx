import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  onClick: () => void;
  checked: boolean;
}
export const TagBookmarkButtonView = ({ onClick, checked }: Props) => {
  return (
    <label className="fixed bottom-32 right-18 text-center">
      <input checked={checked} className="peer hidden" type="checkbox" />
      <Button
        className="mb-3 flex h-60 w-60 items-center justify-center rounded-full bg-gray-700 transition-colors duration-200 ease-in-out focus:bg-black peer-checked:bg-primary-300"
        id="bookmark"
        onClick={onClick}
      >
        <Icon height={30} name="star" width={30} />
      </Button>
      <span className="text-12-bold-160 text-gray-700 transition-colors duration-200 ease-in-out peer-checked:text-gray-600 peer-focus:text-black ">
        {checked ? "북마크 완료!" : "태그 북마크"}
      </span>
    </label>
  );
};

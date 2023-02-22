import {
  useAuthValidation,
  useDeleteFavoriteTag,
  useGetTagInfo,
  usePostFavoriteTag,
  useToast,
} from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

interface Props {
  tagId: number;
}

const animation = "transition-colors duration-200 ease-in-out";

export const TagBookmarkButton = ({ tagId }: Props) => {
  const { show } = useToast();
  const { isFav } = useGetTagInfo(tagId);
  const { mutate: saveMutation } = usePostFavoriteTag();
  const { mutate: deleteMutation } = useDeleteFavoriteTag();
  const { validatorWithSignUpModal } = useAuthValidation();

  const handleSaveBookmark = () => {
    saveMutation(tagId, {
      onSuccess: () => show("즐겨찾기에 추가했습니다."),
      onError: () => show("다시 시도해 주세요."),
    });
  };

  const handleDeleteBookmark = () => {
    deleteMutation(tagId, {
      onSuccess: () => show("즐겨찾기에서 해제했습니다."),
      onError: () => show("다시 시도해 주세요."),
    });
  };

  const handleClick = isFav ? handleDeleteBookmark : handleSaveBookmark;

  return (
    <div className="fixed bottom-32 right-18 text-center">
      <Button
        id="bookmark"
        className={`${
          isFav ? "bg-primary-300 [&_*]:fill-[#fddd71]" : "bg-gray-800"
        } ${animation} peer mb-3 h-60 w-60 rounded-full active:bg-black`}
        onClick={validatorWithSignUpModal(handleClick)}
      >
        <Icon height={28} name="star" width={28} />
      </Button>
      <span
        className={`${
          isFav ? "text-gray-600" : "text-gray-700"
        } ${animation} text-12-bold-160 peer-active:text-black`}
      >
        {isFav ? "북마크 완료!" : "태그 북마크"}
      </span>
    </div>
  );
};

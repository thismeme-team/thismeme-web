import {
  useAuth,
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
  const { validate, isLoading } = useAuth();
  const { data, isFetchedAfterMount } = useGetTagInfo(tagId, { enabled: !isLoading });

  const { mutate: saveMutation } = usePostFavoriteTag();
  const { mutate: deleteMutation } = useDeleteFavoriteTag();
  if (!isFetchedAfterMount || !data) return null;
  const { isFav } = data;
  const handleSaveBookmark = () => {
    saveMutation(
      { tagId: tagId, name: data.name },
      {
        onSuccess: () => show("즐겨찾기에 추가했습니다."),
        onError: () => show("다시 시도해 주세요."),
      },
    );
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
          isFav
            ? "bg-gray-200 text-gray-600 shadow-[0_0_20px_rgba(38,37,40,0.2)] active:bg-gray-300 active:text-gray-700"
            : "bg-gray-800 text-white active:bg-black active:text-white"
        } ${animation} flex h-53 w-143 justify-between rounded-50 px-24 py-16 text-14-semibold-140`}
        onClick={validate(handleClick)}
      >
        <Icon height={22} name="star" width={22} />
        태그 북마크
      </Button>
    </div>
  );
};

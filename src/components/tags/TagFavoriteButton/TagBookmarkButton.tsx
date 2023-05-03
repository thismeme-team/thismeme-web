import {
  useAuth,
  useDeleteFavoriteTag,
  useGetTagInfo,
  usePostFavoriteTag,
  useToast,
} from "@/application/hooks";
import { TOAST_MESSAGE } from "@/application/util";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";

import { useTagCategoryContext } from "../TagCategory";

interface Props {
  tagId: number;
}

const animation = "transition-colors duration-200 ease-in-out";
const TAG_DELAY = 1500;

export const TagBookmarkButton = ({ tagId }: Props) => {
  const { show, close } = useToast();
  const { validate, isLoading } = useAuth();
  const { data, isFetchedAfterMount } = useGetTagInfo(tagId, { enabled: !isLoading });

  const { mutate: saveMutation } = usePostFavoriteTag();
  const { mutate: deleteMutation, onCancel } = useDeleteFavoriteTag(TAG_DELAY);
  const [, setIsOpenTagCategory] = useTagCategoryContext();

  if (!isFetchedAfterMount || !data) return null;
  const { isFav } = data;
  const handleSaveBookmark = () => {
    saveMutation(
      { tagId: tagId, name: data.name },
      {
        onSuccess: () =>
          show(
            <>
              <div className="grow">{TOAST_MESSAGE["태그 북마크"]}</div>
              <button
                className="justify-self-end text-14-semibold-140 leading-none text-gray-400"
                onClick={() => {
                  setIsOpenTagCategory(true);
                  close({ id: tagId, duration: 0 });
                }}
              >
                보러가기
              </button>
            </>,
            { duration: TAG_DELAY },
          ),
        onError: () => show(TOAST_MESSAGE["다시 시도"]),
      },
    );
  };

  const handleDeleteBookmark = async () => {
    show(
      <>
        <div className="grow">{TOAST_MESSAGE["태그 북마크 해제"]}</div>
        <button
          className="justify-self-end text-14-semibold-140 leading-none text-gray-400"
          onClick={() => {
            onCancel();
            close({ id: tagId, duration: 0 });
            show(TOAST_MESSAGE["태그 북마크 취소"]);
          }}
        >
          되돌리기
        </button>
      </>,
      { duration: TAG_DELAY },
    );
    deleteMutation(tagId, {
      onError: (err) => {
        if (err instanceof Error && err.name === "CanceledError") return;
        show(TOAST_MESSAGE["다시 시도"]);
      },
    });
  };

  const handleClick = isFav ? handleDeleteBookmark : handleSaveBookmark;

  return (
    <div className="fixed bottom-32 left-[50%] translate-x-[-50%] text-center">
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

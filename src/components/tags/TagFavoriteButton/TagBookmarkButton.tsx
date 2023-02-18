import {
  useDeleteFavoriteTag,
  useGetTagInfo,
  usePostFavoriteTag,
  useToast,
} from "@/application/hooks";
import { AuthValidateHandler } from "@/hocs/auth";

import { TagBookmarkButtonView } from "./TagBookmarkButtonView";

interface Props {
  tagId: number;
}
export const TagBookmarkButton = ({ tagId }: Props) => {
  const { show } = useToast();
  console.debug(typeof tagId);
  const { isFav } = useGetTagInfo(tagId);
  const { mutate: saveMutation } = usePostFavoriteTag();
  const { mutate: deleteMutation } = useDeleteFavoriteTag();

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

  return (
    <AuthValidateHandler handler={["onClick"]}>
      <TagBookmarkButtonView
        checked={isFav}
        onClick={isFav ? handleDeleteBookmark : handleSaveBookmark}
      />
    </AuthValidateHandler>
  );
};

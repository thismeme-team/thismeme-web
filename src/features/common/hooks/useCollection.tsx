import Link from "next/link";

import {
  useDeleteMemeFromCollection,
  useGetCollectionCheck,
  usePostMemeToCollection,
} from "@/application/hooks";
import { useToast } from "@/common/hooks";

const TAG_DELETE_DELAY = 3000;

interface UseCollectionArg {
  memeId: number;
  isLogin: boolean;
}
/**
 * 추후 기획이 특정 폴더에 밈을 저장하게 되면 수정
 */
export const useCollection = ({ memeId, isLogin }: UseCollectionArg) => {
  const { data: collectionCheck } = useGetCollectionCheck(memeId, { enabled: !!isLogin });
  const { mutate: postMemeToCollection } = usePostMemeToCollection();
  const { mutate: deleteMemeFromCollection } = useDeleteMemeFromCollection();

  const { show } = useToast();

  const onUpdateCollection = () => {
    if (!collectionCheck) return show("잠시 후에 다시 시도해 주세요.");
    if (collectionCheck.isAdded) {
      deleteMemeFromCollection(memeId, {
        onSuccess: () => {
          show("콜렉션에서 삭제했습니다!");
        },
        onError: () => {
          show("콜렉션 삭제에 실패했습니다!");
        },
      });
    } else {
      postMemeToCollection(memeId, {
        onSuccess: () => {
          show(
            () => (
              <>
                <div className="grow">콜렉션에 저장했습니다!</div>
                <Link
                  className="ga-meme-toast-see-collection-click justify-self-end text-14-semibold-140 leading-none text-gray-400"
                  href="/collect"
                >
                  보러가기
                </Link>
              </>
            ),
            { duration: TAG_DELETE_DELAY },
          );
        },
        onError: () => {
          show("콜렉션 저장에 실패했습니다!");
        },
      });
    }
  };

  return { ...collectionCheck, onUpdateCollection };
};

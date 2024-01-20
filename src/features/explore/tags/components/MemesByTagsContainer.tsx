import { useRouter } from "next/router";

import { useGetMemesByTag } from "@/api/search";
import { Photo } from "@/common/components/Photo";
import { useClipboard, useToast } from "@/common/hooks";
import { DOMAIN } from "@/common/utils";
import { EmptyMemesView, InfiniteMemeList } from "@/features/common";

interface Props {
  tag: string;
}
export const MemesByTagsContainer = ({ tag }: Props) => {
  const { data: memeList, totalCount, isEmpty, fetchNextPage } = useGetMemesByTag(tag);

  if (isEmpty) {
    return <EmptyMemesView />;
  }
  return (
    <>
      <InfiniteMemeList
        memeList={memeList}
        onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
      />
      <Thumbnail image={memeList?.[0].image.images[0].imageUrl} totalCount={totalCount as number} />
    </>
  );
};

interface ThumbnailProps {
  image: string;
  totalCount: number;
}
const Thumbnail = ({ image, totalCount }: ThumbnailProps) => {
  const router = useRouter();
  const clipboard = useClipboard();
  const toast = useToast();

  const pageUrl = `${DOMAIN}${router.asPath}`;

  return (
    <div className="flex gap-16 px-22 pt-16 pb-24">
      <Photo className="h-80 w-80 rounded-full" src={image} />
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <span className="text-14-semibold-140 text-gray-900">{totalCount}개 밈</span>
        <button
          className="ga-search-result-share-click w-full rounded-full bg-gray-800 py-8 text-14-semibold-140 text-white active:bg-black"
          onClick={() => {
            clipboard.writeText(pageUrl, {
              onSuccess: () => {
                toast.show("밈을 담아서 링크를 복사했어요 :)");
              },
            });
          }}
        >
          공유하기
        </button>
        <p className="text-12-regular-160 text-gray-600">밈 보따리를 친구에게 공유하기</p>
      </div>
    </div>
  );
};

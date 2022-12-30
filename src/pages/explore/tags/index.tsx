import { useRouter } from "next/router";

import { Button } from "@/components/common/Button";
import { Navigation } from "@/components/common/Navigation";
import { MemeList } from "@/components/meme/memeList";

const ExploreTagsPage = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <>
      <Navigation page="result" title={`#${query.q}`} />
      <div className="flex flex-col items-center bg-white pt-16">
        <span className="text-black/[.3]">100개의 밈</span>
        <Button size="large">태그 즐겨찾기</Button>
      </div>
      <MemeList />
    </>
  );
};

export default ExploreTagsPage;

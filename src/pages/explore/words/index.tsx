import { useRouter } from "next/router";

import { Navigation } from "@/components/common/Navigation";
import { MemeList } from "@/components/meme/memeList";

const ExploreWordsPage = () => {
  const router = useRouter();
  const { query } = router;
  return (
    <>
      <Navigation page="result" title={query.q} />
      <MemeList />
    </>
  );
};

export default ExploreWordsPage;

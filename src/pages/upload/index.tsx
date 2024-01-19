import { useState } from "react";

import { UploadNavigation } from "@/common/components/Navigation";
import {
  AdditionalUploadButton,
  UploadInitialMeme,
  UploadMeme,
} from "@/features/upload/components";
import type { MemeUploadFormData } from "@/types";

const UploadPage = () => {
  /**
   * @todo 밈 입력폼 상태관리
   * memeData : {key,image,title,tag}[]
   */

  const [memeData, setMemeData] = useState<MemeUploadFormData[]>([]);

  return (
    <>
      <UploadNavigation />
      <div className="flex flex-col gap-16 pt-16 pb-60">
        {!memeData.length ? (
          <UploadInitialMeme setMemeData={setMemeData} />
        ) : (
          <>
            {memeData.map((meme) => (
              <UploadMeme
                isFocus={meme.index === 0}
                key={String(meme.image)}
                src={String(meme.image)}
              />
            ))}
            <AdditionalUploadButton className="mx-auto" />
          </>
        )}
      </div>
    </>
  );
};

export default UploadPage;

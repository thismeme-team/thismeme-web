import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { UploadImage } from "@/features/upload/components/UploadImage";
import { UploadMemeData } from "@/features/upload/components/UploadMemeData";

interface Props {
  src: string;
  isFocus?: boolean;
}

export const UploadMeme = ({ src, isFocus }: Props) => {
  return (
    <section className="relative">
      <button className="absolute top-16 left-16">
        <Icon color="gray-600" name="meatball" />
      </button>
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={`group w-full rounded-24 border bg-white pt-64 pb-16 
         focus-within:border-primary-500 focus:outline-none`}
        ref={(e) => {
          if (isFocus) e?.focus();
        }}
      >
        {src ? <Photo className="mx-16 rounded-16" src={src} /> : <UploadImage />}
        <UploadMemeData className="group-[:not(:focus-within)]:hidden" />
      </div>
    </section>
  );
};

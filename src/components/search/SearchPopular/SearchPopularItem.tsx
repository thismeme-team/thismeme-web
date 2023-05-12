import { Photo } from "@/components/common/Photo";

interface Props {
  name: string;
  imageSrc: string;
}

export const SearchPopularItem = ({ name, imageSrc }: Props) => {
  return (
    <button
      className="relative overflow-hidden rounded-26 py-16 px-32"
      onContextMenu={(e) => e.preventDefault()}
    >
      <Photo
        alt={name}
        // NOTE: Photo의 기본 className과 충돌나서 css props로 작성
        css={{ position: "absolute", inset: 0, filter: "brightness(.5)" }}
        sizes="100px"
        src={imageSrc}
      />
      <span className="relative font-suit text-14-semibold-140 text-white">{name}</span>
    </button>
  );
};

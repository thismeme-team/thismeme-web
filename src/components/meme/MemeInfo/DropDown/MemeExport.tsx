import { useDownload, useMemeDetailById, useToast } from "@/application/hooks";
import { DropDown } from "@/components/common/DropDown";
import { Icon } from "@/components/common/Icon";

interface Props {
  id: string;
}
export const MemeExport = ({ id }: Props) => {
  const {
    name,
    description,
    image: { images },
  } = useMemeDetailById(id);
  const { download } = useDownload();
  const { show } = useToast();

  const url = images[0].imageUrl;

  const handleImageDownload = () =>
    download({
      target: url,
      name,
      onSuccess: () => show("이미지를 다운로드 했습니다!"),
    });

  const handleCollectionSave = () => show("콜렉션에 저장했습니다!");

  const handleNaviteShare = async () => {
    if (!navigator.share) {
      return show("공유하기가 지원되지 않습니다.");
    }
    await navigator.share({ title: name, text: description, url });
  };

  return (
    <DropDown>
      <DropDown.Trigger>
        <span className="mb-16 flex h-40 w-40 items-center justify-center rounded-10 bg-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <Icon color="white" name="meatball" />
        </span>
      </DropDown.Trigger>
      <DropDown.Contents css={{ right: 0 }} width="34">
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={handleImageDownload}
        >
          이미지 다운로드
        </DropDown.Content>
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={handleCollectionSave}
        >
          콜렉션에 저장하기
        </DropDown.Content>
        <DropDown.Content
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onClick={handleNaviteShare}
        >
          공유하기
        </DropDown.Content>
        <DropDown.Content className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100">
          신고
        </DropDown.Content>
      </DropDown.Contents>
    </DropDown>
  );
};

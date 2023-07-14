const titles = {
  북마크: "당신이 즐겨찾는 태그",
  사용자: "이럴 때 이런 밈은 어때요?",
  콘텐츠: "밈 바로 찾기",
};

interface Props {
  title: string;
}

export const CategoryTitle = ({ title }: Props) => {
  if (!(title in titles)) return null;

  return <div className="py-8 text-18-bold-140">{titles[title as keyof typeof titles]}</div>;
};

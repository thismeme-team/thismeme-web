interface Props {
  name: string;
  index: number;
}

export const SearchPopularItem = ({ name, index }: Props) => {
  return (
    <>
      <div className="flex h-50 flex-row items-center justify-items-center">
        <div className="mr-10 flex h-16 w-16 justify-center rounded-full border border-black bg-black text-white">
          {index + 1}
        </div>
        <div className="text-15-semibold-130">{name}</div>
      </div>
    </>
  );
};

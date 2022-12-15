import useInput from "@/application/hooks/common/useInput";
import Navigation from "@/components/common/Navigation";
import SearchInput from "@/components/search/SearchInput";
import SearchItem from "@/components/search/SearchItem";

function SearchPage() {
  const inputProps = useInput();

  return (
    <>
      <Navigation page="search" />
      <SearchInput
        {...inputProps}
        placeholder="당신이 찾는 밈, 여기 있다."
        spellCheck={false}
        type="text"
        onReset={inputProps.onReset}
      />
      <SearchItem searchText={inputProps.value} tagName="무한도전" majorType="예능별" />
      <SearchItem searchText={inputProps.value} tagName="무한" majorType="예능별" />
      <SearchItem searchText={inputProps.value} tagName="무한한도도전전" />
    </>
  );
}

export default SearchPage;

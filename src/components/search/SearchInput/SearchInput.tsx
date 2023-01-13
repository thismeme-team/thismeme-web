import type { InputHTMLAttributes } from "react";

import { Icon } from "@/components/common/Icon";
import { InputBase } from "@/components/common/Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  handleSearchByKeyword?: () => void;
}

export const SearchInput = ({ onReset, handleSearchByKeyword, value, ...rest }: Props) => {
  return (
    <form
      className="relative flex items-center justify-start"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchByKeyword?.();
      }}
    >
      <InputBase
        className="h-43 w-full rounded-22 bg-light-gray-10 pl-22 text-16-semibold-130 text-dark-gray-10 outline-none placeholder:text-gray-10"
        value={value}
        {...rest}
        endComponents={
          <>
            <Icon className="absolute right-46" name="delete" onClick={onReset} />
            <Icon
              className="absolute right-16"
              name="search"
              onClick={() => {
                handleSearchByKeyword?.();
              }}
            />
          </>
        }
      />
    </form>
  );
};

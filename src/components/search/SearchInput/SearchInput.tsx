import type { InputHTMLAttributes } from "react";

import { Icon } from "@/components/common/Icon";
import { InputBase } from "@/components/common/Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  onSearchByKeyWord?: () => void;
}

export const SearchInput = ({ onReset, onSearchByKeyWord, value, ...rest }: Props) => {
  return (
    <form
      className="relative flex items-center justify-start"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchByKeyWord?.();
      }}
    >
      <InputBase
        className="h-43 w-full rounded-22 bg-light-gray-10 pl-22 text-16-semibold-130 text-dark-gray-10 outline-none placeholder:text-gray-10"
        value={value}
        {...rest}
        endComponents={
          <>
            {value && (
              <Icon className="absolute right-46 cursor-pointer" name="delete" onClick={onReset} />
            )}
            <button className="absolute right-16">
              <Icon name="search" />
            </button>
          </>
        }
      />
    </form>
  );
};

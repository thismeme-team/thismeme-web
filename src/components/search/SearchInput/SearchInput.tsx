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
      className="relative flex items-center justify-start py-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchByKeyWord?.();
      }}
    >
      <InputBase
        className="h-56 w-full rounded-30 bg-gray-100 pl-22 pr-65 font-suit text-16-semibold-140 text-black outline-none placeholder:text-gray-500"
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

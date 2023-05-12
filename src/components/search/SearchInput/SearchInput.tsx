import type { InputHTMLAttributes } from "react";

import { Icon } from "@/components/common/Icon";
import { InputBase } from "@/components/common/Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  onSearchByKeyWord?: () => void;
}

export const SearchInput = ({ onReset, onSearchByKeyWord, value, className, ...rest }: Props) => {
  return (
    <form
      className="relative my-16 flex w-full items-center justify-start"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchByKeyWord?.();
      }}
    >
      <InputBase
        className={`relative h-56 w-full rounded-30 bg-gray-100 pl-22 pr-76 font-suit text-16-semibold-140 text-black outline-none placeholder:text-gray-500 ${className}`}
        value={value}
        {...rest}
        endComponents={
          <>
            {value && (
              <button className="absolute right-44 h-full px-4">
                <Icon name="delete" onClick={onReset} />
              </button>
            )}
            <button className="absolute right-0 h-full pl-8 pr-16">
              <Icon name="search" stroke="gray-600" />
            </button>
          </>
        }
      />
    </form>
  );
};

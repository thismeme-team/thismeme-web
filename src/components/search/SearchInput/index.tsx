import type { InputHTMLAttributes } from "react";

import { Icon } from "@/components/common/Icon";
import { InputBase } from "@/components/common/Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  onClickAddKeyword?: (text: string) => void;
}

export const SearchInput = ({ onReset, onClickAddKeyword, value, ...rest }: Props) => {
  return (
    <div className="relative flex items-center justify-start">
      <InputBase
        className="h-43 w-full rounded-22 bg-light-gray-10 pl-22 text-semi-bold text-dark-gray-10 outline-none placeholder:text-gray-10"
        value={value}
        {...rest}
        endComponents={
          <>
            <Icon className="absolute right-46" name="delete" onClick={onReset} />
            <Icon
              className="absolute right-16"
              name="search"
              onClick={() => {
                onClickAddKeyword?.(value as string);
              }}
            />
          </>
        }
      />
    </div>
  );
};

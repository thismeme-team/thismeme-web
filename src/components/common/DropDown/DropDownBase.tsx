import type { PropsWithChildren } from "react";

export const DropDownBase = ({ children, ...rest }: PropsWithChildren) => {
  return (
    <>
      <div className="absolute z-[900] mt-[50rem] block">{children}</div>
    </>
  );
};

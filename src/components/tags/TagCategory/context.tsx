import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type TagCategoryContext = [boolean, Dispatch<SetStateAction<boolean>>];

const TagCategoryContext = createContext(null as unknown as TagCategoryContext);
export const useTagCategoryContext = () => useContext(TagCategoryContext);

export const TagCategoryProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TagCategoryContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </TagCategoryContext.Provider>
  );
};

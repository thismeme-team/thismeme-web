import { css } from "twin.macro";

import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { SSRSuspense } from "@/components/common/Suspense";

import { CategoryContent } from "./CategoryContent";
import { useTagCategoryContext } from "./context";

export const TagCategory = () => {
  const [isOpen, setIsOpen] = useTagCategoryContext();
  const handleChange = () => setIsOpen((prev) => !prev);

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleChange}>
      <Drawer.Trigger>
        {({ isOpen }) => (
          <div className="pt-8">
            <span className="text-18-bold-140 text-primary-500">Tag</span>
            <span
              css={css`
                display: flex;
                justify-content: center;
                transition-duration: 300ms;
                transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
                ${isOpen && "transform: rotate(180deg)"}
              `}
            >
              <Icon color="primary-500" name="chevronDown" />
            </span>
          </div>
        )}
      </Drawer.Trigger>
      <Drawer.Content direction="top" top="14.4rem">
        <SSRSuspense>
          <CategoryContent />
        </SSRSuspense>
      </Drawer.Content>
    </Drawer>
  );
};

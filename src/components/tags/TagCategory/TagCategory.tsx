import { css } from "twin.macro";

import { Drawer } from "@/common/components/Drawer";
import { Icon } from "@/common/components/Icon";
import { SSRSuspense } from "@/common/components/Suspense";

import { CategoryContent } from "./CategoryContent";
import { useTagCategoryContext } from "./context";

interface Props {
  topOffset: string;
}
export const TagCategory = ({ topOffset }: Props) => {
  const [isOpen, setIsOpen] = useTagCategoryContext();
  const handleChange = () => setIsOpen((prev) => !prev);

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleChange}>
      <Drawer.Trigger className="ga-tag-category-click">
        {({ isOpen }) => (
          <div>
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
      <Drawer.Content direction="top" top={topOffset}>
        <SSRSuspense>
          <CategoryContent key={String(isOpen)} />
        </SSRSuspense>
      </Drawer.Content>
    </Drawer>
  );
};

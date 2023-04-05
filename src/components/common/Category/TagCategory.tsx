import { css } from "twin.macro";

import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { SSRSuspense } from "@/components/common/Suspense";

import { Category } from "./Category";

export const TagCategory = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        {({ isOpen }) => (
          <button className="pt-8">
            <span className="text-18-bold-140 text-primary-500">Tag</span>
            <span
              className="flex w-full cursor-pointer justify-center"
              css={css`
                ${isOpen && "transform: rotate(180deg)"}
              `}
            >
              <Icon color="primary-500" name="chevronDown" />
            </span>
          </button>
        )}
      </Drawer.Trigger>
      <Drawer.Content className="z-[1001] m-auto max-w-[48rem]" direction="top" top="14.4">
        <SSRSuspense>
          <Category />
        </SSRSuspense>
      </Drawer.Content>
    </Drawer>
  );
};

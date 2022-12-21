import type { ComponentMeta } from "@storybook/react";

import { Chip } from ".";

export default {
  title: "components/common/Chip",
  component: Chip,
} as ComponentMeta<typeof Chip>;

//현재는 사이즈(medium,small)만 분리 ! 디자인 시스템 구축 후 더욱 세분화 될 예정
export const RecentSearchChip = () => (
  <Chip
    label="무한도전"
    size="medium"
    type="recent"
    onClick={() => {
      console.log(2);
    }}
  />
);

export const RecommendChip = () => (
  <Chip
    label="박명수"
    size="medium"
    type="recommend"
    onClick={() => {
      console.log(2);
    }}
  />
);

export const MajorTypeChip = () => <Chip label="박명수" size="small" type="major" />;

import "./Chip.css";

import type { ComponentMeta } from "@storybook/react";

import { Chip } from ".";

export default {
  title: "Component/Common/Chip",
  component: Chip,
} as ComponentMeta<typeof Chip>;

//현재는 사이즈(medium,small)만 분리 ! 디자인 시스템 구축 후 더욱 세분화 될 예정
export const RecentSearchChip = () => (
  <Chip
    label="무한도전"
    type="recent"
    size="medium"
    onClick={() => {
      console.log(2);
    }}
  />
);

export const RecommendChip = () => (
  <Chip
    label="박명수"
    type="recommend"
    size="medium"
    onClick={() => {
      console.log(2);
    }}
  />
);

export const MajorTypeChip = () => <Chip label="박명수" type="major" size="small" />;

import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Accordion } from ".";

export default {
  title: "components/common/Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = () => <Accordion items={MOCK_ITEMS} />;

const MOCK_ITEMS = [
  {
    id: "1",
    name: "카테고리 명1",
    children: ["개발자", "페페", "유머"],
  },
  {
    id: "2",
    name: "카테고리 명2",
    children: ["에브리타임", "시험기간"],
  },
];

export const Default = Template.bind({});

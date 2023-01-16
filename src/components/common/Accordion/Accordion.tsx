import type { AccordionContentProps, AccordionTriggerProps } from "@radix-ui/react-accordion";
import * as RadixAccordion from "@radix-ui/react-accordion";
import type { Ref } from "react";
import { forwardRef } from "react";

import { Icon } from "../Icon";

interface Props {
  items: {
    id: string;
    name: string;
    children: string[];
  }[];
  onClickItem?: (value: string) => void;
}

export const Accordion = ({ items, onClickItem }: Props) => {
  return (
    <RadixAccordion.Root collapsible className="w-full min-w-300" type="single">
      {items.map((item) => (
        <RadixAccordion.Item key={item.id} value={item.id}>
          <AccordionTrigger>{item.name}</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-16 py-16 px-50 text-16-semibold-130">
              {item.children.map((child) => (
                <li key={child}>
                  <button onClick={() => onClickItem?.(child)}>{child}</button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};

const AccordionTrigger = forwardRef(
  (
    { children, ...props }: AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined,
  ) => (
    <RadixAccordion.Header>
      <RadixAccordion.Trigger
        {...props}
        className="flex w-full items-center justify-between gap-8 rounded-full px-16 py-12 text-16-semibold-130 hover:bg-light-gray-20 data-[state=open]:bg-light-gray-10 [&>#chevronDown]:data-[state=open]:rotate-180"
        ref={forwardedRef}
      >
        <div className="h-24 w-24 rounded-full bg-light-gray-30"></div>
        <span className="flex-grow text-left">{children}</span>
        <Icon
          aria-hidden
          className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
          id="chevronDown"
          name="chevronDown"
        />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef(
  (
    { children, ...props }: AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined,
  ) => (
    <RadixAccordion.Content
      {...props}
      className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
      ref={forwardedRef}
    >
      {children}
    </RadixAccordion.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";

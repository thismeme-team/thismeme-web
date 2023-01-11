import type { AccordionContentProps, AccordionTriggerProps } from "@radix-ui/react-accordion";
import * as Accordion from "@radix-ui/react-accordion";
import type { Ref } from "react";
import { forwardRef } from "react";

import { Icon } from "../Icon";

export const SideBar = () => {
  return (
    <Accordion.Root collapsible className="w-full min-w-300" type="single">
      <Accordion.Item className="bg-white" value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-16 py-16 px-50 text-16-semibold-130">
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
          </ul>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="bg-white" value="item-2">
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-16 py-16 px-50 text-16-semibold-130">
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
          </ul>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="bg-white" value="item-3">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-16 py-16 px-50 text-16-semibold-130">
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
          </ul>
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

const AccordionTrigger = forwardRef(
  (
    { children, ...props }: AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined,
  ) => (
    <Accordion.Header>
      <Accordion.Trigger
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
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef(
  (
    { children, ...props }: AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined,
  ) => (
    <Accordion.Content
      {...props}
      className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
      ref={forwardedRef}
    >
      {children}
    </Accordion.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";

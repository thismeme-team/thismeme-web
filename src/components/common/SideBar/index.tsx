import * as Accordion from "@radix-ui/react-accordion";
import type { Ref } from "react";
import { forwardRef } from "react";

import Icon from "../Icon";

const SideBar = () => {
  return (
    <Accordion.Root className="w-full min-w-[300px]" type="single" collapsible>
      <Accordion.Item className="bg-white" value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent className="overflow-hidden data-[state=open]:animate-[slideDown_300ms_cubic-bezier(0.87,0,0.13,1)] data-[state=closed]:animate-[slideUp_300ms_cubic-bezier(0.87,0,0.13,1)]">
          <ul className="flex flex-col gap-16 py-16 px-50 text-semi-bold">
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
          </ul>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="bg-white" value="item-2">
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent className="overflow-hidden data-[state=open]:animate-[slideDown_300ms_cubic-bezier(0.87,0,0.13,1)] data-[state=closed]:animate-[slideUp_300ms_cubic-bezier(0.87,0,0.13,1)]">
          <ul className="flex flex-col gap-16 py-16 px-50 text-semi-bold">
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
            <li>hihihihihihihi</li>
          </ul>
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item className="bg-white" value="item-3">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent className="overflow-hidden data-[state=open]:animate-[slideDown_300ms_cubic-bezier(0.87,0,0.13,1)] data-[state=closed]:animate-[slideUp_300ms_cubic-bezier(0.87,0,0.13,1)]">
          <ul className="flex flex-col gap-16 py-16 px-50 text-semi-bold">
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

type AccordionTriggerProps = Accordion.AccordionTriggerProps;
const AccordionTrigger = forwardRef(
  (
    { children, ...props }: AccordionTriggerProps,
    forwardedRef: Ref<HTMLButtonElement> | undefined,
  ) => (
    <Accordion.Header>
      <Accordion.Trigger
        {...props}
        className="flex w-full items-center justify-between gap-8 rounded-full px-16 py-12 text-semi-bold hover:bg-light-gray-20 data-[state=open]:bg-light-gray-10 [&>#downIcon]:data-[state=open]:rotate-180"
        ref={forwardedRef}
      >
        <div className="h-24 w-24 rounded-full bg-light-gray-30"></div>
        <span className="flex-grow text-left">{children}</span>
        <Icon
          name="downIcon"
          id="downIcon"
          className="transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = Accordion.AccordionContentProps;
const AccordionContent = forwardRef(
  (
    { children, ...props }: AccordionContentProps,
    forwardedRef: Ref<HTMLDivElement> | undefined,
  ) => (
    <Accordion.Content {...props} ref={forwardedRef}>
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";

export default SideBar;

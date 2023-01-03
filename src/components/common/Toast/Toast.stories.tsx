import { Button } from "@/components/common/Button";
import type { Toast } from "@/components/common/Toast/types";
import { useToast } from "@/components/common/Toast/useToast";

export default {
  title: "components/common/Toast",
  component: null,
  argTypes: {
    message: {
      control: "text",
      defaultValue: "hello",
    },
    icon: {
      control: "radio",
      options: ["share", "cake", "download"],
    },
    duration: {
      control: {
        type: "range",
        min: 500,
        max: 3000,
        step: 100,
      },
    },
    className: {
      control: "text",
    },
  },
};

export const Default = ({ message, ...rest }: Toast) => {
  const { show } = useToast();
  const handleClick = () => show(message, rest);

  return (
    <Button className="bg-yellow-200" size="large" onClick={handleClick}>
      toast trigger
    </Button>
  );
};

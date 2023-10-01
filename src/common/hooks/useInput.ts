import type { ChangeEvent } from "react";
import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue("");
  };

  return { value, onChange, onReset };
};

import type { Dispatch, PropsWithChildren } from "react";
import { createContext, useContext, useReducer } from "react";

import type { Toast } from "@/components/common/Toast/types";

const ToastContext = createContext<Toast[]>([]);
const SetToastContext = createContext<Dispatch<Action>>(() => null);

type Action =
  | {
      type: "add";
      toast: Toast;
    }
  | { type: "remove"; id: number };

export const useToastContext = () => useContext(ToastContext);
export const useSetToastContext = () => useContext(SetToastContext);

const reducer = (state: Toast[], action: Action) => {
  switch (action.type) {
    case "add":
      return state.concat(action.toast);
    case "remove":
      return state.filter((toast) => toast.id !== action.id);
  }
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ToastContext.Provider value={state}>
      <SetToastContext.Provider value={dispatch}>{children}</SetToastContext.Provider>
    </ToastContext.Provider>
  );
};

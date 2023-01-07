import type { Dispatch, PropsWithChildren } from "react";
import { createContext, useContext, useReducer } from "react";

import type { Toast } from "@/components/common/Toast/types";

const ToastContext = createContext<Toast[]>([]);
const SetToastContext = createContext<Dispatch<SetToastAction>>(() => null);

type SetToastAction =
  | {
      type: "add";
      toast: Toast;
    }
  | { type: "dismiss"; id: number }
  | { type: "remove"; id: number };

export const useToastContext = () => useContext(ToastContext);
export const useSetToastContext = () => useContext(SetToastContext);

const reducer = (state: Toast[], action: SetToastAction) => {
  switch (action.type) {
    case "add":
      return state.concat({ ...action.toast });
    case "dismiss":
      return state.map((toast) =>
        toast.id === action.id ? { ...toast, visible: false } : { ...toast },
      );
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

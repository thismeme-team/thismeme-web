import type { ComponentType } from "react";

import { useAuth } from "@/application/hooks";
import { SignUpModal } from "@/components/common/Modal";

export const withAuthForComponent = (WrappedComponent: ComponentType) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuth = () => {
    const { isLogin } = useAuth();
    return (
      <>
        isLogin ? <WrappedComponent />: <SignUpModal></SignUpModal>
      </>
    );
  };
  ComponentWithAuth.displayName = `withAuthForComponent(${displayName})`;
  return ComponentWithAuth;
};

import type { ComponentType } from "react";

import { useAuth } from "@/application/hooks";

export const withAuthForComponent = (WrappedComponent: ComponentType) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuth = () => {
    const { isLogin } = useAuth();
    return <WrappedComponent />;
  };
  ComponentWithAuth.displayName = `withAuthForComponent(${displayName})`;
  return ComponentWithAuth;
};

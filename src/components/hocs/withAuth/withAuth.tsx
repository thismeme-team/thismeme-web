import { useRouter } from "next/router";
import type { ComponentType } from "react";
import { useEffect } from "react";

import { useAuth } from "@/application/hooks";

export const withAuth = (WrappedComponent: ComponentType) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuth = () => {
    const { isLogin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLogin) {
        router.replace("/");
      }
    }, [isLogin, router]);

    return <WrappedComponent />;
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;
  return ComponentWithAuth;
};

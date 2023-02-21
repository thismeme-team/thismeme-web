import { useRouter } from "next/router";
import type { ComponentType } from "react";
import { useEffect } from "react";

import { useAuth, useToast } from "@/application/hooks";

export const withAuth = (WrappedComponent: ComponentType) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithAuth = () => {
    const { isLogin, isLoading } = useAuth();
    const router = useRouter();
    const { show } = useToast();

    useEffect(() => {
      if (!isLoading && !isLogin) {
        router.replace("/");
        show("로그인 후 이용해주세요.");
      }
    }, [isLogin, isLoading, router, show]);

    return <WrappedComponent />;
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;
  return ComponentWithAuth;
};

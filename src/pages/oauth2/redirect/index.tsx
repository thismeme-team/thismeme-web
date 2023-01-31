import Router from "next/router";
import React, { useEffect } from "react";

import { useAuth } from "@/application/hooks";

const KaKaoRedirect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    login(params.get("accessToken") || "TEST");
    Router.push("/");
  }, [login]);

  return <div></div>;
};

export default KaKaoRedirect;

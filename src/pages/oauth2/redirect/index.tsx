import Router from "next/router";
import React, { useEffect } from "react";

import { useAuth } from "@/application/hooks";

const KaKaoRedirect = () => {
  const { login } = useAuth();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("accessToken");
    const nextUrl = new URLSearchParams(location.search).get("nextPageUrl");
    if (token) login(token);
    if (nextUrl) sessionStorage.setItem("nextPageUrl", nextUrl);
    Router.push("/");
  }, [login]);

  return <div></div>;
};

export default KaKaoRedirect;

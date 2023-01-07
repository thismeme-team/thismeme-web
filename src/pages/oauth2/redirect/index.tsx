import Router from "next/router";
import React, { useEffect } from "react";

import { useLocalStorage } from "@/application/hooks";

const KaKaoRedirect = () => {
  const [login, setLogin] = useLocalStorage<boolean>("loginState", { defaultValue: false });

  useEffect(() => {
    setLogin(true);
    Router.push("/");
  }, [setLogin]);

  return <div>Spinner</div>;
};

export default KaKaoRedirect;

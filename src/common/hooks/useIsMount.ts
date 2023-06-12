import { useEffect, useState } from "react";

export const useIsMount = () => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return isMount;
};

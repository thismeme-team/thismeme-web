import { useAuth, useIsMount } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";

import { SignUpModal } from "../../Modal";

export const Profile = () => {
  const { isLogin } = useAuth();

  const isMount = useIsMount();
  if (!isMount) return null;

  return (
    <div className="cursor-pointer">
      {isLogin ? (
        <Icon name="loginprofile" />
      ) : (
        <>
          <SignUpModal />
        </>
      )}
    </div>
  );
};

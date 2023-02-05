import { useAuth, useIsMount } from "@/application/hooks";

import { SignUpModal } from "../../Modal";
import { ProfileModal } from "../../Modal/ProfileModal";

export const Profile = () => {
  const { isLogin } = useAuth();

  const isMount = useIsMount();
  if (!isMount) return null;

  return (
    <div className="cursor-pointer">
      {isLogin ? (
        <div>
          <ProfileModal />
        </div>
      ) : (
        <>
          <SignUpModal />
        </>
      )}
    </div>
  );
};

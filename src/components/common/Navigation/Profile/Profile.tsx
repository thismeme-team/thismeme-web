import { useAuth, useIsMount } from "@/application/hooks";
import { ProfileModal, SignUpModal } from "@/components/common/Modal";

export const Profile = () => {
  const { isLogin } = useAuth();

  const isMount = useIsMount();
  if (!isMount) return null;

  return <>{isLogin ? <ProfileModal /> : <SignUpModal />}</>;
};

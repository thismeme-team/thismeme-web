import { useAuth } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { ProfileModal, useSignUpModalContext } from "@/components/common/Modal";

export const Profile = () => {
  const { isLoading, isLogin } = useAuth();
  const modalProps = useSignUpModalContext();

  if (isLoading) return null;
  if (isLogin) return <ProfileModal />;

  return (
    <>
      <Button className="h-32 w-32" onClick={modalProps.onOpen}>
        <Icon name="notloginprofile" />
      </Button>
    </>
  );
};

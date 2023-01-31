import { useAuth, useIsMount, useModal } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { SignUpModal } from "@/components/common/Modal";

export const Profile = () => {
  const { modalOpen, onOpen, onClose } = useModal();
  const { isLogin } = useAuth();

  const isMount = useIsMount();
  if (!isMount) return null;

  return (
    <div className="cursor-pointer">
      {isLogin ? (
        <Icon name="loginprofile" />
      ) : (
        <>
          <Icon name="notloginprofile" onClick={onOpen} />
          {modalOpen && <SignUpModal onClose={onClose} />}
        </>
      )}
    </div>
  );
};

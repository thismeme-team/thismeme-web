import { useAuth, useIsMount, useModal } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { SignUpModal } from "@/components/common/Modal";

export const Profile = () => {
  const { open, onOpen, onClose } = useModal();
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
          {open && <SignUpModal onClose={onClose} />}
        </>
      )}
    </div>
  );
};

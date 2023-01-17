import { useIsMount, useModal } from "@/application/hooks";
import { safeLocalStorage } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { SignUpModal } from "@/components/common/Modal";

export const Profile = () => {
  const { modalOpen, onOpen, onClose } = useModal();
  const isMount = useIsMount();
  if (!isMount) return null;
  const loginState = safeLocalStorage.get("loginState");

  return (
    <div className="cursor-pointer">
      {loginState ? (
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

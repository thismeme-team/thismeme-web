import { useState } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const onOpen = () => {
    setModalOpen(true);
  };
  const onClose = () => {
    setModalOpen(false);
  };

  return { modalOpen, onOpen, onClose };
};

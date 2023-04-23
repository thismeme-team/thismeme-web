export type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => JSX.Element;

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  hideModal: () => void;
};
export default function ScreenOverlay({ children, hideModal }: Props) {
  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-80"
        onClick={hideModal}
      />
      <div className="relative shadow-2xl">{children}</div>
    </div>
  );
}

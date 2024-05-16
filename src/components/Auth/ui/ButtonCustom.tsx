import { FC, ReactNode } from "react";

interface IButtonProps {
  label: string | ReactNode;
  disabled?: boolean;
  сlick?: () => void;
}

export const ButtonCustom: FC<IButtonProps> = ({ label, disabled, сlick }) => (
  <button
    onClick={сlick}
    disabled={disabled}
    className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600/50 active:bg-blue-800/50 transition-all disabled:opacity-75 disabled:cursor-auto disabled:hover:bg-blue-500"
  >
    {label}
  </button>
);

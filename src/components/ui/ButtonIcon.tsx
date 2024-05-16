import { FC, ReactNode } from "react";

type Props = {
  onClick: () => void;
  children?: ReactNode;
  visible?: boolean;
  sm?: boolean;
  text?: string;
};

export const ButtonIcon: FC<Props> = ({
  onClick,
  visible,
  children,
  sm,
  text,
}) => (
  <button
    onClick={onClick}
    className={
      (sm ? "" : "max-sm:hidden ") +
      (visible ? "visible " : "invisible ") +
      "p-3 max-sm:px-3 max-sm:py-2 rounded-full group-hover:visible max-sm:visible max-sm:dark:bg-slate-700 max-sm:bg-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
    }
  >
    <div className="flex items-center gap-2">
      {children}
      <span className="max-sm:block max-sm:text-sm hidden text-slate-500">
        {text}
      </span>
    </div>
  </button>
);

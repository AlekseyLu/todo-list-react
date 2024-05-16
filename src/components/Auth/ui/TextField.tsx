import { ChangeEvent, FC, RefObject } from "react";
import { ReducerActions } from "../api/types.auth";

interface IProps {
  label: string;
  type: string;
  actionField: string;
  value: string;
  dispatch: ({ type, payload }: ReducerActions) => void;
  focusRef?: RefObject<HTMLInputElement>;
  isDisabled?: boolean;
  blurOut?: (arg: boolean) => void;
  onChange?: (arg: string) => void;
}

export const TextField: FC<IProps> = ({
  label,
  actionField,
  type,
  value,
  dispatch,
  focusRef,
  onChange,
  isDisabled,
}) => {
  const handleChangeField = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      dispatch({ type: actionField, payload: e.target.value });
    }
  };

  return (
    <label
      className={"flex flex-col gap-2 " + (isDisabled ? "opacity-50" : "")}
    >
      <span className="text-xl dark:text-white text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={handleChangeField}
        ref={focusRef}
        disabled={isDisabled}
        className="px-2 py-1 rounded text-xl dark:text-white text-slate-700 dark:bg-slate-800 bg-slate-100 required hover:outline-none focus:outline-none focus:ring disabled:text-slate-500"
      />
    </label>
  );
};

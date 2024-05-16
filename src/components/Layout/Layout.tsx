import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const Layout: FC<IProps> = ({ children }) => {
  return <section className="max-w-xl m-auto">{children}</section>;
};

interface IProps {
  title: string;
  size: "1rem" | "1.2rem" | "1.5rem" | "2rem" | "3rem";
  dark?: boolean;
}

export const Title = ({ title, size, dark }: IProps) => (
  <h3
    className={dark ? "dark:text-white" : "text-white"}
    style={{ fontSize: size }}
  >
    {title}
  </h3>
);

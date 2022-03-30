import Button, { ButtonProps as ButtonUiProps } from "@mui/material/Button";

import styles from "./styles.module.scss";

type ButtonProps = {
  children: React.ReactNode,
} & ButtonUiProps;

export function ButtonComponent({ children,...props }: ButtonProps) {
  return (
    <Button
      className={styles.buttonContainer}
      {...props}
    >
      {children}
    </Button>
  );
}

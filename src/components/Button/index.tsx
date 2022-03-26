import { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.scss";

type ButtonProps = {
  children?: React.ReactNode,
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonComponent({ children, ...props }: ButtonProps) {
  return (
    <div className={styles.buttonContainer} >
      <button {...props}>
        {children}
      </button>
    </div>
  );
}

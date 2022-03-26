import Link, { LinkProps as NextLinkProps } from "next/link";

import styles from "./styles.module.scss";

type LinkProps = {
  children?: React.ReactNode,
} & NextLinkProps;

export function LinkComponent({children, href, ...props} : LinkProps) {
  return (
    <div className={styles.linkContainer}>
      <Link href={href} {...props}>{children}</Link>
    </div>
  );
}

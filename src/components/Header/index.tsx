import { LinkComponent } from "../Link";
import styles from "./styles.module.scss";

export function HeaderComponent() {

  return (
    <header className={styles.headerContainer}>
      <nav>
        <label><LinkComponent href={"/"}>Tallow Comics</LinkComponent></label>
          <ul>
            <li><LinkComponent href={"/"}>Home</LinkComponent></li>
          </ul>
      </nav>
    </header>
  );
}

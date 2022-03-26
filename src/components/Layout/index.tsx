import { HeaderComponent } from "../Header";
import styles from "./styles.module.scss";

function LayoutComponent() {
  return (
    <div className={styles.layoutContainer}>
      <HeaderComponent />
    </div>
  );
}

export default LayoutComponent;

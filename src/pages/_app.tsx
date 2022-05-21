import "../styles/global.scss";

import LayoutComponent from "../components/Layout";
import styles from "../styles/app.module.scss";

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.wrapper}>
      <main>
        <LayoutComponent />
        <section className={styles.content}>
          <Component {...pageProps} />
        </section>
      </main>
    </div>
  );
}

export default MyApp;

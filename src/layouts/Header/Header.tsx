import Link from "next/link";

import { PageWrapper } from "@src/layouts/PageWrapper";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header_layout}>
      <PageWrapper>
        <div className={styles.header_content}>
          <Link href="/">
            <a className={styles.header_home_title}>Molohey</a>
          </Link>
          {/*
          aboutページ内作成していないため一時非表示
          <div className={styles.header_links}>
            <Link href="/about">
              <a className={styles.header_links_item}>About</a>
            </Link>
          </div>*/}
        </div>
      </PageWrapper>
    </header>
  );
};

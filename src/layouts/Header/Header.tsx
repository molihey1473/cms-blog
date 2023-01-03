import Link from "next/link";

import { Wrapper } from "@src/components/Wrapper";

import styles from "@src/styles/components/Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header_layout}>
      <Wrapper>
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
      </Wrapper>
    </header>
  );
};

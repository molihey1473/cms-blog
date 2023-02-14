import { member } from "@src/utils/member";

import { PageWrapper } from "@src/layouts/PageWrapper";

import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer_layout}>
      <PageWrapper>
        <div className={styles.footer_content}>
          <div className={styles.footer_author}>
            <p>
              created by <a href={member.twitterName}>@Morihey</a>
            </p>
            <p>© 2021</p>
          </div>
        </div>
      </PageWrapper>
    </footer>
  );
};

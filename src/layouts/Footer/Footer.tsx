import { Wrapper } from "@src/components/Wrapper";

import { member } from "@src/utils/member";

import styles from "@src/styles/components/Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer_layout}>
      <Wrapper>
        <div className={styles.footer_content}>
          <div className={styles.footer_author}>
            <p>
              created by <a href={member.twitterName}>@Morihey</a>
            </p>
            <p>© 2021</p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

import { Wrapper } from "@src/components/Wrapper";
import styles from "@src/styles/components/Footer.module.scss";
export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer_layout}>
      <Wrapper>
        <div className={styles.footer_content}>
          <div className={styles.footer_author}>
            <p>
              created by <a href="https://twitter.com/roy1473">@Morihey</a>
            </p>
            <p>© 2021</p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

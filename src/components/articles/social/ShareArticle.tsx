import { TwitterIcon } from "@src/components/icons/TwitterIcon";

import styles from "@src/styles/components/articles/social/ShareArticle.module.scss";
export const ShareArticle: React.FC<{
  title: string;
  id: string;
}> = (props) => {
  const { title, id } = props;
  return (
    <div className={styles.share_button_content}>
      <div className={styles.share_title}>Share</div>
      <a
        className={styles.share_button}
        href={`http://twitter.com/share?url=https://blog-sage-nine.vercel.app/articles/${id}&text=${encodeURIComponent(
          title
        )}`}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <TwitterIcon />
      </a>
    </div>
  );
};

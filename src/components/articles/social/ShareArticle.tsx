export const ShareArticle: React.FC<{ url: string }> = (props) => {
  return (
    <div className={styles.share_button_content}>
      <div className={styles.share_title}>Share</div>
      <a
        className={styles.share_button}
        href={`http://twitter.com/share?url=https://blog-sage-nine.vercel.app/articles/${id}.tsx&text=${encodeURI(
          title
        )}`}
      >
        <TwitterIcon />
      </a>
    </div>
  );
};

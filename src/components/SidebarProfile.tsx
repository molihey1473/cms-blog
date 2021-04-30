import styles from "@src/styles/pages/blog/BlogContent.module.scss";
export const SidebarProfile: React.FC = () => {
  return (
    <div className={styles.blog_sidebar_aside_profile}>
      <a href="/">
        <img src="/avatar/profile.png" alt="profile" width="60" height="60" />
      </a>
      <a href="/">Morihey</a>
      <p className={styles.blog_sidebar_aside_profile_description}>
        プログラミングを勉強しています。Railsを勉強後、フロントエンドの魅力に気づきました。このブログでは開発において躓いたこと、実装したことのアウトプットを行っております。
      </p>

      <div className={styles.blog_sidebar_aside_profile_links}></div>
    </div>
  );
};

import Link from "next/link";
import styles from "@src/styles/pages/blog/BlogContent.module.scss";
export const SidebarProfile: React.FC = () => {
  return (
    <div className={styles.blog_sidebar_aside_profile}>
      <Link href="/">
        <a>
          <img src="/avatar/profileIcon.png" alt="profile" width="60" />
        </a>
      </Link>
      <Link href="/">
        <a className={styles.blog_sidebar_author}>Morihey</a>
      </Link>
      <div className={styles.blog_sidebar_profile_icon_links}>
        <a href="" rel="nofollow noopener noreferrer" target="_blank">
          <svg viewBox="0 0 27 27" width="30" height="30">
            <path
              fill="currentColor"
              d="M13.4 1.2C7 1 1.8 6 1.7 12.4v.5c0 5.1 3.2 9.8 8.2 11.5.6.1.7-.2.7-.6v-2.9s-3.3.6-4-1.5c0 0-.6-1.3-1.3-1.8 0 0-1.1-.7.1-.7.7.1 1.5.6 1.8 1.2.6 1.2 2.2 1.7 3.4 1h.1c.1-.6.4-1.2.7-1.6-2.7-.4-5.4-.6-5.4-5.2 0-1.1.5-2.1 1.2-2.8 0-1.1 0-2.2.3-3.2 1-.4 3.3 1.3 3.3 1.3 2-.6 4-.6 6 0 0 0 2.2-1.6 3.2-1.2.5 1 .5 2.2.1 3.2.7.7 1.2 1.8 1.2 2.8 0 4.5-2.8 5-5.5 5.2.6.6.9 1.3.7 2.2v4c0 .5.2.6.7.6 4.9-1.7 8.2-6.2 8-11.5.1-6.4-5.1-11.6-11.6-11.6-.1-.1-.2-.1-.2-.1z"
            ></path>
          </svg>
        </a>

        <a href="" rel="nofollow noopener noreferrer" target="_blank">
          <svg
            viewBox="328 355 335 276"
            width="30"
            height="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#3BA9EE"
              d="
M 630, 425
A 195, 195 0 0 1 331, 600
A 142, 142 0 0 0 428, 570
A  70,  70 0 0 1 370, 523
A  70,  70 0 0 0 401, 521
A  70,  70 0 0 1 344, 455
A  70,  70 0 0 0 372, 460
A  70,  70 0 0 1 354, 370
A 195, 195 0 0 0 495, 442
A  67,  67 0 0 1 611, 380
A 117, 117 0 0 0 654, 363
A  65,  65 0 0 1 623, 401
A 117, 117 0 0 0 662, 390
A  65,  65 0 0 1 630, 425
Z"
            />
          </svg>
        </a>
      </div>
      <p className={styles.blog_sidebar_aside_profile_description}>
        プログラミングを勉強しています。Railsを勉強後、フロントエンドの魅力に気づきました。このブログでは開発において躓いたこと、実装したことのアウトプットを行っております。
      </p>

      <div className={styles.blog_sidebar_aside_profile_links}></div>
    </div>
  );
};

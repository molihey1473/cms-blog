import Image from "next/image";

import { GithubIcon, TwitterIcon } from "@src/components/icons";

import { member } from "@src/utils/member";

import styles from "./ArticleAsideProfile.module.scss";

export const ArticleAsideProfile: React.FC = () => {
  const { avatar, name, bio, twitterName, githubName } = member;
  return (
    <div className={styles.md_container}>
      <div className={styles.md_image}>
        <Image src={`${avatar}`} width={80} height={80} alt={`${name}`} />
      </div>

      <div className={styles.md_content}>
        <div className={styles.md_author_name}>{name}</div>
        <p className={styles.md_bio}>{bio}</p>
        <div className={styles.md_bio_link_content}>
          <a className={styles.md_bio_link} href={`${githubName}`}>
            <GithubIcon />
          </a>
          <a className={styles.md_bio_link} href={`${twitterName}`}>
            <TwitterIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

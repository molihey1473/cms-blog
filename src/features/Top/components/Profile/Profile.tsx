import Image from "next/image";

import { GithubIcon } from "@src/components/icons/GithubIcon";
import { TwitterIcon } from "@src/components/icons/TwitterIcon";

import { Member } from "@src/types/types";

import styles from "@src/styles/components/profile.module.scss";

export const Profile: React.FC<{ member: Member }> = (props) => {
  const { avatar, name, bio, twitterName, githubName } = props.member;
  return (
    <div className={styles.article_author_info}>
      <div className={styles.profile_container}>
        <Image
          src={avatar}
          width={120}
          height={120}
          alt={name}
          className={styles.profile_avatar}
        />
        <div className={styles.profile_description}>
          <h1 className={styles.profile_member_name}>{name}</h1>
          <p className={styles.profile_member_bio}>{bio}</p>
          <div className={styles.profile_links}>
            <a className={styles.profile_link_item} href={`${twitterName}`}>
              <TwitterIcon />
            </a>
            <a className={styles.profile_link_item} href={`${githubName}`}>
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

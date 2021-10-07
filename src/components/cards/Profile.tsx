//import { member } from "@src/utils/member";
import { Member } from "@src/types";
import { TwitterIcon } from "@src/components/icons/TwitterIcon";
import { GithubIcon } from "@src/components/icons/GithubIcon";
import styles from "@src/styles/components/profile.module.scss";

export const Profile: React.FC<{ member: Member }> = (props) => {
  const { avatar, name, bio, twitterName, githubName } = props.member;
  return (
    <div className={styles.article_author_info}>
      <div className={styles.profile_container}>
        <img src={avatar} alt={name} className={styles.profile_avatar} />
        <div className={styles.profile_description}>
          <h1 className={styles.profile_member_name}>{name}</h1>
          <p className={styles.profile_member_bio}>{bio}</p>
          <div className={styles.profile_links}>
            <a className={styles.profile_link_item} href={`${githubName}`}>
              <GithubIcon />
            </a>
            <a className={styles.profile_link_item} href={`${twitterName}`}>
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export const FooterProfile: React.FC<{ member: Member }> = (props) => {
  const { avatar, name, bio, twitterName, githubName } = props.member;
  return (
    <div className={styles.article_author_info}>
      <div className={styles.profile_container}>
        <div>
          <img src={`${avatar}`} alt={`${name}`} />
        </div>
        <div>
          <a href={`${githubName}`}></a>
          <a href={`${twitterName}`}></a>
        </div>
        footer
      </div>
    </div>
  );
};

//import { member } from "@src/utils/member";
import { Member } from "@src/types";
import { TwitterIcon } from "@src/components/icons/TwitterIcon";
import styles from "@src/styles/components/profile.module.scss";

export const Profile: React.FC<{ member: Member }> = (props) => {
  const { avatar, name, bio, twitterName } = props.member;
  return (
    <div className={styles.profile_layout}>
      <div className={styles.profile_content}>
        <div>
          <img src={avatar} alt={name} width={250} />
        </div>
        <div className={styles.profile_description}>
          <h1>{name}</h1>
          <p>{bio}</p>
          <div className={styles.profile_links}>
            <a href={`https://twitter.com/${twitterName}`}>
              <TwitterIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

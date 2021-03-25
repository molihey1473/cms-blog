//import { member } from "@src/utils/member";
import { Member } from "@src/types";
import styles from "@src/styles/components/profile.module.scss";
export const Profile: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <div className={styles.profile_layout}>
      <div className={styles.profile_content}>
        <div>
          <img src={member.avatar} alt={member.name} width={250} />
        </div>
        <div className={styles.profile_description}></div>
      </div>
    </div>
  );
};

import { Twemoji } from "@src/components/icons/Twemoji";

import styles from "@src/styles/pages/blog/BlogList.module.scss";

export const TagTitle: React.FC<{ title: string }> = (props) => {
  return (
    <div className={styles.tag_name_container}>
      <h1 className={styles.tag_name}>
        <Twemoji emoji={"✊"} />
        {`#${props.title}`}
      </h1>
    </div>
  );
};

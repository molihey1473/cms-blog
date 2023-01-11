import { TwitterIcon } from "@src/components/icons/TwitterIcon";

import { getShareUrlPath } from "@src/utils/helper";

import styles from "./ArticleShareButton.module.scss";
export interface Props {
  readonly title: string;
  readonly id: string;
}
export const ArticleShareButton: React.FC<Props> = (props) => {
  const { title, id } = props;
  return (
    <div className={styles.share_button_content}>
      <div className={styles.share_title}>Share</div>
      <a
        className={styles.share_button}
        href={getShareUrlPath(id, title)}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <TwitterIcon />
      </a>
    </div>
  );
};

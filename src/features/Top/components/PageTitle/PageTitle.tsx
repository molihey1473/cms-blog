import { memo } from "react";

import styles from "./PageTitle.module.scss";
export const PageTitle: React.FC<{ title: string }> = memo((props) => {
  return <h2 className={styles.page_content_title}>{props.title}</h2>;
});
PageTitle.displayName = "PageTitle";

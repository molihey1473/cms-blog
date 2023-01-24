import React, { ReactNode } from "react";

import styles from "@src/styles/components/View.module.scss";

// 全ページ共通 Viewコンポーネント
export const PageView: React.FC<{ children: ReactNode }> = (props) => {
  return <div className={styles.main_container}>{props.children}</div>;
};

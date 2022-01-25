import React, { ReactNode } from "react";
import styles from "@src/styles/components/View.module.scss";
/*各ページのレイアウト
 現在、記事ページ、ランディングページ等全て共通Wrapper component(同じ画面幅)
*/

// 全ページ共通 Viewコンポーネント
export const ViewContainer: React.FC<{ children: ReactNode }> = (props) => {
  return <div className={styles.main_container}>{props.children}</div>;
};

// 記事一覧用View　コンポーネント
export const ViewMainContainer: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return <div className={styles.main_container}>{props.children}</div>;
};

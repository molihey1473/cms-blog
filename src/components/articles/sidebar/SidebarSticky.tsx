import React from "react";
import styles from "@src/styles/components/articles/ArticleSidebar.module.scss";

export const SidebarSticky: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return (
    <>
      <div className={styles.sticky_container}>{props.children}</div>
    </>
  );
};

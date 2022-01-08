import styles from "@src/styles/components/Wrapper.module.scss";
import { ReactNode } from "react";
//ページ共通Warpper
export const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.default}>{props.children}</div>;
};
//共通よりもwidthが広いWrapper
export const WideWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.wide}>{props.children}</div>;
};
export const ArticleWrapper: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  return <div className={styles.article}>{props.children}</div>;
};

//min-heightを含んだmain view用wrapper
export const MainViewWrapper: React.FC<{ children: ReactNode }> = (props) => {
  const widthstyle: { [key: string]: string } = {
    "min-height": "calc(100vh - 60px)",
  };
  return (
    <div style={widthstyle}>
      <div className={styles.default}>{props.children}</div>;
    </div>
  );
};

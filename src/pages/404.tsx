import { NextPage } from "next";

import styles from "@src/styles/pages/Error.module.scss";

const Error: NextPage = () => {
  return (
    <>
      <div className={styles.error_page_layout}>
        <div className={styles.error_status}>404</div>
        <h1 className={styles.error_message}>Page not found</h1>
      </div>
    </>
  );
};
export default Error;

import { NextPage } from "next";

import { Wrapper } from "@src/components/Wrapper";

import styles from "@src/styles/pages/Error.module.scss";

const Error: NextPage = () => {
  return (
    <>
      <div className={styles.error_page_layout}>
        <Wrapper>
          {" "}
          <div className={styles.error_status}>404</div>
          <h1 className={styles.error_message}>Page not found</h1>
        </Wrapper>
      </div>
    </>
  );
};
export default Error;

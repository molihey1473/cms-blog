import Link from "next/link";

import styles from "@src/styles/pages/blog/BlogContent.module.scss";

export const ClearPreviewMode: React.FC = () => {
  return (
    <Link href={"/api/clearPreview"}>
      <a className={styles.clear_preview_mode}>** preview mode 解除 **</a>
    </Link>
  );
};

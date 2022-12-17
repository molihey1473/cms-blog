import Link from "next/link";

import styles from "./ArticleClearPreviewMode.module.scss";
interface Props {
  preview: boolean;
}

export const ClearPreviewMode: React.FC<Props> = (props) => {
  return (
    <>
      {props.preview && (
        <Link href={"/api/clearPreview"}>
          <a className={styles.clear_preview_mode}>** preview mode 解除 **</a>
        </Link>
      )}
    </>
  );
};

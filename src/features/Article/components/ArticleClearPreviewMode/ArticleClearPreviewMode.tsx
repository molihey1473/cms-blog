import Link from "next/link";

import styles from "./ArticleClearPreviewMode.module.scss";
interface Props {
  preview: boolean;
}

export const ArticleClearPreviewMode: React.FC<Props> = (props) => {
  return (
    <>
      {props.preview && (
        <Link href={"/api/clearPreview"} className={styles.clear_preview_mode}>
          ** preview mode 解除 **
        </Link>
      )}
    </>
  );
};

import Link from "next/link";

import { getTagPath } from "@src/utils/helper";

import styles from "./TagList.module.scss";

//interface Props {
//  name: string;
//}
export const TagList: React.FC<{ tags: string[] | [] }> = (props) => {
  const { tags } = props;
  return (
    <>
      {tags.length !== 0 && (
        <div className={styles.flat_link_tags}>
          {tags.map((item, i) => (
            <Link
              key={i}
              href={getTagPath(item)}
              className={styles.flat_items_tags}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

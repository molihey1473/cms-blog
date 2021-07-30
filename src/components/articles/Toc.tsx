import Link from "next/link";
import styles from "@src/styles/components/articles/Toc.module.scss";
interface TocList {
  text: string;
  id: string;
  name: string;
}
export const TocList: React.FC<{ toc: TocList[] }> = (props) => {
  const { toc } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>目次</div>
        <div>
          <ol className={styles.list}>
            {toc.map((item, i) => (
              <TocItem key={`toc-item-${i}`} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};
export const TocItem: React.FC<{ item: TocList }> = (props) => {
  const { id, name, text } = props.item;
  return (
    <li className={name === "h1" ? styles.heading : styles.second_heading}>
      <a className={styles.heading_item} href={encodeURI(`#${id}`)}>
        {text}
      </a>
    </li>
  );
};

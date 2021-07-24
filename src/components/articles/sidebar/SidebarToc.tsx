import styles from "@src/styles/components/articles/SidebarToc.module.scss";

//src/components/articles/Toc.tsxと同じinterface（要修正！）
interface TocList {
  text: string;
  id: string;
  name: string;
}
export const SidebarTocList: React.FC<{ toc: TocList[] }> = (props) => {
  const { toc } = props;
  return (
    <>
      <div className={styles.blog_sidebar_toc}>
        <div className={styles.blog_sidebar_toc_title}>目次</div>
        <div className={styles.blog_sidebar_toc_area}>
          <ol className={styles.blog_sidebar_toc_list}>
            {toc.map((item, i) => (
              <SidebarTocItem key={`sidebar-toc-${i}`} item={item} />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};
export const SidebarTocItem: React.FC<{ item: TocList }> = (props) => {
  const { id, name, text } = props.item;
  return (
    <>
      <li className={styles.blog_sidebar_toc_list_item}>
        <a href={encodeURI(`#${id}`)}>{text}</a>
      </li>
    </>
  );
};

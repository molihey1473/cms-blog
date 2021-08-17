import { useState, useCallback } from "react";
import twemoji from "twemoji";
import styles from "@src/styles/components/Navigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  path: string;
  title: string;
  query?: string | undefined;
  emoji?: string;
}

export const CategoryItem: React.FC<Props> = (props) => {
  const { path, query, title, emoji } = props;
  const router = useRouter();
  return (
    <Link href={path}>
      <a className={`${styles.navigation_item}`}>
        <div
          className={`${styles.category_list_emoji} ${
            router.pathname === path ? styles.is_active : ""
          }`}
          dangerouslySetInnerHTML={{ __html: emoji }}
        />
        <div className={styles.link_name}>{title}</div>
      </a>
    </Link>
  );
};
export const CategoryList: React.FC = () => {
  return (
    <nav className={styles.navigation_content}>
      <CategoryItem path="/" title="All" emoji={twemoji.parse("📚")} />

      <CategoryItem
        path="/category/tech"
        query="tech"
        title="Tech"
        emoji={twemoji.parse("🧬", {
          folder: "svg",
          ext: ".svg",
        })}
      />
      <CategoryItem
        path="/category/diary"
        query="diary"
        title="Diary"
        emoji={twemoji.parse("🗞", {
          folder: "svg",
          ext: ".svg",
        })}
      />
      <CategoryItem
        path="/category/others"
        title="Others"
        emoji={twemoji.parse("🚀", {
          folder: "svg",
          ext: ".svg",
        })}
      />
    </nav>
  );
};
export const CategoryFlatList: React.FC = () => {
  return (
    <>
      <nav className={styles.navigation_content}>
        <CategoryFlatItem path="/" title="All" emoji={twemoji.parse("📚")} />

        <CategoryFlatItem
          path="/category/tech"
          query="tech"
          title="Tech"
          emoji={twemoji.parse("🧬", {
            folder: "svg",
            ext: ".svg",
          })}
        />
        <CategoryFlatItem
          path="/category/diary"
          query="diary"
          title="Diary"
          emoji={twemoji.parse("🗞", {
            folder: "svg",
            ext: ".svg",
          })}
        />
        <CategoryFlatItem
          path="/category/others"
          title="Others"
          emoji={twemoji.parse("🚀", {
            folder: "svg",
            ext: ".svg",
          })}
        />
      </nav>
    </>
  );
};
export const CategoryFlatItem: React.FC<Props> = (props) => {
  const { path, query, title, emoji } = props;
  const router = useRouter();
  return (
    <>
      <Link href={path}>
        <a
          className={`${styles.flat_name} ${
            router.pathname === path ? styles.flat_active : ""
          }`}
        >
          <div
            className={styles.categoryFlat_emoji}
            dangerouslySetInnerHTML={{ __html: emoji }}
          />
          {title}
        </a>
      </Link>
    </>
  );
};

import { useState, useCallback } from "react";
import twemoji from "twemoji";
import style from "@src/styles/components/Navigation.module.scss";
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
      <a
        className={`${style.navigation_item} ${
          router.pathname === path ? style.is_active : ""
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: emoji }}></div>
        <div>{title}</div>
      </a>
    </Link>
  );
};
export const CategoryList: React.FC = () => {
  return (
    <nav className={style.navigation_content}>
      <CategoryItem path="/" title="All" />
      <CategoryItem
        path="/category/others"
        title="Others"
        emoji={twemoji.parse("✌️")}
      />
      <CategoryItem
        path="/category/tech"
        query="tech"
        title="Tech"
        emoji={twemoji.parse("✋")}
      />
      <CategoryItem
        path="/category/diary"
        query="diary"
        title="Diary"
        emoji={twemoji.parse("✊")}
      />
    </nav>
  );
};

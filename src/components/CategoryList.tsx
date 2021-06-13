import { useState, useCallback } from "react";
import style from "@src/styles/components/Navigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  path: string;
  title: string;
}

export const CategoryItem: React.FC<Props> = (props) => {
  const { path, title } = props;
  const router = useRouter();
  return (
    <li>
      <Link href={path}>
        <a className={router.pathname === path ? style.is_active : ""}>
          {title}
        </a>
      </Link>
    </li>
  );
};
export const CategoryList: React.FC = () => {
  return (
    <nav>
      <ul>
        <CategoryItem path="/" title="home" />
        <CategoryItem path="/about" title="about" />
      </ul>
    </nav>
  );
};

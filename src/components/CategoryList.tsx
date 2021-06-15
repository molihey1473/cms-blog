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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
          </svg>
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

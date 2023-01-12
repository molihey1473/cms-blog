import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./CategoryList.module.scss";

interface Props {
  path: string;
  title: string;
}

export const CategoryList: React.FC = () => {
  return (
    <>
      <nav className={styles.navigation_content}>
        <CategoryItems path="/" title="All" />
        <CategoryItems path="/category/others" title="Others" />
      </nav>
    </>
  );
};
export const CategoryItems: React.FC<Props> = (props) => {
  const { path, title } = props;
  const router = useRouter();
  return (
    <>
      <Link href={path}>
        <a
          className={`${styles.item_name} ${
            router.asPath === path ? styles.is_active : ""
          } `}
        >
          {title}
        </a>
      </Link>
    </>
  );
};

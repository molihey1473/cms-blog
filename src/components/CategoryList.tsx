import styles from "@src/styles/components/CategoryList.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
interface Props {
  path: string;
  title: string | null;
}

export const CategoryList: React.FC = () => {
  return (
    <>
      <nav className={styles.navigation_content}>
        <CategoryItems path="/" title="All" />
        <CategoryItems path="/category/tech" title="Tech" />
        <CategoryItems path="/category/diary" title="Diary" />
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

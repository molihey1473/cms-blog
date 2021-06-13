import { useState, useCallback } from "react";
import style from "@src/styles/components/Navigation.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
export const CategoryList: React.FC = () => {
  const router = useRouter();
  return (
    <nav>
      <Link href="/">
        <a className={router.pathname === "/" && style.is_active}> Home</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === "/about" && style.is_active}>about</a>
      </Link>
    </nav>
  );
};

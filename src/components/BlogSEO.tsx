import Head from "next/head";
import { config } from "@blog.config";
interface Props {
  title: string;
  path?: string;
  id?: string;
  image?: string;
}
export const BlogSEO: React.FC<Props> = (props) => {
  const { title, path, image } = props;
  const pageUrl = `${config.siteRoot}${path || ""}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={pageUrl} />
      <meta
        property="og:image"
        content={image || `${config.siteRoot}/ogp/home_ogp.png`}
      />
      <meta property="og:site_name" content="MoliHey" />
      <meta name="twitter:card" content="summary_large_image" />
      {path && <link ref="canonical" href={pageUrl} />}
    </Head>
  );
};

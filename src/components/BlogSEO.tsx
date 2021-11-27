import Head from "next/head";
import { config } from "@blog.config";
interface Props {
  title: string;
  path?: string;
  id?: string;
  image?: string;
  largeImage: boolean;
}
export const BlogSEO: React.FC<Props> = (props) => {
  const { title, path, image, largeImage } = props;
  const pageUrl = `${config.siteRoot}${path || ""}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:site_name" content="MoliHey" />
      {largeImage ? (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="og:image"
            content={image || `${config.siteRoot}/ogp/home_ogp.png`}
          />
        </>
      ) : (
        <>
          <meta name="twitter:card" content="summary" />
          <meta
            property="og:image"
            content={`${config.siteRoot}/avatar/color_profile.png`}
          />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {path && <link ref="canonical" href={pageUrl} />}
    </Head>
  );
};

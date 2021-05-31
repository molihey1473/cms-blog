import Head from "next/head";
interface Props {
  title: string;
  url?: string;
  id?: string;
}
export const BlogSEO: React.FC<Props> = (props) => {
  const { title, url, id } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="" />
      <meta property="og:image" content={""} />
      <meta property="og:site_name" content="MoliHey" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

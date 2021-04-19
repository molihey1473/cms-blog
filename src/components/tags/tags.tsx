import Link from "next/link";
interface Props {
  id: string;
  name: string;
}
export const Tags: React.FC<{ tagLink: Props }> = (props) => {
  const { id, name } = props.tagLink;
  return (
    <>
      <Link href={`/tags/${name.replace(/\./g, "").toLowerCase()}`}>
        <a aria-label={props.tagLink.name}>{props.tagLink.name}</a>
      </Link>
    </>
  );
};

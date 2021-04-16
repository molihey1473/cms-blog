import Link from "next/link";
interface Props {
  name: string;
}
export const Tags: React.FC<{ tagLink: Props }> = (props) => {
  const name = props.tagLink.name;
  return (
    <>
      <Link href={`tags/${props.tagLink.name.replace(".", "")}`}>
        <a aria-label={props.tagLink.name}>{props.tagLink.name}</a>
      </Link>
    </>
  );
};

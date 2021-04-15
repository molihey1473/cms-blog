import Link from "next/link";
interface Props {
  name: string;
}
export const Tags: React.FC<{ tagLink: Props }> = (props) => {
  return (
    <>
      <Link href={props.tagLink.name}>
        <a aria-label={props.tagLink.name}>{props.tagLink.name}</a>
      </Link>
    </>
  );
};

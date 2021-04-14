interface Props {
  tagItem: string[];
}
export const Tags: React.FC<Props> = ({ tagItem }) => {
  return (
    <>
      <span>{tagItem}</span>
    </>
  );
};

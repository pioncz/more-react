import Box from '@/components/Box/Box';

const TableBody = ({
  items,
  children,
}: {
  items: { id: string | number }[];
  children: (item: { id: string | number }) => React.ReactElement;
}) => {
  return <Box>{items.map((item) => children(item))}</Box>;
};

export default TableBody;

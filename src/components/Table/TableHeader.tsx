import Box from '@/components/Box/Box';
import { styled } from '@/stitches.config';

export type TableColumn = {
  id: string;
  label: string;
};

const TableHeader = ({ columns }: { columns: TableColumn[] }) => {
  return (
    <Root>
      {columns.map((column) => (
        <div key={column.id}>{column.label}</div>
      ))}
    </Root>
  );
};

const Root = styled(Box, {
  background: '$gray400',
  borderRadius: '$1',

  '> div': {
    flex: '1 1',
    textAlign: 'start',
    padding: '0 $1',
  },
});

export default TableHeader;

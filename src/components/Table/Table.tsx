import Box from '@/components/Box/Box';
import TableHeader, { TableColumn } from './TableHeader';
import { mapItemToColumns } from './TableHelper';
import { styled } from '@/stitches.config';

function Table<T extends { id: string }>({
  columns,
  data,
  children,
}: {
  columns: TableColumn[];
  data: T[];
  children: (item: T) => React.ReactNode;
}) {
  const rows = data.map((item) => ({
    id: item.id,
    cells: mapItemToColumns(item, columns),
  }));

  return (
    <Root flexDirection="column">
      <TableHeader columns={columns} />
      {rows.map(({ id, cells }) => (
        <Box key={id}>
          {cells.map((c) => (
            <Cell key={c.id} style={{ flex: '1 1' }}>
              {children(c)}
            </Cell>
          ))}
        </Box>
      ))}
    </Root>
  );
}

const Root = styled(Box, {
  textAlign: 'start',
});

const Cell = styled('div', {
  padding: '0 $1',
});

export default Table;

export const mapItemToColumns = (
  item: object,
  columns: { id: string }[],
) => columns.map((c) => c.id).map((columnKey) => item?.[columnKey]);

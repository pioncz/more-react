export function mapItemToColumns<T extends { id: string }>(
  item: T,
  columns: { id: string; label: string }[],
) {
  return columns
    .map((c) => c.id)
    .map((columnKey) =>
      item?.[columnKey as keyof typeof item]
        ? (item[columnKey as keyof typeof item] as T)
        : null,
    )
    .filter((i) => i !== null);
}

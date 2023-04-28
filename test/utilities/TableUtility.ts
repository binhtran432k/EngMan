class TableUtility {
  static tableRawToRecord(table: string[][]): Record<string, string> {
    return Object.fromEntries(table.slice(1).map((t) => [t[0], t[1]]));
  }
}

export default TableUtility;

// 03 - knock it off the table

// TODO: name, fragile, and an optional owner
export type Item = {
  name: string;
  fragile: boolean;
  owner?: string;
};

// TODO: name and items
export type Table = {
  name: string;
  items: Item[];
};

export function knockOff(table: Table, name: string): Table {
  const copyTable : Table = { ...table, items: [...table.items] };
  copyTable.items = copyTable.items.filter((item) => item.name !== name);
  return copyTable;
}

export function knockAllOff(table: Table): Table[] {
  const snapshots: Table[] = [];
  
  let currentItems: Item[] = table.items.map(item => ({ ...item }));
  
  

  // 2. Loop, slice, and deep clone at each step
  while (currentItems.length > 0) {
    currentItems = currentItems.slice(0, -1).map(item => ({ ...item }));
    snapshots.push({
      name: table.name,
      items: currentItems
    });
  }

  return snapshots;
}

export function rename(table: Table, from: string, to: string): Table {
  const copyTable: Table = { ...table, items: [...table.items] };
  copyTable.items = copyTable.items.map((item) => {
    if (item.name === from) {
      return { ...item, name: to };
    }
    return item;
  });
  return copyTable;
}

export function broken(before: Table, after: Table): string[] {
  const beforeItems = new Set(before.items.map(item => item.name));
  const afterItems = new Set(after.items.map(item => item.name));
  const brokenItems: string[] = [];

  for (const name of beforeItems) {
    if (!afterItems.has(name) && before.items.find(item => item.name === name)?.fragile) {
      brokenItems.push(name);
    }
  }
  return brokenItems;
}

export function whose(item: Item): string {
  if (item.owner) {
    return `${item.owner}'s ${item.name}`;
  }
  return `nobody's ${item.name}`;
}

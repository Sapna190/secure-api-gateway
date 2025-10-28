// Minimal in-memory item service used for local development and tests
type Item = { id: string; [key: string]: any };

const store: Record<string, Item> = {};

export const getAllItems = async (): Promise<Item[]> => {
  return Object.values(store);
};

export const getItemById = async (id: string): Promise<Item | null> => {
  return store[id] || null;
};

export const createItem = async (data: any): Promise<Item> => {
  const id = Date.now().toString(36);
  const item = { id, ...data } as Item;
  store[id] = item;
  return item;
};

export const updateItem = async (id: string, data: any): Promise<Item | null> => {
  if (!store[id]) return null;
  store[id] = { ...store[id], ...data };
  return store[id];
};

export const deleteItem = async (id: string): Promise<boolean> => {
  if (!store[id]) return false;
  delete store[id];
  return true;
};

export default { getAllItems, getItemById, createItem, updateItem, deleteItem };

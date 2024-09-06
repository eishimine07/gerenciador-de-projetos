import generateUID from '@/helpers/generateUID';

function getIds(model: string): number[] {
  const ids: number[] = JSON.parse(localStorage.getItem(`ids-${model}`) ?? '[]');

  return ids;
}

function addId(model: string, id: number): void {
  const ids = getIds(model);

  ids.push(id);
  localStorage.setItem(`ids-${model}`, JSON.stringify(ids));
}

function removeId(model: string, id: number): void {
  const ids = getIds(model);
  const index = ids.indexOf(id);

  if (index > -1) {
    ids.splice(index, 1);
    localStorage.setItem(`ids-${model}`, JSON.stringify(ids));
  }
}

function createItem<T>(model: string, value: T): T & { id: number } {
  const id = generateUID();
  const result = {
    ...value,
    id,
  }

  localStorage.setItem(`${model}-${id}`, JSON.stringify(result));
  addId(model, id);

  return result;
}

function updateItem<T>(model: string, id: number, value: T): T {
  localStorage.setItem(`${model}-${id}`, JSON.stringify(value));

  return value;
}

function getAll<T>(model: string): T[] {
  return getIds(model)
    .map((id) => getItem<T>(model, id))
    .filter((elem) => elem !== null);
}

function getItem<T>(model: string, id: number): T | null {
  const item = localStorage.getItem(`${model}-${id}`);`${model}-${id}`;

  return item ? JSON.parse(item) : null;
}

function removeItem(model: string, id: number): void {
  localStorage.removeItem(`${model}-${id}`);
  removeId(model, id);
}

const storage = {
  createItem,
  getAll,
  getItem,
  removeItem,
  updateItem,
};

export default storage;
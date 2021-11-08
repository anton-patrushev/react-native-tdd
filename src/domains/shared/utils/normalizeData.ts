export interface Normalizable {
  id: number | string;
}

export type NormalizedData<T extends Normalizable> = Record<T['id'], T>;

export default function normalizeData<T extends Normalizable>(
  data: Array<T>,
): NormalizedData<T> {
  return data.reduce((acc, curr) => {
    return { ...acc, [curr.id]: curr };
  }, {} as NormalizedData<T>);
}

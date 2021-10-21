interface Normalizable {
  id: number | string;
}

type NormalizedData<T extends Normalizable> = Record<
  Normalizable['id'],
  Normalizable
>;

export default function normalizeData<
  T extends Normalizable,
>(): NormalizedData<T> {
  return null;
}

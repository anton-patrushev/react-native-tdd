// yarn jest src/shared/utils/__tests__/normalizeData.test.ts --coverage

import normalizeData, { Normalizable, NormalizedData } from '../normalizeData';

interface TempDataType extends Normalizable {
  id: number;
  keyA: string;
  keyB: number;
}

describe('normalizeData', () => {
  const item1: TempDataType = { id: 0, keyA: 'key1', keyB: 2 };
  const item2: TempDataType = { id: 1, keyA: 'key24', keyB: 5 };
  const item3: TempDataType = { id: 2, keyA: 'key5', keyB: 234 };
  const item4: TempDataType = { id: 3, keyA: 'key65', keyB: 0 };
  const item5: TempDataType = { id: 4, keyA: 'key7', keyB: -22 };

  it('should return normalized data', () => {
    const incomingData: Array<TempDataType> = [
      { ...item1 },
      { ...item2 },
      { ...item3 },
      { ...item4 },
      { ...item5 },
    ];

    const expectedNormalizedData: NormalizedData<TempDataType> = {
      [item1.id]: { ...item1 },
      [item2.id]: { ...item2 },
      [item3.id]: { ...item3 },
      [item4.id]: { ...item4 },
      [item5.id]: { ...item5 },
    };

    const actualNormalizedData = normalizeData(incomingData);

    expect(actualNormalizedData).toStrictEqual(expectedNormalizedData);
  });
});

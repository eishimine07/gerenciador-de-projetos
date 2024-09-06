import sortListOfObjects from './sortListOfObjects';

describe('sortListOfObjects', () => {
  it('should sort list of objects by a number property in ascending order', () => {
    const list = [
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' }
    ];

    const sortedList = sortListOfObjects(list, 'id', 'asc');
    
    expect(sortedList).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' }
    ]);
  });

  it('should sort list of objects by a number property in descending order', () => {
    const list = [
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' }
    ];

    const sortedList = sortListOfObjects(list, 'id', 'desc');
    
    expect(sortedList).toEqual([
      { id: 3, name: 'C' },
      { id: 2, name: 'B' },
      { id: 1, name: 'A' }
    ]);
  });

  it('should sort list of objects by a string property in ascending order', () => {
    const list = [
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' }
    ];

    const sortedList = sortListOfObjects(list, 'name', 'asc');
    
    expect(sortedList).toEqual([
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 1, name: 'C' }
    ]);
  });

  it('should sort list of objects by a string property in descending order', () => {
    const list = [
      { id: 1, name: 'C' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' }
    ];

    const sortedList = sortListOfObjects(list, 'name', 'desc');
    
    expect(sortedList).toEqual([
      { id: 1, name: 'C' },
      { id: 3, name: 'B' },
      { id: 2, name: 'A' }
    ]);
  });

  it('should return the original list if the property values are equal', () => {
    const list = [
      { id: 1, name: 'A' },
      { id: 2, name: 'A' }
    ];

    const sortedList = sortListOfObjects(list, 'name', 'asc');
    
    expect(sortedList).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'A' }
    ]);
  });
});

import normalizeString from './normalizeString';

describe('normalizeString', () => {
  it.each([
    ['hello', '  hello  '],
    ['hello world', 'HeLLo WoRLd'],
    ['aeiou c aeiou', 'áéíóú ç âêîôû'],
    ['', ' '],
  ])('should return "%s" when input is "%s"', (expected, input) => {
    expect(normalizeString(input)).toBe(expected);
  });
});

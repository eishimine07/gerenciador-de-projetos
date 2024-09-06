import dateFormatISO8601 from './dateFormatISO8601';

describe('dateFormatISO8601', () => {
  it('should format a date in ISO 8601 (YYYY-MM-DD)', () => {
    const date = new Date(2024, 8, 5);
    const result = dateFormatISO8601(date);
    expect(result).toBe('2024-09-05');
  });

  it('should format a date with single-digit month and day correctly', () => {
    const date = new Date(2024, 0, 9);
    const result = dateFormatISO8601(date);
    expect(result).toBe('2024-01-09');
  });

  it('should format a date with leap year correctly', () => {
    const date = new Date(2020, 1, 29);
    const result = dateFormatISO8601(date);
    expect(result).toBe('2020-02-29');
  });

  it('should format a date with month and day as 1-digit correctly', () => {
    const date = new Date(2023, 0, 1);
    const result = dateFormatISO8601(date);
    expect(result).toBe('2023-01-01');
  });
});

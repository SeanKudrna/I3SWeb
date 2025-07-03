import { formatPrice, formatDate, pluralize } from './utils/formatting';
import { EtsyMoney } from './types/etsy';

test('formatPrice should format Etsy money correctly', () => {
  const price: EtsyMoney = { amount: 2500, divisor: 100, currency_code: 'USD' };
  const formatted = formatPrice(price);
  expect(formatted).toMatch(/\$25\.00/);
});

test('formatDate should format timestamp correctly', () => {
  const timestamp = 1640995200; // Dec 31, 2021
  const formatted = formatDate(timestamp);
  expect(formatted).toBe('December 31, 2021');
});

test('pluralize should handle singular and plural correctly', () => {
  expect(pluralize(1, 'item')).toBe('1 item');
  expect(pluralize(5, 'item')).toBe('5 items');
  expect(pluralize(2, 'child', 'children')).toBe('2 children');
});

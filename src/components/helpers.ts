export const isNumber = (val: unknown): boolean => {
  if (val == null) return false;
  return (
    typeof val === 'number' ||
    (!isNaN(Number(val)) && !isNaN(parseFloat(String(val))))
  );
};

export const compareValues = (a: unknown, b: unknown): number => {
  // Handle null/undefined values
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  // Numeric comparison
  if (isNumber(a) && isNumber(b)) {
    return Number(a) - Number(b);
  }

  // String comparison
  return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
};

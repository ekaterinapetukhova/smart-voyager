export function mapObject<T extends object, R>(
  input: T,
  fn: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const entries = Object.entries(input);
  const mapped = entries.map(([k, v]) => [k, fn(v as T[keyof T], k as keyof T)]);
  
  return Object.fromEntries(mapped) as Record<keyof T, R>;
}

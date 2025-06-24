export const firstOrDefault = <T, TDefault extends T | undefined>(
  value: T | T[] | undefined | null,
  defaultValue?: TDefault
): TDefault extends undefined ? T | undefined : T => {
  if (Array.isArray(value)) {
    return firstOrDefault(value[0], defaultValue)
  }

  if (value) {
    return value
  }

  if (defaultValue) {
    return defaultValue as T
  }

  return undefined as TDefault extends undefined ? T | undefined : T
}

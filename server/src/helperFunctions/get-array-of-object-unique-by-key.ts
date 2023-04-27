export function getArrayOfObjectUniqulyByKey(
  array: { [key: string]: any }[],
  key: string,
) {
  if (array.length === 0) {
    return array;
  }
  return [...new Map(array.map((item) => [item[key], item])).values()];
}

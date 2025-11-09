export const isArray = <T>(val: unknown): val is Array<T> => {
  return typeof val === "object" && Array.isArray(val);
};

export const assureArray = <T>(val: unknown, path = ""): Array<T> => {
  const defaultValue = [] as T[];

  if (isArray<T>(val)) return val;

  const text =
    path.length > 0
      ? `assureArray. Received value is not an array, value: ${val}, path: ${path}`
      : `assureArray. Received value is not an array, value: ${val}`;

  console.warn(text, { val });

  return defaultValue;
};

export const isString = (val: unknown): val is string => {
  return typeof val === "string";
};

export const assureString = (val: unknown, path = ""): string => {
  const defaultValue = "";

  if (isString(val)) return val;

  const text =
    path.length > 0
      ? `assureString. Received value is not a string, value: ${val}, path: ${path}`
      : `assureString. Received value is not a string, value: ${val}`;

  console.warn(text, { val });

  return defaultValue;
};

export const isDate = (val: unknown): val is Date => {
  return val instanceof Date;
};

export const assureDate = (val: unknown, path = ""): Date => {
  const defaultValue = new Date();

  if (isDate(val)) return val;

  const text =
    path.length > 0
      ? `assureDate. Received value is not a Date, value: ${val}, path: ${path}`
      : `assureDate. Received value is not a Date, value: ${val}`;

  console.warn(text, { val });

  return defaultValue;
};

type MyPathImpl<K extends string | number, V> = V extends object
  ? `${K}.${MyPath<V>}`
  : `${K}`;
type MyPath<T> = T extends object
  ? {
      [K in keyof T]-?: MyPathImpl<K & string, T[K]>;
    }[keyof T]
  : never;

type Responsive = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type { Responsive, MyPath };

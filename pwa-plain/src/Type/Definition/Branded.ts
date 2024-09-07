declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };

/**
 * Branded types help to differentiate and validate primitive variables.
 */
type Branded<T, B> = T & Brand<B>;

export { Brand, Branded };

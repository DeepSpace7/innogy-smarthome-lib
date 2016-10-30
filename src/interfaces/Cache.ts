/**
 * Represents a cache for SmartHome objects.
 */
interface Cache<T> {
  /**
   * Tries to resolve a cache value corresponding to the given entity.
   * @param entity The entity to resolve.
   * @return The value if available.
   */
  resolve(entity: string): T;
  /**
   * Stores a value in the cache by using its entity key.
   * @param entity The corresponding entity key.
   * @param value The value to cache.
   */
  store(entity: string, value: T): void;
}
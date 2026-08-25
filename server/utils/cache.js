import NodeCache from 'node-cache';

// Shared cache instance
// stdTTL: 600 seconds (10 minutes) default cache duration
// checkperiod: 120 seconds (checks for expired keys)
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

/**
 * Get data from cache
 * @param {string} key
 * @returns {any} Cached data or undefined
 */
export const getCache = (key) => {
  return cache.get(key);
};

/**
 * Set data to cache
 * @param {string} key
 * @param {any} data
 * @param {number} [ttl] Optional custom TTL in seconds
 */
export const setCache = (key, data, ttl) => {
  if (ttl) {
    cache.set(key, data, ttl);
  } else {
    cache.set(key, data);
  }
};

/**
 * Clear specific cache key
 * @param {string} key
 */
export const clearCache = (key) => {
  cache.del(key);
};

/**
 * Clear all cache keys starting with a specific prefix
 * @param {string} prefix
 */
export const clearCachePrefix = (prefix) => {
  const keys = cache.keys();
  const keysToDelete = keys.filter((key) => key.startsWith(prefix));
  if (keysToDelete.length > 0) {
    cache.del(keysToDelete);
  }
};

/**
 * Flush all cache
 */
export const flushCache = () => {
  cache.flushAll();
};

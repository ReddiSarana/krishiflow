import os
import time
import logging
from typing import Optional, Any
import json

logger = logging.getLogger(__name__)

class DistributedLockManager:
    """
    Redis-based atomic distributed locks and session caching.
    Uses SETNX with TTL to prevent race conditions during high-concurrency slot booking.
    Falls back gracefully to an in-memory lock table if Redis URL is not configured.
    """
    def __init__(self):
        self.redis_url = os.getenv("UPSTASH_REDIS_URL") or os.getenv("REDIS_URL")
        self.redis_client = None
        self._in_memory_locks = {}
        self._in_memory_cache = {}

        if self.redis_url:
            try:
                import redis
                self.redis_client = redis.from_url(self.redis_url, decode_responses=True)
                logger.info("Connected to Redis successfully.")
            except Exception as e:
                logger.warning(f"Could not connect to Redis ({e}), using in-memory lock fallback.")
                self.redis_client = None

    def acquire_lock(self, lock_key: str, ttl_seconds: int = 15) -> bool:
        """
        Acquires an atomic lock on a specific slot or dock resource.
        Returns True if acquired, False if already held.
        """
        if self.redis_client:
            try:
                # SET key val NX EX ttl
                return bool(self.redis_client.set(f"lock:{lock_key}", "locked", nx=True, ex=ttl_seconds))
            except Exception as e:
                logger.error(f"Redis lock error: {e}")

        # In-memory lock fallback
        now = time.time()
        expiry = self._in_memory_locks.get(lock_key)
        if expiry and expiry > now:
            return False # Lock currently active
        self._in_memory_locks[lock_key] = now + ttl_seconds
        return True

    def release_lock(self, lock_key: str) -> None:
        """Releases the lock."""
        if self.redis_client:
            try:
                self.redis_client.delete(f"lock:{lock_key}")
            except Exception as e:
                logger.error(f"Redis unlock error: {e}")
        self._in_memory_locks.pop(lock_key, None)

    def cache_set(self, key: str, value: Any, ttl_seconds: int = 3600) -> None:
        val_str = json.dumps(value)
        if self.redis_client:
            try:
                self.redis_client.set(key, val_str, ex=ttl_seconds)
                return
            except Exception as e:
                logger.error(f"Redis cache set error: {e}")
        self._in_memory_cache[key] = (val_str, time.time() + ttl_seconds)

    def cache_get(self, key: str) -> Optional[Any]:
        if self.redis_client:
            try:
                val = self.redis_client.get(key)
                return json.loads(val) if val else None
            except Exception as e:
                logger.error(f"Redis cache get error: {e}")
        entry = self._in_memory_cache.get(key)
        if entry:
            val_str, expiry = entry
            if expiry > time.time():
                return json.loads(val_str)
            else:
                self._in_memory_cache.pop(key, None)
        return None

# Global lock manager instance
lock_manager = DistributedLockManager()

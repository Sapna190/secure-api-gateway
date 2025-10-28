declare module 'rate-limiter-flexible' {
  // Minimal shim treating RateLimiterRedis as any to avoid strict-call errors in tests
  const RateLimiterRedis: any;
  export { RateLimiterRedis };
  export default RateLimiterRedis;
}

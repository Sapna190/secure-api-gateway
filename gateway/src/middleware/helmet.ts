import helmet from 'helmet';

const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  referrerPolicy: { policy: 'no-referrer' },
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  // hidePoweredBy option expects a boolean; keep it enabled
  hidePoweredBy: true,
});

export default helmetMiddleware;
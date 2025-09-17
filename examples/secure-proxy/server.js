// Example Express server that demonstrates secure patterns for a dev environment.
// - Serves a simple API at /api/... that is authenticated via httpOnly cookie
// - Proxies or uses server-side credentials to talk to upstream services (not shown)

const express = require('express');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use(limiter);

// simple auth middleware - in production replace with real session store
function requireAuth(req, res, next) {
  const session = req.cookies['session'];
  if (!session || session !== 'dev-session-token') {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

app.post('/login', (req, res) => {
  // In real server, validate credentials and set a secure httpOnly cookie
  res.cookie('session', 'dev-session-token', { httpOnly: true, secure: false });
  res.json({ ok: true });
});

app.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ ok: true });
});

app.get('/api/status', requireAuth, (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

app.listen(3000, () => console.log('Secure-proxy example listening on http://localhost:3000'));

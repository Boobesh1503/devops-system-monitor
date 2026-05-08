const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple HTML dashboard
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>DevOps Lab App</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: monospace; background: #0f1117; color: #00ff88; padding: 40px; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    .subtitle { color: #555; margin-bottom: 40px; font-size: 14px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; }
    .card { background: #1a1d27; border: 1px solid #222; border-radius: 8px; padding: 24px; }
    .card h2 { color: #fff; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .info-line { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #1e2030; font-size: 13px; }
    .info-line .label { color: #555; }
    .info-line .value { color: #00ff88; }
    .badge { display: inline-block; background: #00ff8822; color: #00ff88; padding: 4px 12px; border-radius: 4px; font-size: 12px; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>🐳 DevOps Lab — System Monitor</h1>
  <p class="subtitle">Dockerized Node.js App · Built by Boobesh Prasath M</p>
  <div class="grid">
    <div class="card">
      <h2>System Info</h2>
      <div class="info-line"><span class="label">Hostname</span><span class="value">${os.hostname()}</span></div>
      <div class="info-line"><span class="label">Platform</span><span class="value">${os.platform()}</span></div>
      <div class="info-line"><span class="label">Arch</span><span class="value">${os.arch()}</span></div>
      <div class="info-line"><span class="label">CPUs</span><span class="value">${os.cpus().length}</span></div>
      <div class="info-line"><span class="label">Free Memory</span><span class="value">${Math.round(os.freemem() / 1024 / 1024)} MB</span></div>
      <div class="info-line"><span class="label">Uptime</span><span class="value">${Math.floor(os.uptime() / 60)} min</span></div>
    </div>
    <div class="card">
      <h2>App Info</h2>
      <div class="info-line"><span class="label">Node Version</span><span class="value">${process.version}</span></div>
      <div class="info-line"><span class="label">Port</span><span class="value">${PORT}</span></div>
      <div class="info-line"><span class="label">Environment</span><span class="value">${process.env.NODE_ENV || 'development'}</span></div>
      <div class="info-line"><span class="label">PID</span><span class="value">${process.pid}</span></div>
      <div class="info-line"><span class="label">Status</span><span class="value">✅ Running</span></div>
      <div class="info-line"><span class="label">Container</span><span class="value">🐳 Docker</span></div>
    </div>
  </div>
  <br/>
  <span class="badge">✅ Deployed via Docker + GitHub Actions + AWS EC2</span>
</body>
</html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    nodeVersion: process.version,
    memory: { free: os.freemem(), total: os.totalmem() },
    uptime: os.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 DevOps Lab App running on port ${PORT}`);
});

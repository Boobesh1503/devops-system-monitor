const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>CI/CD Pipeline Demo</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: monospace; background: #0d1117; color: #c9d1d9; padding: 40px; min-height: 100vh; }
    h1 { font-size: 24px; color: #58a6ff; margin-bottom: 6px; }
    .subtitle { color: #8b949e; font-size: 13px; margin-bottom: 40px; }
    .pipeline {
      display: flex; align-items: center; gap: 0;
      margin-bottom: 40px; flex-wrap: wrap; gap: 4px;
    }
    .stage {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 16px 20px;
      text-align: center;
      min-width: 140px;
    }
    .stage .icon { font-size: 24px; display: block; margin-bottom: 6px; }
    .stage .name { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #8b949e; }
    .stage .status { font-size: 12px; color: #3fb950; margin-top: 4px; font-weight: bold; }
    .arrow { color: #30363d; font-size: 20px; padding: 0 4px; }
    .info-box {
      background: #161b22; border: 1px solid #30363d;
      border-radius: 8px; padding: 20px 24px; margin-bottom: 20px;
      max-width: 600px;
    }
    .info-box h2 { font-size: 13px; color: #58a6ff; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .info-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; border-bottom: 1px solid #21262d; }
    .info-row:last-child { border: none; }
    .info-row .k { color: #8b949e; }
    .info-row .v { color: #3fb950; }
    .badge { background: #238636; color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 12px; display: inline-block; margin-top: 12px; }
  </style>
</head>
<body>
  <h1>⚙️ CI/CD Pipeline Demo</h1>
  <p class="subtitle">GitHub Actions → Docker Hub → AWS EC2 · Built by Boobesh Prasath M</p>

  <div class="pipeline">
    <div class="stage"><span class="icon">💻</span><span class="name">Code Push</span><span class="status">✅ Done</span></div>
    <span class="arrow">→</span>
    <div class="stage"><span class="icon">🧪</span><span class="name">Test</span><span class="status">✅ Passed</span></div>
    <span class="arrow">→</span>
    <div class="stage"><span class="icon">🐳</span><span class="name">Docker Build</span><span class="status">✅ Built</span></div>
    <span class="arrow">→</span>
    <div class="stage"><span class="icon">📤</span><span class="name">Push Hub</span><span class="status">✅ Pushed</span></div>
    <span class="arrow">→</span>
    <div class="stage"><span class="icon">☁️</span><span class="name">EC2 Deploy</span><span class="status">✅ Live</span></div>
  </div>

  <div class="info-box">
    <h2>Runtime Info</h2>
    <div class="info-row"><span class="k">Node Version</span><span class="v">${process.version}</span></div>
    <div class="info-row"><span class="k">Port</span><span class="v">${PORT}</span></div>
    <div class="info-row"><span class="k">Environment</span><span class="v">${process.env.NODE_ENV || 'development'}</span></div>
    <div class="info-row"><span class="k">Uptime</span><span class="v">${Math.round(process.uptime())}s</span></div>
    <div class="info-row"><span class="k">Status</span><span class="v">Running ✅</span></div>
  </div>

  <span class="badge">🚀 Auto-deployed via GitHub Actions</span>
</body>
</html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`✅ CI/CD Demo app running on port ${PORT}`));

module.exports = app;

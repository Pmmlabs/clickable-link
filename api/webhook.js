// Обработчик редиректа /r?u=...
function handleRedirect(req, res) {
  const u = req.query.u;
  if (!u || !/^[a-z][a-z0-9+.-]*:\/\//i.test(u)) {
    res.status(400).send('Invalid URL');
    return;
  }
  // HTML с meta refresh + кнопка на случай, если редирект не сработал
  const safe = String(u)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="refresh" content="0; url=${safe}">
<title>Открыть ссылку</title>
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f0f10;color:#eaeaea;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;text-align:center}
  .card{background:#1a1a1c;border:1px solid #2a2a2e;border-radius:16px;padding:32px 24px;max-width:360px;width:100%}
  a.btn{display:inline-block;background:#4f8cff;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;margin-top:16px}
</style>
</head><body>
<div class="card">
  <h1>Открыть ссылку</h1>
  <p>Если приложение не открылось автоматически, нажмите кнопку.</p>
  <a class="btn" href="${safe}">Открыть</a>
</div>
</body></html>`);
}

module.exports = async (req, res) => {
  try {
    // Маршрут /r — редирект
    if (req.url && req.url.startsWith('/api/r')) {
      return handleRedirect(req, res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
};

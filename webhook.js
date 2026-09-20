const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
  ctx.reply(
    'Привет! Пришли мне ссылку (например, open://import?t=...) — я верну её как кликабельную.'
  );
});

// Любое текстовое сообщение, похожее на ссылку
bot.on('text', (ctx) => {
  const text = ctx.message.text.trim();
  // Простая проверка: есть :// или начинается с http
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) {
    return ctx.reply('Это не похоже на ссылку. Пришли URL вида scheme://...');
  }
  // Экранируем HTML
  const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  ctx.reply(`<a href="${safe}">Открыть ссылку</a>`, { parse_mode: 'HTML' });
});

module.exports = bot;

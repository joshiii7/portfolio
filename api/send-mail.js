const nodemailer = require('nodemailer');

// TODO: CHANGE RECIPIENT - practice email only, replace with real address
const RECIPIENT = 'salmasanmarierose@gmail.com';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit: counters live in this instance's memory, so they
// reset on cold starts and are not shared between instances. For a hard limit
// use Vercel's WAF rate-limit rule or a shared store such as Upstash Redis.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

/** Trims and strips control characters. Single-line fields also lose CR/LF (header injection). */
function clean(value, { multiline = false } = {}) {
  const text = typeof value === 'string' ? value : '';
  const stripped = multiline
    ? text.replace(/[^\S\n]*\r/g, '').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
    : text.replace(/[\u0000-\u001F\u007F]/g, ' ');
  return stripped.trim();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate({ name, email, subject, message }) {
  const errors = [];
  if (name.length < 2 || name.length > 100) errors.push('Name must be 2 to 100 characters.');
  if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.push('Please enter a valid email address.');
  if (subject.length < 3 || subject.length > 150) errors.push('Subject must be 3 to 150 characters.');
  if (message.length < 10 || message.length > 2000) errors.push('Message must be 10 to 2000 characters.');
  return errors;
}

function buildHtml({ name, email, subject, message }) {
  return `<html>
<body>
  <p>You have received a new message from the Portfolio Contact Form.<br>
    Here are the details:<br>
    <br>Name: ${escapeHtml(name)}
    <br>Email: ${escapeHtml(email)}
    <br>Subject: ${escapeHtml(subject)}
    <br><br>Message:<br>${escapeHtml(message).replace(/\n/g, '<br>')}
  </p>
</body>
</html>`;
}

function buildText({ name, email, subject, message }) {
  return [
    'You have received a new message from the Portfolio Contact Form.',
    'Here are the details:',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n');
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT) || 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ type: 'error', code: 405, text: 'Method not allowed' });
  }

  // Same check as the reference mailer: the request must come from the site's own fetch/XHR call.
  if (String(req.headers['x-requested-with'] || '').toLowerCase() !== 'xmlhttprequest') {
    return res.status(400).json({ type: 'error', code: 400, text: 'Sorry Request must be Ajax POST' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (clean(body.spam) !== '') {
    return res.status(200).json({ code: 200, spm: 'true' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ code: 429, errors: ['Too many messages. Please try again later.'] });
  }

  const data = {
    name: clean(body.name),
    email: clean(body.email),
    subject: clean(body.subject),
    message: clean(body.message, { multiline: true }),
  };

  const errors = validate(data);
  if (errors.length) {
    return res.status(400).json({ code: 400, errors });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('send-mail: SMTP_HOST, SMTP_USER and SMTP_PASS must be set');
    return res.status(500).json({ code: 500, errors: ['Message could not be sent.'] });
  }

  try {
    await createTransport().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      replyTo: { name: data.name, address: data.email },
      to: RECIPIENT,
      subject: `Portfolio Contact Form: ${data.name}`,
      text: buildText(data),
      html: buildHtml(data),
    });
    return res.status(200).json({ code: 200 });
  } catch (error) {
    console.error('send-mail: sending failed', error);
    return res.status(500).json({ code: 500, errors: ['Message could not be sent.'] });
  }
};

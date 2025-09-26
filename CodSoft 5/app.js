// app.js
const express = require('express');
const path = require('path');
const session = require('express-session'); // optional but recommended if you use sessions

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session middleware (optional). If you don't want session handling, remove this block.
app.use(session({
  name: 'sid',                   // cookie name
  secret: 'replace_this_secret', // change to a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,               // set to true when using HTTPS in production
    maxAge: 1000 * 60 * 60       // 1 hour
  }
}));

// Serve static files from "public" (put index.html, styles.css, main.js inside /public)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /logout route
app.post('/logout', (req, res) => {
  // If you're using sessions, destroy it safely
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ success: false, message: 'Logout failed on server' });
      }
      // clear session cookie (name used above: 'sid')
      res.clearCookie('sid');
      return res.json({ success: true, redirect: '/login' }); // redirect target
    });
  } else {
    // No session in use — just respond success and let client redirect
    return res.json({ success: true, redirect: '/' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

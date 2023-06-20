const express = require('express');
const app = express();
const cors = require('cors');

// ! Routes
const routerUser = require('./routes/user.route.js');
const routerAuth = require('./routes/auth.route.js');
const routerPost = require('./routes/post.route.js');
const routerComment = require('./routes/comment.route.js');

// * MIDDLEWARES Cors y Parse JSON
app.use(cors());
app.use(express.json());

// * MIDDLEWARE ROUTERS

app.use('/posts', routerPost);
app.use('/users', routerUser);
app.use('/auth', routerAuth);
app.use('/comments', routerComment);

app.get('/', (req, res) => {
  res.json('Functioning API OK!');
});

module.exports = app;

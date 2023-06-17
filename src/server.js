const express = require('express');
const app = express();
const cors = require('cors');

const routerPost = require("./routes/post.route")

// * MIDDLEWARES Cors y Parse JSON
app.use(cors());
app.use(express.json());

// * MIDDLEWARE ROUTERS
app.use("/posts", routerPost)

app.get('/', (req, res) => {
  res.json('Functioning API OK!');
});

module.exports = app;

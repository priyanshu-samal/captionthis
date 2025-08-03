const express= require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');  

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
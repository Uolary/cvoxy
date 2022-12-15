require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3061',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieSession({
  name: 'cvoxy-session',
  secret: process.env.COOKIE_SECRET,
  httpOnly: true,
}));

app.get('/', (req, res) => {
  res.json({message: 'cvoxy API'});
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

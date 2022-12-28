require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const db = require('./models');
const dbConfig = require("./config/db.config");

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

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/education.routes')(app);
require('./routes/skills.routes')(app);

app.get('/', (req, res) => {
  res.json({message: 'cvoxy API'});
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

db.mongoose.connect(
  `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('Successfully connect to MongoDB.');
}).catch((error) => {
  console.error('Connect error', error);
  process.exit();
});

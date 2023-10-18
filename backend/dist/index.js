const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect('mongodb+srv://gliao:tyghbn5888@mern.chmp221.mongodb.net/users', {
  // we don't have to do this, just in case
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// test connection
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
// const url = "mongodb+srv://gliao:vTz3f8hXyetJU3q0@mern.chmp221.mongodb.net/";

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log("Connected to db");
//   })
//   .catch((error) => {
//     console.log("Error connecting to db:", error.message);
//   });



// define user model. email address is the primary, username should be unique too.
const User = mongoose.model('User', {
  username: { type: String, unique: true },
  email: { type: String, primary: true },
  password: String,
});

// Middleware
app.use(cors());
app.use(express.json());

// Handle registration form submission
app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // check input password
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  // password hashing and salting, use bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // create user
  const user = new User({ username, email, password: hashedPassword });

  try {
    // save to DB
    await user.save();
    res.json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed. User may already exist.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

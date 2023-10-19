import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import cookieParser from 'cookie-parser'
import jwt, { VerifyErrors } from 'jsonwebtoken';
import db from './config/db';
import User from './models/user.js'
// load our .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Connect to MongoDB
db();

// Define an interface named DecodedToken
interface DecodedToken {
  name: string;
  iat: number;
  exp: number;
}

// homepage route
app.get('/', (req, res) => {
  const token = req.cookies.token
  if(!token) {
      return res.json({message: 'we need token please provide it'})
  } else {
      try {
          const decoded = jwt.verify(token, 'bookwormctrlcsbookwormctrlcs')as DecodedToken;
          res.json({success: true, name: decoded.name})
        } catch(err) {
          return res.json({message: 'Authentication error.'})
        }
  }      
});

// Sign in route
app.post('/sign-in', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ email });

      if (!user) {
          return res.json({ success: false, message: 'User not found' });
      }

      // password hashing and salting, use bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Check if the password matches
      if (user.password!== password) {
          return res.json({ success: false, message: 'Invalid password' });
      }

      // Successful login   
      const name = user.username
      const token = jwt.sign({name},'bookwormctrlcsbookwormctrlcs', {expiresIn:'1d'})
      res.cookie('token', token)
      // console.log(token)
      // console.log(name)
      return res.json({success: true, message: 'sign in sucessfully'})
      
  } catch (error) {
      console.error('Error during login:', error);
      res.json({ success: false, message: 'Internal server error' });
  }
});

// Sign out route
app.get('/sign-out', (req, res) => {
  const token = req.cookies.token
  res.clearCookie('token')
  return res.json({success: true})
})

app.get('/ping', (_, res) => {
  res.status(200).send('Pong!');
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import axios from 'axios';

dotenv.config();
const app = express();

// Midilwares
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// ROUTES
// GET: test
app.get('/', (req, res) => res.send('API is running...'));
// GET: 10 jokes
app.get('/api/jokes/', async (req, res) => {
  try {
    let jokes = [];
    for (let i = 0; i < 10; i++) {
      const response = await axios('https://api.chucknorris.io/jokes/random');
      jokes.push(response.data.value);
    }
    res.send(jokes);
  } catch (err) {
    console.log(err);
  }
});

// GET: n jokes by user request
app.get('/api/jokes/:amount', async (req, res) => {
  try {
    let jokes = [];
    let n = req.params.amount;
    for (let i = 0; i < n; i++) {
      const response = await axios('https://api.chucknorris.io/jokes/random');
      jokes.push(response.data.value);
    }
    res.send(jokes);
  } catch (err) {
    console.log(err);
  }
});

// /api/jokes/:category
const categories = [
  'animal',
  'career',
  'celebrity',
  'dev',
  'explicit',
  'fashion',
  'food',
  'history',
  'money',
  'movie',
  'music',
  'political',
  'religion',
  'science',
  'sport',
  'travel',
];
// GET: 10 jokes by category
app.get('/api/jokes/:category', async (req, res) => {
  try {
    let jokes = [];
    const category = req.params.category;
    console.log(req.params);
    // const found = categories.find((item) => item === category);
    let found = true;
    if (found) {
      for (let i = 0; i < 10; i++) {
        const response = await axios(
          `https://api.chucknorris.io/jokes/random?category=${category}`
        );
        jokes.push(response.data.value);
      }
      res.send(jokes);
    } else {
      res.status(401).json({
        message: `wrong category, please select one of provided categories`,
        categories: categories,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
// GET: n jokes by category
app.get('/api/jokes/:category/:amount', async (req, res) => {
  try {
    let jokes = [];
    const category = req.params.category;
    console.log(category);
    const amount = req.params.amount;
    const found = categories.find((item) => item === category);
    if (found) {
      for (let i = 0; i < amount; i++) {
        const response = await axios(
          `https://api.chucknorris.io/jokes/random?category=${category}`
        );
        jokes.push(response.data.value);
      }
      res.send(jokes);
    } else {
      res.status(401).json({
        message: `wrong category, please select one of provided categories`,
        categories: categories,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// /api/jokes/:category/:amount
// listening
app.listen(PORT, () => console.log(`((: Server is running on port ${PORT} `));

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Route to get a random joke
app.get('/api/joke', async (req, res) => {
  try {
    // Using JokeAPI - Free API for jokes
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=json');
    
    let joke = {};
    
    // Handle both single-part and two-part jokes
    if (response.data.type === 'single') {
      joke = {
        text: response.data.joke,
        type: 'single'
      };
    } else if (response.data.type === 'twopart') {
      joke = {
        setup: response.data.setup,
        delivery: response.data.delivery,
        type: 'twopart'
      };
    }
    
    res.json({
      success: true,
      data: joke,
      category: response.data.category
    });
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke. Please try again.'
    });
  }
});

// Route to get a joke by category
app.get('/api/joke/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const validCategories = ['general', 'programming', 'knock-knock'];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: `Invalid category. Valid categories: ${validCategories.join(', ')}`
      });
    }
    
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?format=json`);
    
    let joke = {};
    
    if (response.data.type === 'single') {
      joke = {
        text: response.data.joke,
        type: 'single'
      };
    } else if (response.data.type === 'twopart') {
      joke = {
        setup: response.data.setup,
        delivery: response.data.delivery,
        type: 'twopart'
      };
    }
    
    res.json({
      success: true,
      data: joke,
      category: response.data.category
    });
  } catch (error) {
    console.error('Error fetching joke:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke. Please try again.'
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎭 Random Joke Generator server is running on http://localhost:${PORT}`);
});

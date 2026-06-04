// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const getCategoryBtn = document.getElementById('getCategoryBtn');
const categorySelect = document.getElementById('categorySelect');
const jokeContainer = document.getElementById('jokeContainer');
const jokeContent = document.getElementById('jokeContent');
const jokeCategoryTag = document.getElementById('jokeCategory');
const copyBtn = document.getElementById('copyBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// State
let currentJoke = null;
let currentCategory = null;

// Event Listeners
generateBt n.addEventListener('click', () => fetchJoke('/api/joke'));
getCategoryBtn.addEventListener('click', () => {
  const category = categorySelect.value;
  if (category === 'any') {
    fetchJoke('/api/joke');
  } else {
    fetchJoke(`/api/joke/${category}`);
  }
});
copyBtn.addEventListener('click', copyJokeToClipboard);

// Fetch joke from API
async function fetchJoke(endpoint) {
  try {
    showSpinner(true);
    hideMessages();
    
    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data.success) {
      currentJoke = data.data;
      currentCategory = data.category;
      displayJoke(data.data, data.category);
    } else {
      showError(data.error || 'Failed to fetch joke');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred while fetching the joke. Please try again.');
  } finally {
    showSpinner(false);
  }
}

// Display joke on the page
function displayJoke(joke, category) {
  jokeContent.innerHTML = '';
  
  if (joke.type === 'single') {
    const jokeText = document.createElement('div');
    jokeText.className = 'joke-text';
    jokeText.textContent = joke.text;
    jokeContent.appendChild(jokeText);
  } else if (joke.type === 'twopart') {
    const setupDiv = document.createElement('div');
    setupDiv.className = 'joke-setup';
    setupDiv.textContent = joke.setup;
    
    const deliveryDiv = document.createElement('div');
    deliveryDiv.className = 'joke-delivery';
    deliveryDiv.textContent = joke.delivery;
    
    jokeContent.appendChild(setupDiv);
    jokeContent.appendChild(deliveryDiv);
  }
  
  // Update category tag
  jokeCategoryTag.textContent = category || 'General';
  
  // Show joke container
  jokeContainer.classList.remove('hidden');
  
  // Show success message
  showSuccess('Joke loaded! Ready to laugh? 😄');
}

// Copy joke to clipboard
function copyJokeToClipboard() {
  if (!currentJoke) return;
  
  let jokeText = '';
  if (currentJoke.type === 'single') {
    jokeText = currentJoke.text;
  } else if (currentJoke.type === 'twopart') {
    jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
  }
  
  navigator.clipboard.writeText(jokeText).then(() => {
    showSuccess('Joke copied to clipboard! 📋');
    // Reset button text after 2 seconds
    setTimeout(() => {
      copyBtn.textContent = '📋 Copy';
    }, 2000);
  }).catch(err => {
    showError('Failed to copy joke');
  });
}

// UI Helper Functions
function showSpinner(show) {
  if (show) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  jokeContainer.classList.add('hidden');
  
  // Auto hide error after 5 seconds
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.remove('hidden');
  
  // Auto hide success after 3 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 3000);
}

function hideMessages() {
  errorMessage.classList.add('hidden');
  successMessage.classList.add('hidden');
}

// Initialize - Load a joke on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchJoke('/api/joke');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    fetchJoke('/api/joke');
  }
});

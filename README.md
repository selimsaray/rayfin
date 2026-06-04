# 🎭 Random Joke Generator

A fun and interactive web application that generates random jokes using an external API. Built with Node.js, Express, and Vanilla JavaScript.

## Features

✨ **Core Features**
- 🎲 Get random jokes with a single click
- 📂 Filter jokes by category (General, Programming, Knock-Knock)
- 📋 Copy jokes to clipboard
- 🎨 Beautiful and responsive UI
- ⚡ Real-time joke loading with spinner animation
- 🌐 Uses [JokeAPI](https://jokeapi.dev/) - a free, open-source joke API

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **External API**: JokeAPI v2
- **Additional**: Axios (HTTP client), CORS

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone or navigate to the repository**
   ```bash
   git clone https://github.com/selimsaray/rayfin.git
   cd rayfin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## API Endpoints

### Get Random Joke
```
GET /api/joke
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "twopart",
    "setup": "Why do programmers prefer dark mode?",
    "delivery": "Because light attracts bugs!"
  },
  "category": "Programming"
}
```

### Get Joke by Category
```
GET /api/joke/:category
```

**Valid Categories:**
- `general` - General jokes
- `programming` - Programming jokes
- `knock-knock` - Knock-knock jokes

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "single",
    "text": "Why did the scarecrow win an award? He was outstanding in his field!"
  },
  "category": "General"
}
```

## Project Structure

```
rayfin/
├── server.js              # Express server and API routes
├── package.json           # Project dependencies
├── README.md             # Project documentation
└── public/
    ├── index.html        # Main HTML file
    ├── styles.css        # Styling
    └── script.js         # Frontend logic
```

## Usage

### 1. Get Random Joke
Click the **"Get Random Joke"** button to fetch and display a random joke.

### 2. Filter by Category
1. Select a category from the dropdown
2. Click **"Get Joke by Category"** button
3. The joke will be displayed

### 3. Copy Joke
Click the **"📋 Copy"** button to copy the current joke to your clipboard.

### 4. Keyboard Shortcut
Press **Ctrl + Enter** to get a new joke quickly.

## Features Explanation

### Two Types of Jokes

The API returns jokes in two formats:

1. **Single-part Joke**
   - A complete joke in one line
   - Example: "Why did the chicken cross the road? To get to the other side!"

2. **Two-part Joke**
   - Consists of setup and delivery
   - More traditional joke format
   - Example:
     - Setup: "Why do programmers prefer dark mode?"
     - Delivery: "Because light attracts bugs!"

### Error Handling
- Network errors are caught and displayed to the user
- Invalid categories are rejected with helpful error messages
- Auto-dismissing error and success messages

## Customization

### Change API
To use a different joke API, modify the `server.js` file:

```javascript
// Example: Using another joke API
const response = await axios.get('https://your-api-endpoint.com/joke');
```

### Add More Categories
Edit the `validCategories` array in `server.js`:

```javascript
const validCategories = ['general', 'programming', 'knock-knock', 'dark', 'spooky'];
```

### Styling
Customize colors and styles in `public/styles.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  /* ... modify as needed ... */
}
```

## Dependencies

```json
{
  "express": "^4.18.2",
  "axios": "^1.6.2",
  "cors": "^2.8.5"
}
```

## Environment Variables

Optional environment variables:

```env
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development         # Environment type
```

## Browser Support

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Load Time**: < 500ms for joke API call
- **Cache**: No caching - always fresh jokes!
- **Mobile Optimized**: Fully responsive design

## Security

- CORS enabled for cross-origin requests
- No sensitive data is stored
- Safe error handling without exposing server details

## Known Limitations

- Some jokes may not be appropriate for all audiences
- API may have rate limits (usually generous for public use)
- Network dependency - requires internet connection

## Future Enhancements

🚀 Potential improvements:
- [ ] Add joke history/favorites
- [ ] Implement joke rating system
- [ ] Add multiple external APIs for fallback
- [ ] Create PWA (Progressive Web App)
- [ ] Add dark/light theme toggle
- [ ] Implement caching for better performance
- [ ] Add joke search functionality
- [ ] Create sharing options (Twitter, WhatsApp, etc.)

## Troubleshooting

### Server won't start
```bash
# Check if port 3000 is already in use
# Try a different port
PORT=3001 npm start
```

### API not responding
- Check your internet connection
- Verify JokeAPI is accessible: https://jokeapi.dev/
- Check server logs for error details

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Hard reload the page (Ctrl+Shift+R)
- Check if CSS file is properly linked

## Contributing

Feel free to contribute! Fork the repository and create a pull request.

## License

MIT License - feel free to use this project for personal or commercial use.

## Resources

- [JokeAPI Documentation](https://jokeapi.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Built with ❤️ by selimsaray**

Happy laughing! 😄🎭

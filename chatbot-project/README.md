# Chatbot Project

A simple React-based chatbot application built with Vite. This project demonstrates state management, component composition, and user interaction handling in React.

## 🚀 Features

- 💬 **Chat Interface** - Clean, messaging-app style UI
- 📝 **Message Input** - Real-time message sending
- 🤖 **Bot Responses** - Simulated chatbot interactions
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Fast HMR** - Instant updates during development

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Customization](#customization)

## Quick Start

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Available Scripts

```powershell
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check code quality with ESLint
npm run lint -- --fix  # Auto-fix linting issues
```

## Project Structure

```
chatbot-project/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ChatMessages.jsx     # Message list container
│   │   ├── ChatMessages.css
│   │   ├── ChatMessage.jsx      # Individual message bubble
│   │   ├── ChatMessage.css
│   │   ├── ChatInput.jsx        # Message input field
│   │   └── ChatInput.css
│   ├── App.jsx              # Main app with state management
│   ├── App.css              # App-level styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── package.json             # Dependencies and scripts
```

## Technology Stack

### Core
- **[React 19](https://react.dev/)** - UI library with modern hooks
- **[Vite 6](https://vitejs.dev/)** - Fast build tool and dev server

### Utilities
- **[supersimpledev](https://www.npmjs.com/package/supersimpledev)** - Helper utilities
- **[ESLint](https://eslint.org/)** - Code linting

### Build Tools
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)** - Uses Babel for Fast Refresh

## How It Works

### State Management

The app uses React's `useState` hook to manage chat messages:

```jsx
const [chatMessages, setChatMessages] = useState([
  { message: 'hello chatbot', sender: 'user', id: 'id1' },
  { message: 'Hello! How can I help you?', sender: 'robot', id: 'id2' }
]);
```

### Component Hierarchy

```
App
├── ChatMessages (displays all messages)
│   └── ChatMessage (individual message bubble)
└── ChatInput (handles user input)
```

### Message Flow

1. User types message in `ChatInput`
2. On submit, message is added to `chatMessages` state
3. `ChatMessages` re-renders with new message
4. Bot response is simulated and added

## Customization

### Adding Bot Logic

Modify `ChatInput.jsx` to add bot response logic:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Add user message
  const userMessage = { 
    message: inputValue, 
    sender: 'user', 
    id: Date.now() 
  };
  setChatMessages([...chatMessages, userMessage]);
  
  // Add bot response
  setTimeout(() => {
    const botResponse = { 
      message: generateBotResponse(inputValue), 
      sender: 'robot', 
      id: Date.now() + 1 
    };
    setChatMessages(prev => [...prev, botResponse]);
  }, 1000);
  
  setInputValue('');
};
```

### Styling

Each component has its own CSS file for easy customization:
- `ChatMessages.css` - Message list styling
- `ChatMessage.css` - Message bubble styling
- `ChatInput.css` - Input field styling
- `App.css` - Overall layout

### Connecting to Real API

To integrate with a chatbot API:

1. Install axios: `npm install axios`
2. Create API service:
```jsx
import axios from 'axios';

export async function getChatResponse(userMessage) {
  const response = await axios.post('YOUR_API_ENDPOINT', {
    message: userMessage
  });
  return response.data.reply;
}
```
3. Use in `ChatInput` component

## Learning Resources

This project is part of the [React Playground](../README.md) workspace.

### Concepts Demonstrated

- React functional components
- useState hook for state management
- Props and component composition
- Event handling
- Array manipulation (adding messages)
- CSS styling and layout

## Future Enhancements

Potential improvements to explore:
- ✨ Add typing indicator
- 🔍 Search/filter messages
- 💾 Persist chat history to localStorage
- 🌐 Connect to real chatbot API (OpenAI, Dialogflow, etc.)
- 📎 Support for attachments/images
- 🎨 Theme customization
- ⌨️ Keyboard shortcuts (Enter to send)

## License

Educational purposes - part of the [React Playground](../README.md) workspace.

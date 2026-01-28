# 🚀 AI-Study-Sync

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.0-blue.svg)

AI-powered study companion that helps students organize, process, and learn from their study materials using artificial intelligence.

## ✨ Features

- 📚 **Book Management** - Organize your study materials into books
- 📄 **Chapter Processing** - Upload and process chapter images with AI
- 🤖 **AI-Powered OCR** - Extract text from images automatically
- ✍️ **Enhanced Text** - Get AI-enhanced, formatted study content
- 🎥 **YouTube Integration** - Get relevant video suggestions for each topic
- ❤️ **Favorites & Progress** - Track your learning progress
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🔔 **Real-time Notifications** - WebSocket-powered live updates
- 🔐 **Secure Authentication** - JWT-based authentication system

## 🏗️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning fast build tool
- **TailwindCSS** - Utility-first CSS
- **Zustand** - State management
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Socket.io** - WebSocket server
- **JWT** - Authentication
- **Bull MQ** - Job queue
- **Cloudinary** - Image storage
- **Google AI** - AI processing
- **Groq** - AI processing

## 📦 Project Structure

```
AI-Study-Sync/
├── backend/           # Node.js/Express API
│   ├── config/       # Database & service configs
│   ├── controllers/  # Request handlers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── middleware/   # Custom middleware
│   └── utils/        # Utility functions
│
├── frontend/         # React/Vite app
│   ├── src/
│   │   ├── api/     # API services
│   │   ├── components/ # React components
│   │   ├── context/ # State management
│   │   ├── pages/   # Page components
│   │   └── utils/   # Utility functions
│   └── public/      # Static assets
│
└── docs/            # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/AI-Study-Sync.git
cd AI-Study-Sync
```

2. **Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_API_KEY=your_google_api_key
GROQ_API_KEY=your_groq_api_key
YOUTUBE_API_KEY=your_youtube_api_key
GMAIL_USER=your_gmail
GMAIL_APP_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

4. **Run Development Servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

## 📖 API Documentation

Once backend is running, visit:
```
http://localhost:3000/api-docs
```

For Swagger/OpenAPI documentation.

## 🌐 Deployment

See detailed deployment guides:
- [Quick Deploy Guide](QUICK_DEPLOY.md) - 30 minutes
- [Complete Deployment Guide](DEPLOYMENT_GUIDE.md) - Detailed
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Step-by-step

### Recommended Stack:
- **Frontend**: Vercel (Free)
- **Backend**: Render.com (Free)
- **Database**: MongoDB Atlas (Free)
- **Storage**: Cloudinary (Free)

## 🔧 Environment Variables

### Backend Required Variables:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `CLOUDINARY_*` - Cloudinary credentials
- `GOOGLE_API_KEY` - Google AI API key
- `GROQ_API_KEY` - Groq API key
- `YOUTUBE_API_KEY` - YouTube Data API key
- `GMAIL_USER` - Gmail for sending codes
- `GMAIL_APP_PASSWORD` - Gmail app password

### Frontend Required Variables:
- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - Backend Socket.io URL

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📱 Screenshots

<details>
<summary>Click to see screenshots</summary>

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Books Page
![Books](screenshots/books.png)

### Chapter Processing
![Processing](screenshots/processing.png)

### Mobile Responsive
![Mobile](screenshots/mobile.png)

</details>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Hassan Manzoor** - Backend & AI Integration
- **Syed Hamza Khalil Gardezi** - Frontend & UI/UX

## 🙏 Acknowledgments

- Google Generative AI for AI processing
- Groq for fast AI inference
- Cloudinary for image management
- MongoDB Atlas for database hosting
- All open-source contributors

## 📞 Support

For support and questions:
- 📧 Email: support@aistudysync.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/AI-Study-Sync/issues)
- 📖 Docs: [Documentation](https://github.com/YOUR_USERNAME/AI-Study-Sync/wiki)

## 🔮 Roadmap

- [ ] PDF support
- [ ] Audio notes
- [ ] Collaborative study groups
- [ ] Flashcard generation
- [ ] Quiz generation
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Export to PDF
- [ ] Dark mode
- [ ] Multi-language support

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/AI-Study-Sync&type=Date)](https://star-history.com/#YOUR_USERNAME/AI-Study-Sync&Date)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/AI-Study-Sync?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/AI-Study-Sync?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/YOUR_USERNAME/AI-Study-Sync?style=social)

---

**Made with ❤️ for students worldwide**

If you found this project helpful, please consider giving it a ⭐️!

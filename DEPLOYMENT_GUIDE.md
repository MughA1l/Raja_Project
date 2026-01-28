# 🚀 AI-Study-Sync Deployment Guide

Complete guide to deploy your AI-Study-Sync application (Frontend + Backend).

---

## 📋 Pre-Deployment Checklist

### 1. Prerequisites
- [x] GitHub account
- [x] MongoDB Atlas account (Free)
- [x] Vercel account (Free)
- [x] Render.com account (Free)
- [x] All API keys ready

### 2. Environment Variables
Make sure you have all these ready:
- MongoDB connection string
- JWT secret
- Cloudinary credentials
- Google AI API key
- Groq API key
- YouTube API key
- Gmail credentials (for sending codes)

---

## 🗄️ Part 1: Database Setup (MongoDB Atlas)

### Already Setup:
If you're using MongoDB Atlas, your database is already in the cloud! Just need the connection string.

### Get Connection String:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/aistudysync?retryWrites=true&w=majority
```

---

## 🔧 Part 2: Backend Deployment (Render.com)

### Why Render?
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Supports Node.js & WebSockets
- ✅ Built-in Redis for Bull MQ

### Steps:

#### 1. Update Backend Code

**Update `server.js` CORS:**
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
```

**Update Socket.io CORS:**
```javascript
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});
```

#### 2. Update package.json

Add production start script:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### 3. Create GitHub Repository
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aistudysync-backend.git
git push -u origin main
```

#### 4. Deploy on Render

1. Go to [Render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `aistudysync-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. Add Environment Variables (click "Advanced"):
   ```
   NODE_ENV=production
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
   FRONTEND_URL=https://your-app.vercel.app
   ```

7. Click "Create Web Service"

8. Wait for deployment (5-10 minutes)

9. Copy your backend URL: `https://aistudysync-backend.onrender.com`

#### 5. Setup Redis (for Bull MQ)

1. In Render Dashboard, click "New +" → "Redis"
2. Choose Free plan
3. Copy the Redis connection string
4. Add to your Web Service environment variables:
   ```
   REDIS_URL=your_redis_connection_string
   ```

---

## 🎨 Part 3: Frontend Deployment (Vercel)

### Why Vercel?
- ✅ Free tier with great performance
- ✅ Perfect for React/Vite apps
- ✅ Automatic deployments from GitHub
- ✅ Custom domains support
- ✅ Edge network (fast globally)

### Steps:

#### 1. Update Frontend Code

**Create `.env.production` file:**
```env
VITE_API_URL=https://aistudysync-backend.onrender.com/api
VITE_SOCKET_URL=https://aistudysync-backend.onrender.com
```

**Update `axiosInstance.js`:**
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
```

**Update Socket connection:**
```javascript
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
```

#### 2. Create vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 3. Create GitHub Repository
```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aistudysync-frontend.git
git push -u origin main
```

#### 4. Deploy on Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your frontend repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. Add Environment Variables:
   ```
   VITE_API_URL=https://aistudysync-backend.onrender.com/api
   VITE_SOCKET_URL=https://aistudysync-backend.onrender.com
   ```

7. Click "Deploy"

8. Wait for deployment (2-3 minutes)

9. Your app will be live at: `https://your-app.vercel.app`

#### 5. Update Backend FRONTEND_URL

Go back to Render and update the `FRONTEND_URL` environment variable with your Vercel URL:
```
FRONTEND_URL=https://your-app.vercel.app
```

Then redeploy the backend.

---

## 🔄 Alternative: Deploy Both on Same Platform

### Option A: Both on Vercel (Recommended for Monorepo)

1. Keep both frontend and backend in same repo
2. Create `vercel.json` in root:
```json
{
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}
```

### Option B: Both on Render

1. Deploy backend as Web Service (as above)
2. Deploy frontend as Static Site:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

---

## 🧪 Testing After Deployment

### 1. Check Backend
```bash
curl https://your-backend-url.onrender.com/api/health
```

### 2. Check Frontend
Visit `https://your-app.vercel.app` and test:
- ✅ Login/Signup
- ✅ Create Book
- ✅ Create Chapter
- ✅ Upload Images
- ✅ WebSocket notifications
- ✅ All API calls working

### 3. Check Logs

**Render:**
- Go to your service → Logs tab

**Vercel:**
- Go to your project → Deployments → Click deployment → View Function Logs

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Solution:** Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly.

### Issue 2: WebSocket Not Connecting
**Solution:** Render free tier sleeps after 15 minutes of inactivity. Consider:
- Upgrading to paid plan
- Using a cron job to ping your server every 10 minutes

### Issue 3: Image Upload Failing
**Solution:** Check Cloudinary credentials in environment variables.

### Issue 4: MongoDB Connection Timeout
**Solution:** 
- Check MongoDB Atlas whitelist (allow 0.0.0.0/0 for all IPs)
- Verify connection string is correct

### Issue 5: Build Failing
**Solution:**
- Check Node version compatibility
- Clear cache and rebuild
- Check all dependencies are installed

---

## 📊 Monitoring & Maintenance

### 1. Setup Monitoring

**Backend (Render):**
- Enable "Health Check Path" in settings
- Set path to `/api/health`

**Frontend (Vercel):**
- Automatic monitoring included
- Check Analytics in dashboard

### 2. Automatic Deployments

Both Render and Vercel support automatic deployments:
- Push to `main` branch → Auto deploy
- Push to `dev` branch → Preview deployment

### 3. Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records

**Render:**
1. Go to Service Settings → Custom Domains
2. Add your domain
3. Update DNS records

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Starting):
- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (750 hours/month, sleeps after 15 min inactivity)
- **Vercel**: Free (100GB bandwidth/month)
- **Redis**: Free (25MB on Render)

**Total**: $0/month

### Paid Tier (For Production):
- **MongoDB Atlas**: $9/month (Shared cluster)
- **Render**: $7/month (always-on instance)
- **Vercel**: Free or $20/month (Pro features)
- **Redis**: Included in Render paid plan

**Total**: ~$16-36/month

---

## ✅ Final Checklist

- [ ] MongoDB Atlas connection working
- [ ] Backend deployed on Render
- [ ] Redis connected for Bull MQ
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] WebSocket working
- [ ] Image upload working
- [ ] Email sending working
- [ ] All pages loading correctly
- [ ] Mobile responsive (already done!)
- [ ] Custom domain setup (optional)

---

## 🚀 Quick Deploy Commands

### Backend:
```bash
cd backend
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
# Then connect to Render
```

### Frontend:
```bash
cd frontend
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
# Then connect to Vercel
```

---

## 📞 Support

If you face any issues:
1. Check logs in Render/Vercel dashboard
2. Verify environment variables
3. Test API endpoints with Postman
4. Check MongoDB Atlas network access

---

## 🎉 Congratulations!

Your AI-Study-Sync app is now live and accessible worldwide! 🌍

**Next Steps:**
- Share your app link
- Gather user feedback
- Monitor performance
- Add more features
- Scale as needed

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://aistudysync-backend.onrender.com`
- API Docs: `https://aistudysync-backend.onrender.com/api-docs`

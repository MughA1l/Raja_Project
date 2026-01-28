# 🚀 Quick Deployment Steps

Follow these steps to deploy your AI-Study-Sync app in 30 minutes!

## Step 1: Prepare Environment Variables (5 min)

Create a text file with all your environment variables:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aistudysync
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_API_KEY=your_google_ai_key
GROQ_API_KEY=your_groq_key
YOUTUBE_API_KEY=your_youtube_key
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
FRONTEND_URL=https://your-app.vercel.app
```

## Step 2: Deploy Backend to Render (10 min)

1. **Create GitHub Repo for Backend:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aistudysync-backend.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Settings:
     - Name: `aistudysync-backend`
     - Runtime: `Node`
     - Build: `npm install`
     - Start: `npm start`
   - Add all environment variables
   - Click "Create"

3. **Copy Backend URL:** `https://aistudysync-backend.onrender.com`

## Step 3: Update Frontend Config (2 min)

Edit `frontend/.env.production`:
```
VITE_API_URL=https://aistudysync-backend.onrender.com/api
VITE_SOCKET_URL=https://aistudysync-backend.onrender.com
```

## Step 4: Deploy Frontend to Vercel (8 min)

1. **Create GitHub Repo for Frontend:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aistudysync-frontend.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import GitHub repo
   - Settings auto-detected (Vite)
   - Add environment variables:
     ```
     VITE_API_URL=https://aistudysync-backend.onrender.com/api
     VITE_SOCKET_URL=https://aistudysync-backend.onrender.com
     ```
   - Click "Deploy"

3. **Copy Frontend URL:** `https://your-app.vercel.app`

## Step 5: Update Backend CORS (3 min)

1. Go to Render dashboard
2. Open your backend service
3. Go to "Environment"
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Save and wait for redeploy

## Step 6: Test Everything (2 min)

Visit your Vercel URL and test:
- ✅ Login/Signup
- ✅ Create Book
- ✅ Upload Image
- ✅ All features working

## 🎉 Done!

Your app is now live at: `https://your-app.vercel.app`

---

## 📝 Important Notes:

1. **Render Free Tier:** Sleeps after 15 min of inactivity. First request might take 30 seconds.
   
2. **Keep Services Awake:** Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 5 minutes.

3. **MongoDB Atlas:** Make sure to whitelist IP `0.0.0.0/0` in Network Access.

4. **Environment Variables:** Never commit `.env` files to GitHub!

5. **Custom Domain:** You can add your own domain in Vercel/Render settings.

---

## 🐛 Troubleshooting:

### Backend won't start:
- Check logs in Render
- Verify all environment variables
- Check MongoDB connection

### Frontend can't connect:
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Check browser console for errors

### Images not uploading:
- Verify Cloudinary credentials
- Check file size limits

---

## 💰 Cost:

**Free Tier (Total: $0/month):**
- MongoDB Atlas: Free 512MB
- Render: Free 750 hours/month
- Vercel: Free 100GB bandwidth
- Redis: Free 25MB

**Perfect for:**
- Personal projects
- Portfolio projects
- Small user base (<100 users)

---

## 🔄 Updating Your App:

Just push to GitHub:

```bash
git add .
git commit -m "Your update message"
git push
```

Both Vercel and Render will auto-deploy! 🚀

---

## 🎓 Pro Tips:

1. **Environment Variables:** Store a backup of all your env vars in a password manager
2. **Database Backups:** MongoDB Atlas has automatic backups in paid tier
3. **Monitoring:** Use Render/Vercel analytics to track usage
4. **Logs:** Check logs regularly for errors
5. **Updates:** Keep dependencies updated with `npm update`

---

## 📞 Need Help?

Common resources:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas

Good luck with your deployment! 🚀

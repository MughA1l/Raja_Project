# ✅ Deployment Checklist

Use this checklist to ensure smooth deployment.

---

## 📅 PRE-DEPLOYMENT (Do this BEFORE deploying)

### 1. Environment Setup
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string obtained
- [ ] Cloudinary account setup
- [ ] All API keys collected (Google AI, Groq, YouTube)
- [ ] Gmail app password created
- [ ] GitHub account ready

### 2. Code Preparation
- [ ] Backend: `npm install` runs successfully
- [ ] Frontend: `npm install` runs successfully
- [ ] Backend: `npm start` works locally
- [ ] Frontend: `npm run dev` works locally
- [ ] Backend: `npm run build` works (if applicable)
- [ ] Frontend: `npm run build` creates dist folder
- [ ] All features tested locally

### 3. Configuration Files
- [ ] Backend `.env.example` created
- [ ] Frontend `.env.production` created
- [ ] Backend `vercel.json` or Render config exists
- [ ] Frontend `vercel.json` exists
- [ ] `.gitignore` includes `.env` files

---

## 🔧 BACKEND DEPLOYMENT

### Step 1: GitHub Setup
- [ ] Create new GitHub repository for backend
- [ ] Initialize git in backend folder
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial deployment"`
- [ ] Push to GitHub: `git push -u origin main`

### Step 2: Render.com Setup
- [ ] Sign up/login to Render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Service name: `aistudysync-backend`
- [ ] Runtime: Node
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`

### Step 3: Environment Variables
Add these in Render dashboard:
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `MONGODB_URI=...`
- [ ] `JWT_SECRET=...`
- [ ] `CLOUDINARY_CLOUD_NAME=...`
- [ ] `CLOUDINARY_API_KEY=...`
- [ ] `CLOUDINARY_API_SECRET=...`
- [ ] `GOOGLE_API_KEY=...`
- [ ] `GROQ_API_KEY=...`
- [ ] `YOUTUBE_API_KEY=...`
- [ ] `GMAIL_USER=...`
- [ ] `GMAIL_APP_PASSWORD=...`
- [ ] `FRONTEND_URL=https://your-app.vercel.app` (update later)

### Step 4: Deploy & Test
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 min)
- [ ] Copy backend URL
- [ ] Test health endpoint: `https://your-backend.onrender.com/api/health`
- [ ] Check logs for errors

---

## 🎨 FRONTEND DEPLOYMENT

### Step 1: Update Configuration
- [ ] Update `frontend/.env.production` with backend URL
- [ ] Verify `axiosInstance.js` uses `import.meta.env.VITE_API_URL`
- [ ] Verify `useSocketStore.js` uses `import.meta.env.VITE_SOCKET_URL`

### Step 2: GitHub Setup
- [ ] Create new GitHub repository for frontend
- [ ] Initialize git in frontend folder
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial deployment"`
- [ ] Push to GitHub: `git push -u origin main`

### Step 3: Vercel Setup
- [ ] Sign up/login to Vercel.com
- [ ] Click "Add New" → "Project"
- [ ] Import GitHub repository
- [ ] Framework: Vite (auto-detected)
- [ ] Build command: `npm run build` (auto-detected)
- [ ] Output directory: `dist` (auto-detected)

### Step 4: Environment Variables
Add these in Vercel dashboard:
- [ ] `VITE_API_URL=https://your-backend.onrender.com/api`
- [ ] `VITE_SOCKET_URL=https://your-backend.onrender.com`

### Step 5: Deploy & Test
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 min)
- [ ] Copy frontend URL
- [ ] Visit the site
- [ ] Test basic navigation

---

## 🔄 FINAL CONFIGURATION

### Update CORS
- [ ] Go to Render dashboard
- [ ] Open backend service
- [ ] Go to "Environment" tab
- [ ] Update `FRONTEND_URL` with Vercel URL
- [ ] Save changes
- [ ] Wait for auto-redeploy

### MongoDB Atlas Network Access
- [ ] Login to MongoDB Atlas
- [ ] Go to "Network Access"
- [ ] Click "Add IP Address"
- [ ] Choose "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Save

---

## 🧪 POST-DEPLOYMENT TESTING

### Basic Tests
- [ ] Homepage loads correctly
- [ ] Login page accessible
- [ ] Signup works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Create book works
- [ ] Create chapter works
- [ ] Upload image works
- [ ] Image processing works
- [ ] WebSocket notifications work
- [ ] Logout works

### Mobile Testing
- [ ] Open on mobile browser
- [ ] Test hamburger menu
- [ ] Test all pages on mobile
- [ ] Test image upload on mobile
- [ ] Test forms on mobile

### Performance Testing
- [ ] Check page load speed
- [ ] Check API response times
- [ ] Check image loading
- [ ] Check WebSocket connection

### Error Testing
- [ ] Try invalid login
- [ ] Try accessing protected routes without login
- [ ] Try uploading invalid file
- [ ] Check error messages display correctly

---

## 📊 MONITORING SETUP

### Health Checks
- [ ] Setup UptimeRobot (free) to ping backend every 5 min
- [ ] URL to monitor: `https://your-backend.onrender.com/api/health`
- [ ] Email notifications setup

### Analytics
- [ ] Vercel Analytics enabled (automatic)
- [ ] Google Analytics setup (optional)
- [ ] Error tracking setup (optional - Sentry)

### Logs
- [ ] Bookmark Render logs page
- [ ] Bookmark Vercel deployment logs
- [ ] Check logs for any errors

---

## 🎯 OPTIMIZATION

### Performance
- [ ] Enable Vercel Edge Network (automatic)
- [ ] Add MongoDB indexes
- [ ] Optimize images with Cloudinary
- [ ] Enable compression

### Security
- [ ] HTTPS enabled (automatic on both platforms)
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting considered (optional)

### SEO (Optional)
- [ ] Add meta tags
- [ ] Add Open Graph tags
- [ ] Add favicon
- [ ] Create sitemap

---

## 📢 GO LIVE

### Documentation
- [ ] Update main README with live URLs
- [ ] Document known issues
- [ ] Create user guide (optional)

### Announcement
- [ ] Share on LinkedIn
- [ ] Share on Twitter/X
- [ ] Add to portfolio
- [ ] Share with friends/community

### Backup
- [ ] Save all environment variables in password manager
- [ ] Document deployment process
- [ ] Create backup of database (if needed)

---

## 🆘 TROUBLESHOOTING CHECKLIST

If something goes wrong:

### Backend Not Starting
- [ ] Check Render logs
- [ ] Verify all environment variables
- [ ] Check MongoDB connection string
- [ ] Verify Node version compatibility
- [ ] Check package.json start script

### Frontend Not Loading
- [ ] Check Vercel deployment logs
- [ ] Verify build succeeded
- [ ] Check environment variables
- [ ] Verify API URL is correct

### API Not Connecting
- [ ] Check CORS configuration
- [ ] Verify FRONTEND_URL in backend
- [ ] Check network tab in browser
- [ ] Verify API URL in frontend

### WebSocket Not Working
- [ ] Check socket URL in frontend
- [ ] Verify WebSocket connection in network tab
- [ ] Check Render supports WebSocket
- [ ] Check browser console errors

### Images Not Uploading
- [ ] Verify Cloudinary credentials
- [ ] Check file size limits
- [ ] Check network tab for errors
- [ ] Verify API endpoint works

### Database Errors
- [ ] Check MongoDB Atlas status
- [ ] Verify network access (0.0.0.0/0)
- [ ] Check connection string
- [ ] Verify database name

---

## ✨ SUCCESS CRITERIA

Your deployment is successful when:

- ✅ Backend is live and responding
- ✅ Frontend is accessible worldwide
- ✅ Users can register and login
- ✅ All CRUD operations work
- ✅ Images upload successfully
- ✅ WebSocket notifications work
- ✅ Mobile responsive
- ✅ No console errors
- ✅ SSL/HTTPS enabled
- ✅ Fast load times

---

## 📝 NOTES

Deployment Date: _______________

Backend URL: _______________

Frontend URL: _______________

Database: _______________

Issues Found: _______________

_______________

_______________

Next Steps: _______________

_______________

_______________

---

## 🎉 CONGRATULATIONS!

Once all items are checked, your app is successfully deployed! 🚀

**Remember:** 
- Monitor logs regularly
- Check for errors
- Keep dependencies updated
- Scale as needed

**Good luck!** 💪

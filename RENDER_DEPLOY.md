# 🚀 Render.com Deployment Guide (RECOMMENDED)

## Why Render.com?
- ✅ Automatically detects Node.js in subdirectories
- ✅ Free tier with 750 hours/month
- ✅ Auto-deploys on git push
- ✅ Better than Koyeb for subdirectory projects
- ✅ No configuration files needed

---

## 📦 Step-by-Step Deployment

### 1. Create Render Account
- Go to: https://render.com/
- Sign up with GitHub (free)

### 2. Deploy Backend

1. **Dashboard → New → Web Service**

2. **Connect Repository:**
   - Connect GitHub account
   - Select: `MughA1l/Raja_Project`
   - Click "Connect"

3. **Configure Service:**
   ```
   Name: ai-study-sync-backend
   Region: Oregon (US West) - or closest to you
   Branch: main
   Root Directory: backend          ⚠️ IMPORTANT!
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Instance Type:**
   ```
   Select: Free
   ```

5. **Add Environment Variables:**
   Click "Advanced" → Add Environment Variable:
   
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret_min_32_chars
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   GOOGLE_API_KEY=your_google_ai_key
   GROQ_API_KEY=your_groq_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   GMAIL_USER=your_gmail_address
   GMAIL_APP_PASSWORD=your_gmail_app_password
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
   
   **Optional (if using AWS):**
   ```
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=us-east-1
   ```

6. **Create Web Service** button → Deploy! 🚀

---

## ⏱️ Deployment Time

- First deploy: 5-7 minutes
- Subsequent deploys: 2-3 minutes

---

## 🌐 Your Backend URL

After deployment, you'll get:
```
https://ai-study-sync-backend.onrender.com
```

**Test it:**
```
https://ai-study-sync-backend.onrender.com/api/health
```

Should return: `{"status":"ok","timestamp":"..."}`

---

## 🔄 Auto-Deploy on Git Push

Render automatically redeploys when you push to GitHub:

```powershell
git add .
git commit -m "Update backend"
git push origin main
```

Render will automatically detect and deploy! ✅

---

## 📱 Deploy Frontend on Vercel

### 1. Install Vercel CLI (Optional)
```powershell
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Easier)

1. Go to: https://vercel.com/
2. Sign in with GitHub
3. **New Project**
4. **Import:** MughA1l/Raja_Project
5. **Configure:**
   ```
   Framework Preset: Vite
   Root Directory: frontend         ⚠️ IMPORTANT!
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

6. **Environment Variables:**
   ```
   VITE_API_URL=https://ai-study-sync-backend.onrender.com/api
   VITE_SOCKET_URL=https://ai-study-sync-backend.onrender.com
   ```

7. **Deploy** 🚀

---

## 🎯 Complete Deployment Stack

| Service    | Platform      | URL                                          |
|------------|---------------|----------------------------------------------|
| Frontend   | Vercel        | https://your-app.vercel.app                  |
| Backend    | Render.com    | https://ai-study-sync-backend.onrender.com   |
| Database   | MongoDB Atlas | mongodb+srv://...                            |
| Storage    | Cloudinary    | cloudinary.com                               |

---

## ⚠️ Important Notes

### Free Tier Limitations:

**Render.com Free Tier:**
- ✅ 750 hours/month (enough for 1 app)
- ⚠️ Spins down after 15 minutes of inactivity
- ⏱️ Takes 30-60 seconds to spin up on first request
- ✅ 512 MB RAM
- ✅ Shared CPU

**Solution for Spin Down:**
- Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your API every 5 minutes (keeps it awake)

**Vercel Free Tier:**
- ✅ Unlimited bandwidth
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ No spin down

---

## 🔍 Monitoring & Logs

### Render Dashboard:
- Go to your service
- Click "Logs" tab
- See real-time logs

### Check Health:
```bash
# Backend health
curl https://ai-study-sync-backend.onrender.com/api/health

# Should return 200 OK
```

---

## 🐛 Troubleshooting

### Issue: Build fails
**Solution:** Check logs in Render dashboard
- Common causes: Missing environment variables, npm install errors

### Issue: Application error
**Solution:** 
1. Check environment variables are set correctly
2. Verify MongoDB URI is correct and IP whitelist allows Render IPs
3. Check logs for errors

### Issue: CORS errors
**Solution:** Make sure `FRONTEND_URL` environment variable is set to your Vercel URL

### Issue: Can't connect to database
**Solution:** 
1. MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Save

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Backend URL works: `/api/health` returns 200
- [ ] Frontend loads on Vercel URL
- [ ] Login/signup works
- [ ] Can create books
- [ ] Can upload images
- [ ] Socket.io connects (check browser console)
- [ ] No CORS errors
- [ ] MongoDB connection works

---

## 📊 Cost Summary

| Service       | Free Tier              | Cost After Free |
|---------------|------------------------|-----------------|
| Render        | 750 hrs/month          | $7/month        |
| Vercel        | Unlimited projects     | $20/month       |
| MongoDB Atlas | 512 MB storage         | $9/month        |
| Cloudinary    | 25 GB/month            | $89/month       |

**Total for free tier: $0/month** ✅

---

## 🔄 Update Process

When you make changes:

1. **Edit code locally**
2. **Test locally**
3. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
4. **Auto-deploys:**
   - Render: Redeploys backend automatically
   - Vercel: Redeploys frontend automatically

That's it! Both platforms handle CI/CD automatically! 🚀

---

## 🆘 Need Help?

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/

---

**Render.com is much easier than Koyeb for subdirectory projects!** ✅

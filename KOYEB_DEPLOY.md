# 🚀 Koyeb Deployment Guide

## Problem: Application Not Detected
Koyeb can't detect your app because it's in `backend/` subdirectory, not root.

## ✅ Solution Options

### Option 1: Deploy via Koyeb Dashboard (Easiest)

1. **Go to Koyeb Dashboard:**
   - Visit: https://app.koyeb.com/
   - Sign in with GitHub

2. **Create New App:**
   - Click "Create App"
   - Select "Deploy from GitHub"
   - Choose repository: `MughA1l/Raja_Project`
   - Branch: `main`

3. **Configure Build Settings:**
   ```
   Builder: Dockerfile
   Dockerfile path: backend/dockerfile
   Build context: backend
   ```

4. **Set Port:**
   ```
   Port: 3000
   ```

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   GOOGLE_API_KEY=your_google_key
   GROQ_API_KEY=your_groq_key
   YOUTUBE_API_KEY=your_youtube_key
   GMAIL_USER=your_gmail
   GMAIL_APP_PASSWORD=your_app_password
   FRONTEND_URL=your_frontend_url
   AWS_ACCESS_KEY_ID=your_aws_key (if using AWS)
   AWS_SECRET_ACCESS_KEY=your_aws_secret (if using AWS)
   ```

6. **Health Check:**
   ```
   Path: /api/health
   Port: 3000
   ```

7. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes

---

### Option 2: Use Koyeb CLI

```bash
# Install Koyeb CLI
npm install -g @koyeb/koyeb-cli

# Login
koyeb login

# Deploy backend
koyeb app create ai-study-sync-backend \
  --git github.com/MughA1l/Raja_Project \
  --git-branch main \
  --git-build-context backend \
  --docker dockerfile \
  --ports 3000:http \
  --routes /:3000 \
  --env NODE_ENV=production \
  --env PORT=3000 \
  --env MONGODB_URI=your_mongodb_uri \
  --env JWT_SECRET=your_jwt_secret \
  --regions was
```

---

### Option 3: Push koyeb.yaml (Already Created)

I've created `koyeb.yaml` in your project root. Now:

```bash
git add koyeb.yaml
git commit -m "Add Koyeb configuration"
git push origin main
```

Then go to Koyeb dashboard and it will auto-detect the config.

---

## 🎯 Recommended: Use Render.com Instead

Koyeb has limited free tier. Render.com is better for this project:

### Deploy on Render.com (Free):

1. **Go to:** https://render.com/
2. **New Web Service**
3. **Connect GitHub:** MughA1l/Raja_Project
4. **Settings:**
   ```
   Name: ai-study-sync-backend
   Region: Oregon (or closest)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Environment Variables:** (same as above)

6. **Deploy!**

Render will:
- ✅ Auto-detect Node.js
- ✅ Install dependencies
- ✅ Start your server
- ✅ Provide HTTPS URL
- ✅ Auto-deploy on git push

---

## 🌐 Frontend Deployment

**For Frontend, use Vercel (Best Option):**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel --prod
```

Or via Vercel Dashboard:
1. Go to https://vercel.com
2. Import project: MughA1l/Raja_Project
3. Root directory: `frontend`
4. Framework: Vite
5. Deploy!

---

## 📊 Deployment Stack Recommendation

| Service  | Platform      | Cost  | Why                          |
|----------|---------------|-------|------------------------------|
| Frontend | Vercel        | Free  | Best for Vite/React          |
| Backend  | Render.com    | Free  | Easy Node.js deployment      |
| Database | MongoDB Atlas | Free  | Already using                |
| Storage  | Cloudinary    | Free  | Already configured           |

---

## 🐛 Common Issues

### Issue: "Application not detected"
**Solution:** Specify `backend/` as root directory in deployment settings

### Issue: Port not accessible
**Solution:** Ensure PORT environment variable is set to 3000

### Issue: Health check failing
**Solution:** Make sure `/api/health` endpoint exists and returns 200

### Issue: CORS errors
**Solution:** Add your frontend URL to FRONTEND_URL environment variable

---

## ✅ Verify Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://your-backend-url.com/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Koyeb Docs: https://www.koyeb.com/docs
- Vercel Docs: https://vercel.com/docs

Choose Render.com for easiest deployment! 🚀

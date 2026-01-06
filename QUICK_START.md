# Quick Start Guide

## 🚀 Deploy to GitHub and Vercel

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Name: `rokets-classifieds`
3. **Don't** initialize with README, .gitignore, or license
4. Click **Create repository**

### 2. Push Code to GitHub

```bash
cd commerce

# Check status
git status

# Remove old remote if exists
git remote remove origin

# Add all files
git add .

# Commit
git commit -m "Initial commit: Rokets Classifieds Platform"

# Add your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/rokets-classifieds.git

# Push
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Option A: Via Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework**: Next.js
   - **Root Directory**: `commerce` (if repo root is parent) or leave empty
   - **Build Command**: `pnpm build`
   - **Install Command**: `pnpm install`
4. Add Environment Variable:
   - `NEXT_PUBLIC_BASE_PATH` = `/demo`
5. Click **Deploy**

#### Option B: Via CLI

```bash
npm i -g vercel
cd commerce
vercel
# Follow prompts
```

### 4. Configure Domain

1. In Vercel project → **Settings** → **Domains**
2. Add `rokets.delivery`
3. Configure DNS as instructed
4. Wait for DNS propagation

### 5. Access Your Site

Visit: **https://rokets.delivery/demo**

## ✅ Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variable `NEXT_PUBLIC_BASE_PATH=/demo` set
- [ ] Domain `rokets.delivery` configured
- [ ] Site accessible at https://rokets.delivery/demo

## 📚 More Details

- **GitHub Setup**: See [GITHUB_SETUP.md](./GITHUB_SETUP.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project Info**: See [README.md](./README.md)


# GitHub Setup Instructions

## Step 1: Create New GitHub Repository

1. Go to https://github.com/new
2. Repository name: `rokets-classifieds` (or your preferred name)
3. Description: "Rokets Classifieds Platform - Next.js marketplace with delivery tracking"
4. Visibility: Choose Public or Private
5. **Important**: Do NOT check:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   
   (We already have these files)

6. Click **Create repository**

## Step 2: Prepare Local Repository

Make sure you're in the `commerce` directory:

```bash
cd commerce
```

## Step 3: Check Current Git Status

```bash
git status
```

You should see modified and untracked files.

## Step 4: Remove Old Remote (if exists)

If you have an old remote pointing to Vercel's repo:

```bash
git remote -v
git remote remove origin
```

## Step 5: Add All Files and Commit

```bash
# Add all files
git add .

# Commit with descriptive message
git commit -m "Initial commit: Rokets Classifieds Platform

- Classifieds marketplace with two-level categories
- Seller profiles and ratings
- Rokets Delivery integration with live tracking
- Order management and history
- User accounts with addresses and payment methods
- Advanced filtering and search
- Demo mode with mock data"

# Add your new GitHub repository as remote
# Replace YOUR_USERNAME and REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/rokets-classifieds.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 6: Verify on GitHub

1. Go to your repository on GitHub
2. Verify all files are present
3. Check that README.md displays correctly

## Step 7: Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

## Quick Deploy Commands

After setting up GitHub, you can deploy to Vercel:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
cd commerce
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - Project name? rokets-classifieds
# - Directory? ./
```

## Next Steps

1. ✅ Code is on GitHub
2. ✅ Deploy to Vercel (see DEPLOYMENT.md)
3. ✅ Configure domain `rokets.delivery` in Vercel
4. ✅ Set environment variable `NEXT_PUBLIC_BASE_PATH=/demo`
5. ✅ Access at https://rokets.delivery/demo


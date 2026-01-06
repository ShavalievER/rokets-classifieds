# Deployment Guide

## Deploying to GitHub

### 1. Create a New GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `rokets-classifieds`)
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### 2. Push Code to GitHub

From the `commerce` directory:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Rokets Classifieds Platform"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/rokets-classifieds.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Deploying to Vercel at /demo

### Option 1: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `commerce` (if repo root is parent) or leave empty if `commerce` is the repo root
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install` (or `npm install`)
5. Add environment variable:
   - `NEXT_PUBLIC_BASE_PATH` = `/demo`
6. Click **Deploy**

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd commerce
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? rokets-classifieds
# - Directory? ./
# - Override settings? No
```

### 3. Configure Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add `rokets.delivery`
3. Configure DNS records as instructed by Vercel
4. Wait for DNS propagation

### 4. Set Up Path Prefix /demo

If deploying to `https://rokets.delivery/demo`, you have two options:

#### Option A: Using Base Path (Recommended)

1. In Vercel project settings, go to **Environment Variables**
2. Add:
   - **Name**: `NEXT_PUBLIC_BASE_PATH`
   - **Value**: `/demo`
   - **Environment**: Production, Preview, Development
3. Redeploy the project

#### Option B: Using Rewrites (Alternative)

The `vercel.json` file already includes rewrites. If you prefer this approach, ensure the file is in the root of your repository.

### 5. Verify Deployment

1. Visit `https://rokets.delivery/demo`
2. Check that all pages load correctly
3. Test key features:
   - Category browsing
   - Product pages
   - Cart functionality
   - Order tracking
   - Map visualization

## Troubleshooting

### Images Not Loading

- Ensure `NEXT_PUBLIC_BASE_PATH` is set correctly
- Check that image paths use relative URLs or include the base path

### 404 Errors on Routes

- Verify `basePath` in `next.config.ts` matches your deployment path
- Check that all internal links use relative paths or include the base path

### Build Failures

- Ensure all dependencies are in `package.json`
- Check that TypeScript errors are resolved
- Verify Node.js version compatibility (18+)

## Environment Variables

For production, you may want to set:

- `NEXT_PUBLIC_BASE_PATH=/demo` - Base path for the application
- `SITE_NAME=Rokets` - Site name
- `COMPANY_NAME=Rokets` - Company name

## Continuous Deployment

Once connected to GitHub, Vercel will automatically deploy:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request


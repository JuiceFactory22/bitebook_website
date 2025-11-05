# Square Production Setup Guide

## Step 1: Get Production Credentials from Square

1. Go to Square Developer Dashboard: https://developer.squareup.com/apps
2. Click on your application (or create a new one for production)
3. You need to get:
   - Production Application ID
   - Production Location ID  
   - Production Access Token

## Step 2: Get Production Application ID
- In your Square app dashboard, the Application ID for production will be different from sandbox
- It will look like: `sq0idp-XXXXXXXXXXXX` (not sandbox-sq0idb-...)
- Copy this ID

## Step 3: Get Production Location ID
- Go to Square Dashboard: https://squareup.com/dashboard/settings/locations
- Select your production location
- Copy the Location ID (starts with L)

## Step 4: Get Production Access Token
- In Developer Dashboard → Your App → Credentials
- Under "Production" section (not Sandbox)
- Click "Generate Production Token" or "Show" if you already have one
- Copy the Production Access Token

## Step 5: Update Environment Variables

Once you have all three values, update them in:
- Local .env.local file
- Vercel Dashboard → Settings → Environment Variables


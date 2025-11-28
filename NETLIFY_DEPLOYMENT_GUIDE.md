# Netlify Deployment Guide - CORS Fix

## Problem
Your Flutter app is getting a 500 error when calling AWS API Gateway because of CORS (Cross-Origin Resource Sharing) issues.

## Solution Applied

### 1. Updated Configuration Files
- ✅ `netlify.toml` - Enhanced with proper CORS headers
- ✅ `_headers` - Additional CORS header support

### 2. API Proxy Setup
Netlify will now proxy your API requests to bypass CORS:

**Before (Direct Call - CORS Error):**
```
https://uc1t4bgsq3.execute-api.ap-south-1.amazonaws.com/dev/dealer/dealerlogin
```

**After (Through Netlify Proxy - No CORS Error):**
```
/api/dealer/dealerlogin
```

## How to Use the Proxy

### Option A: Update Your Flutter App (Recommended)

In your Flutter app, change the API base URL:

**Before:**
```dart
final String apiUrl = 'https://uc1t4bgsq3.execute-api.ap-south-1.amazonaws.com/dev';
```

**After:**
```dart
final String apiUrl = '/api'; // Use relative URL for Netlify proxy
// OR for production
final String apiUrl = 'https://your-netlify-site.netlify.app/api';
```

### Option B: Use Environment Variables

```dart
final String apiUrl = const String.fromEnvironment(
  'API_URL',
  defaultValue: '/api', // Defaults to Netlify proxy
);
```

## Deployment Steps

1. **Commit these changes:**
   ```bash
   git add netlify.toml _headers
   git commit -m "Fix CORS with Netlify proxy"
   git push
   ```

2. **Netlify will automatically redeploy** (if connected to Git)

3. **Or manually deploy:**
   - Drag and drop the `web` folder to Netlify dashboard
   - Or use Netlify CLI:
     ```bash
     netlify deploy --prod --dir=/home/jasminshukla/Downloads/web/web
     ```

## Testing

After deployment, test your dealer login:

```bash
# From your browser console or Postman
POST https://your-netlify-site.netlify.app/api/dealer/dealerlogin
Content-Type: application/json

{
  "username": "test",
  "password": "test"
}
```

## Alternative: Fix CORS on AWS API Gateway

If you prefer to keep direct AWS calls, enable CORS on your Lambda function:

```javascript
exports.handler = async (event) => {
  // Your logic here
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: JSON.stringify(response)
  };
};
```

And enable CORS in API Gateway:
1. Go to AWS API Gateway Console
2. Select your API
3. Click on your resource (e.g., `/dealer/dealerlogin`)
4. Actions → Enable CORS
5. Deploy API

## Troubleshooting

### Still Getting 500 Error?

1. **Check CloudWatch Logs:**
   ```bash
   aws logs tail /aws/lambda/YOUR_FUNCTION_NAME --follow
   ```

2. **Verify Netlify Deployment:**
   - Check Netlify deploy logs
   - Ensure `netlify.toml` and `_headers` are deployed

3. **Test API Directly:**
   ```bash
   curl -X OPTIONS https://your-netlify-site.netlify.app/api/dealer/dealerlogin \
     -H "Origin: https://your-netlify-site.netlify.app" \
     -H "Access-Control-Request-Method: POST" -v
   ```

### CORS Headers Not Working?

- Clear browser cache
- Try incognito/private mode
- Check Network tab in DevTools for response headers

## Need Help?

If the issue persists:
1. Share CloudWatch logs from your Lambda function
2. Share Network tab screenshot showing the failed request
3. Confirm which approach you're using (Netlify proxy vs direct AWS)

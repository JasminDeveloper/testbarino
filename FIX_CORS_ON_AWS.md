# Fix CORS on AWS Lambda - Step by Step Guide

## Your Situation
- ✅ Lambda Function URL: `https://uc1t4bgsq3.execute-api.ap-south-1.amazonaws.com/dev/dealer/dealerlogin`
- ✅ Built Flutter web app (no source code)
- ❌ Getting 500 Internal Server Error due to CORS

## Solution: Enable CORS on AWS

You need to add CORS headers to your Lambda function response. Here's how:

---

## Step 1: Update Lambda Function Handler

### Find Your Lambda Function
1. Go to AWS Console → Lambda
2. Search for your dealer login function (likely named something like `dealer-login` or `dealerlogin`)
3. Click on it to open the function

### Add CORS Headers to Response

**Find the part of your code that returns the response** and update it:

#### For Node.js Lambda:

**Before (No CORS):**
\`\`\`javascript
exports.handler = async (event) => {
  // Your business logic
  const result = await dealerLogin(data);
  
  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
\`\`\`

**After (With CORS):**
\`\`\`javascript
exports.handler = async (event) => {
  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      },
      body: ''
    };
  }

  try {
    // Your business logic
    const result = await dealerLogin(data);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Internal server error',
        error: error.message
      })
    };
  }
};
\`\`\`

#### For Python Lambda:

**Before (No CORS):**
\`\`\`python
def lambda_handler(event, context):
    result = dealer_login(data)
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
\`\`\`

**After (With CORS):**
\`\`\`python
import json

def lambda_handler(event, context):
    # Handle OPTIONS preflight request
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
            'body': ''
        }
    
    try:
        result = dealer_login(data)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Content-Type': 'application/json'
            },
            'body': json.dumps(result)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'message': 'Internal server error',
                'error': str(e)
            })
        }
\`\`\`

### Save and Deploy
1. Click **"Deploy"** button in Lambda console
2. Wait for deployment to complete

---

## Step 2: Enable CORS in API Gateway

### Go to API Gateway Console
1. AWS Console → API Gateway
2. Find your API (likely named something with "dev" or your app name)
3. Click on it

### Enable CORS for the Endpoint

1. In the left sidebar, expand your API resources
2. Find `/dealer/dealerlogin` (or similar)
3. Click on **POST** method under it
4. Click **"Actions"** dropdown → Select **"Enable CORS"**
5. Configure:
   - **Access-Control-Allow-Origin:** `*` (or your Netlify domain)
   - **Access-Control-Allow-Headers:** `Content-Type,Authorization,X-Requested-With`
   - **Access-Control-Allow-Methods:** `POST,OPTIONS`
6. Click **"Enable CORS and replace existing CORS headers"**
7. Confirm by clicking **"Yes, replace existing values"**

### Deploy the API
1. Click **"Actions"** → **"Deploy API"**
2. Select **Stage:** `dev`
3. Click **"Deploy"**

---

## Step 3: Test the Fix

### Using Browser Console
1. Open your Netlify site
2. Press F12 (Developer Tools)
3. Go to **Network** tab
4. Try the dealer login again
5. Check if the request succeeds with 200 status

### Using cURL
\`\`\`bash
# Test OPTIONS (preflight)
curl -X OPTIONS https://uc1t4bgsq3.execute-api.ap-south-1.amazonaws.com/dev/dealer/dealerlogin \\
  -H "Origin: https://your-netlify-site.netlify.app" \\
  -H "Access-Control-Request-Method: POST" \\
  -v

# Test actual POST
curl -X POST https://uc1t4bgsq3.execute-api.ap-south-1.amazonaws.com/dev/dealer/dealerlogin \\
  -H "Content-Type: application/json" \\
  -H "Origin: https://your-netlify-site.netlify.app" \\
  -d '{"username":"test","password":"test"}' \\
  -v
\`\`\`

Look for these headers in the response:
\`\`\`
< access-control-allow-origin: *
< access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
< access-control-allow-headers: Content-Type, Authorization, X-Requested-With
\`\`\`

---

## Step 4: Check CloudWatch Logs (If Still Not Working)

1. Go to AWS CloudWatch
2. Navigate to **Log groups**
3. Find `/aws/lambda/YOUR_FUNCTION_NAME`
4. Click on the latest log stream
5. Look for error messages

### Common Issues in Logs:

**Missing Environment Variables:**
\`\`\`
Error: Environment variable DATABASE_URL is not defined
\`\`\`
→ Add missing env vars in Lambda → Configuration → Environment variables

**Database Connection Error:**
\`\`\`
Error: ETIMEDOUT connecting to database
\`\`\`
→ Check VPC security groups, ensure Lambda can access database

**Timeout Error:**
\`\`\`
Task timed out after 3.00 seconds
\`\`\`
→ Increase timeout in Lambda → Configuration → General configuration → Timeout

---

## Quick Copy-Paste CORS Headers

For any Lambda response, always include these headers:

\`\`\`javascript
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Content-Type': 'application/json'
}
\`\`\`

---

## Security Note

Using `Access-Control-Allow-Origin: '*'` allows any website to call your API. For production, consider:

\`\`\`javascript
'Access-Control-Allow-Origin': 'https://your-netlify-site.netlify.app'
\`\`\`

Or read it from environment variable:
\`\`\`javascript
'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*'
\`\`\`

---

## Still Getting Errors?

### Check This Checklist:
- [ ] Lambda function returns CORS headers in response
- [ ] Lambda handles OPTIONS method (preflight)
- [ ] API Gateway has CORS enabled for the endpoint
- [ ] API Gateway is deployed to the correct stage (dev)
- [ ] CloudWatch logs show no errors
- [ ] Lambda has proper IAM permissions
- [ ] Environment variables are set correctly

### Need Help?
Share the following:
1. CloudWatch logs (last 50 lines)
2. Network tab screenshot from browser
3. Your Lambda function code (at least the response part)

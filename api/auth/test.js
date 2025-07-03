export default async function handler(req, res) {
  // This endpoint helps debug the OAuth configuration
  const redirectUri = process.env.REDIRECT_URI || 'https://i3s-web.vercel.app/api/auth/callback';
  
  res.json({
    message: 'OAuth Configuration Test',
    environment: {
      ETSY_KEYSTRING: process.env.ETSY_KEYSTRING ? 'Set ✓' : 'Not set ✗',
      ETSY_SHARED_SECRET: process.env.ETSY_SHARED_SECRET ? 'Set ✓' : 'Not set ✗',
      REDIRECT_URI: process.env.REDIRECT_URI || 'Not set (using default)',
      FRONTEND_URL: process.env.FRONTEND_URL || 'Not set (using default)',
    },
    computed: {
      redirectUri: redirectUri,
      frontendUrl: process.env.FRONTEND_URL || 'https://i3s-web.vercel.app',
    },
    instructions: {
      etsyAppSettings: 'Your Etsy app Callback URL must be set to exactly:',
      requiredCallbackUrl: redirectUri,
      currentIssue: 'If you see "redirect URL is not permitted", the Callback URL in your Etsy app settings does not match the above URL exactly.'
    }
  });
}
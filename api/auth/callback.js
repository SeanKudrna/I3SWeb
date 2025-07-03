const axios = require('axios');
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state } = req.query;
  
  console.log('OAuth callback received:', { code: !!code, state: !!state });
  
  if (!code) {
    console.error('No authorization code received');
    return res.redirect(`${process.env.FRONTEND_URL}?auth=error&reason=no_code`);
  }
  
  let codeVerifier;
  try {
    // Extract code_verifier from state
    const decodedState = Buffer.from(state, 'base64').toString();
    const stateData = JSON.parse(decodedState);
    codeVerifier = stateData.codeVerifier;
    console.log('Extracted code_verifier from state:', !!codeVerifier);
  } catch (error) {
    console.error('Error parsing state:', error);
    return res.redirect(`${process.env.FRONTEND_URL}?auth=error&reason=invalid_state`);
  }
  
  try {
    
    console.log('Exchanging code for tokens...');
    
    // Exchange code for access token
    const tokenData = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ETSY_KEYSTRING,
      redirect_uri: process.env.REDIRECT_URI,
      code: code,
      code_verifier: codeVerifier
    });

    console.log('Making token request to Etsy...');
    
    const tokenResponse = await axios.post('https://api.etsy.com/v3/public/oauth/token', tokenData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    console.log('Token response received:', { 
      hasAccessToken: !!tokenResponse.data.access_token,
      hasRefreshToken: !!tokenResponse.data.refresh_token,
      expiresIn: tokenResponse.data.expires_in
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    
    // Log tokens for admin to set as environment variables
    console.log('=== ADMIN: COPY THESE TO VERCEL ENVIRONMENT VARIABLES ===');
    console.log('STORED_ACCESS_TOKEN=' + access_token);
    console.log('STORED_REFRESH_TOKEN=' + refresh_token);
    console.log('STORED_TOKEN_EXPIRY=' + (Date.now() + (expires_in * 1000)));
    console.log('=== END - Set these in Vercel dashboard, then redeploy ===');
    
    // Redirect to frontend with success and instructions
    res.redirect(`${process.env.FRONTEND_URL}?auth=success&tokens_logged=true`);
  } catch (error) {
    console.error('OAuth callback error:', error.response?.data || error.message);
    console.error('Full error:', error);
    res.redirect(`${process.env.FRONTEND_URL}?auth=error&reason=token_exchange`);
  }
}
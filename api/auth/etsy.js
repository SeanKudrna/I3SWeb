const crypto = require('crypto');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Generate a simple state parameter (just random hex string)
  const state = crypto.randomBytes(16).toString('hex');
  
  // Generate code verifier and challenge for PKCE
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
  
  // Use exact redirect URI that matches Etsy app settings
  const baseRedirectUri = process.env.REDIRECT_URI || 'https://i3s-web.vercel.app/api/auth/callback';
  
  // For OAuth request, use base redirect URI without query params
  const authUrl = new URL('https://www.etsy.com/oauth/connect');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', process.env.ETSY_KEYSTRING);
  authUrl.searchParams.append('redirect_uri', baseRedirectUri);
  authUrl.searchParams.append('scope', 'listings_r shops_r');
  // Encode state and verifier together without special characters
  const combinedState = state + codeVerifier;
  authUrl.searchParams.append('state', combinedState);
  authUrl.searchParams.append('code_challenge', codeChallenge);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  
  console.log('OAuth Configuration:', {
    clientId: process.env.ETSY_KEYSTRING,
    redirectUri: baseRedirectUri,
    state: state,
    codeChallengeLength: codeChallenge.length
  });
  console.log('Generated OAuth URL:', authUrl.toString());
  
  // Store code_verifier in a temporary session or return it to the client
  // For serverless, we'll return it to the client to store in sessionStorage
  res.json({ 
    authUrl: authUrl.toString(), 
    state: state,
    codeVerifier: codeVerifier,
    combinedState: combinedState, // For callback parsing
    redirectUri: baseRedirectUri // Include for debugging
  });
}
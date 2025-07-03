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

  const state = crypto.randomBytes(32).toString('hex');
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
  
  // Include code_verifier in state for serverless compatibility
  const stateWithVerifier = JSON.stringify({ state, codeVerifier });
  const encodedState = Buffer.from(stateWithVerifier).toString('base64');
  
  const authUrl = new URL('https://www.etsy.com/oauth/connect');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', process.env.ETSY_KEYSTRING);
  authUrl.searchParams.append('redirect_uri', process.env.REDIRECT_URI);
  authUrl.searchParams.append('scope', 'listings_r shops_r');
  authUrl.searchParams.append('state', encodedState);
  authUrl.searchParams.append('code_challenge', codeChallenge);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  
  console.log('Generated OAuth URL:', authUrl.toString());
  
  res.json({ authUrl: authUrl.toString(), state, codeVerifier });
}
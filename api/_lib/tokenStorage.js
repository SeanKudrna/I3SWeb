// Simple token storage for production
// In a real production app, you'd use a database or Vercel KV

let storedTokens = {
  accessToken: null,
  refreshToken: null,
  tokenExpiry: null,
  isAdminAuthenticated: false
};

// For production, you could store these in environment variables
// after initial authentication
if (process.env.STORED_ACCESS_TOKEN) {
  storedTokens.accessToken = process.env.STORED_ACCESS_TOKEN;
  storedTokens.refreshToken = process.env.STORED_REFRESH_TOKEN;
  storedTokens.tokenExpiry = parseInt(process.env.STORED_TOKEN_EXPIRY) || 0;
  storedTokens.isAdminAuthenticated = true;
}

export const getTokens = () => storedTokens;

export const setTokens = (accessToken, refreshToken, tokenExpiry) => {
  storedTokens.accessToken = accessToken;
  storedTokens.refreshToken = refreshToken;
  storedTokens.tokenExpiry = tokenExpiry;
  storedTokens.isAdminAuthenticated = true;
  
  // Log for admin to copy to environment variables
  console.log('=== ADMIN: COPY THESE TO VERCEL ENVIRONMENT VARIABLES ===');
  console.log('STORED_ACCESS_TOKEN=' + accessToken);
  console.log('STORED_REFRESH_TOKEN=' + refreshToken);
  console.log('STORED_TOKEN_EXPIRY=' + tokenExpiry);
  console.log('=== END - Set these in Vercel dashboard ===');
};

export const clearTokens = () => {
  storedTokens.accessToken = null;
  storedTokens.refreshToken = null;
  storedTokens.tokenExpiry = null;
  storedTokens.isAdminAuthenticated = false;
};

export const isAuthenticated = () => {
  return storedTokens.isAdminAuthenticated && 
         storedTokens.accessToken && 
         Date.now() < storedTokens.tokenExpiry;
};
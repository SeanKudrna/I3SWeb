const crypto = require('crypto');
const axios = require('axios');

// Etsy API configuration
const ETSY_API_BASE = 'https://openapi.etsy.com/v3';
const SHOP_NAME = 'Innovative3DShop';

const tokenStorage = require('./tokenStorage');

// Shop ID cache
let SHOP_ID = null;

// In-memory storage for OAuth state
const oauthSessions = new Map();

// Extract user ID from access token
function getUserIdFromToken(token) {
  if (!token) return null;
  
  // Etsy access tokens are in format: {user_id}.{random_string}
  const parts = token.split('.');
  if (parts.length >= 1 && /^\d+$/.test(parts[0])) {
    return parts[0];
  }
  return null;
}

// Get shop ID by name
async function getShopId() {
  if (SHOP_ID) return SHOP_ID;
  
  const tokens = tokenStorage.getTokens();
  const currentAccessToken = tokens.accessToken;
  
  try {
    // First, try to search for the shop publicly
    console.log(`Searching for shop: ${SHOP_NAME}`);
    const searchResponse = await axios.get(`${ETSY_API_BASE}/application/shops`, {
      headers: {
        'Authorization': `Bearer ${currentAccessToken}`,
        'x-api-key': process.env.ETSY_KEYSTRING
      },
      params: {
        shop_name: SHOP_NAME,
        limit: 1
      }
    });
    
    if (searchResponse.data.results && searchResponse.data.results.length > 0) {
      SHOP_ID = searchResponse.data.results[0].shop_id;
      console.log(`Found shop ID via search: ${SHOP_ID} for shop: ${SHOP_NAME}`);
      return SHOP_ID;
    }
  } catch (searchError) {
    console.error('Error searching for shop:', searchError.response?.data || searchError.message);
  }

  // If search doesn't work, try getting user's own shops
  const userId = getUserIdFromToken(currentAccessToken);
  
  if (userId) {
    try {
      console.log(`Getting shops for authenticated user ID: ${userId}`);
      const userResponse = await axios.get(`${ETSY_API_BASE}/application/users/${userId}/shops`, {
        headers: {
          'Authorization': `Bearer ${currentAccessToken}`,
          'x-api-key': process.env.ETSY_KEYSTRING
        }
      });
      
      if (userResponse.data.results && userResponse.data.results.length > 0) {
        console.log('Found shops:', userResponse.data.results.map(s => `${s.shop_name} (ID: ${s.shop_id})`));
        
        // Find the shop by name
        const shop = userResponse.data.results.find(s => s.shop_name === SHOP_NAME);
        if (shop) {
          SHOP_ID = shop.shop_id;
          console.log(`Found shop ID: ${SHOP_ID} for shop: ${SHOP_NAME}`);
          return SHOP_ID;
        } else {
          // Just use the first shop if exact name not found
          SHOP_ID = userResponse.data.results[0].shop_id;
          console.log(`Shop '${SHOP_NAME}' not found, using first shop ID: ${SHOP_ID} (${userResponse.data.results[0].shop_name})`);
          return SHOP_ID;
        }
      } else {
        console.log('Your account has no shops. You need the shop owner to authorize the app.');
      }
    } catch (error) {
      console.error('Error getting user shops:', error.response?.data || error.message);
    }
  }
  
  return null;
}

// Refresh access token
async function refreshAccessToken() {
  const tokens = tokenStorage.getTokens();
  if (!tokens.refreshToken) return false;
  
  try {
    const tokenData = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ETSY_KEYSTRING,
      refresh_token: tokens.refreshToken
    });

    const response = await axios.post('https://api.etsy.com/v3/public/oauth/token', tokenData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    const { access_token, refresh_token: new_refresh_token, expires_in } = response.data;
    
    tokenStorage.setTokens(access_token, new_refresh_token, Date.now() + (expires_in * 1000));
    
    return true;
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    return false;
  }
}

// Middleware to ensure valid token and shop ID
async function ensureValidToken() {
  const tokens = tokenStorage.getTokens();
  
  if (!tokens.accessToken || Date.now() >= tokens.tokenExpiry) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      throw new Error('Admin authentication required - shop owner needs to authorize the app first');
    }
  }
  
  // Ensure we have the shop ID
  if (!SHOP_ID) {
    await getShopId();
    if (!SHOP_ID) {
      throw new Error('Could not determine shop ID');
    }
  }
  
  return true;
}

module.exports = {
  ETSY_API_BASE,
  SHOP_NAME,
  accessToken: () => tokenStorage.getTokens().accessToken,
  refreshToken: () => tokenStorage.getTokens().refreshToken,
  tokenExpiry: () => tokenStorage.getTokens().tokenExpiry,
  SHOP_ID: () => SHOP_ID,
  oauthSessions,
  setTokens: (access, refresh, expiry) => {
    tokenStorage.setTokens(access, refresh, expiry);
  },
  getUserIdFromToken,
  getShopId,
  refreshAccessToken,
  ensureValidToken,
  tokenStorage
};
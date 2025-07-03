import { isAuthenticated } from '../_lib/tokenStorage.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isAuth = isAuthenticated();
  
  res.json({
    adminAuthenticated: isAuth,
    message: isAuth 
      ? 'Shop owner has authenticated - all visitors can see products'
      : 'Shop owner needs to authenticate once for all visitors to see products'
  });
}
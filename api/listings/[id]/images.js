import axios from 'axios';
import { ETSY_API_BASE, accessToken, ensureValidToken } from '../../_lib/auth.js';

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

  const { id } = req.query;

  try {
    await ensureValidToken();
    
    const response = await axios.get(`${ETSY_API_BASE}/application/listings/${id}/images`, {
      headers: {
        'Authorization': `Bearer ${accessToken()}`,
        'x-api-key': process.env.ETSY_KEYSTRING
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Images API error:', error.response?.data || error.message);
    
    if (error.message === 'Authentication required') {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
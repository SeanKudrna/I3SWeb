/**
 * Etsy API v3 service for fetching shop data via authenticated backend
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  EtsyShop,
  EtsyListing,
  EtsyListingImage,
  EtsyReview,
  EtsyApiResponse,
  EtsyError,
  EtsySearchFilters,
  EtsyListingInventory,
  EtsyShopSection,
} from '../types/etsy';

// Determine backend URL based on environment
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL || 
  (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('i3s-web')
    ? window.location.origin // Use same domain in production (Vercel)
    : 'http://localhost:8080' // Local development
  );

class EtsyApiService {
  private api: AxiosInstance;
  private isAuthenticated: boolean = false;

  constructor() {
    console.log('Current hostname:', window.location.hostname);
    console.log('Current origin:', window.location.origin);
    console.log('Backend URL:', BACKEND_BASE_URL);
    console.log('Environment variables:', {
      REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
      NODE_ENV: process.env.NODE_ENV
    });
    
    this.api = axios.create({
      baseURL: BACKEND_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<EtsyError>) => {
        if (error.response?.status === 401) {
          this.isAuthenticated = false;
          console.warn('Authentication required - redirecting to OAuth');
        }
        return Promise.reject(error);
      }
    );

    // Check authentication status on initialization
    this.checkAuthStatus();
  }

  /**
   * Check if admin is authenticated (shop owner)
   */
  async checkAuthStatus(): Promise<boolean> {
    try {
      const response = await this.api.get('/api/admin/status');
      this.isAuthenticated = response.data.adminAuthenticated;
      return this.isAuthenticated;
    } catch (error) {
      this.isAuthenticated = false;
      return false;
    }
  }

  /**
   * Get OAuth authorization URL
   */
  async getAuthUrl(): Promise<string> {
    try {
      const response = await this.api.get('/api/auth/etsy');
      return response.data.authUrl;
    } catch (error) {
      console.error('Error getting auth URL:', error);
      throw error;
    }
  }

  /**
   * Initiate OAuth flow
   */
  async authenticate(): Promise<void> {
    try {
      const authUrl = await this.getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating authentication:', error);
      throw error;
    }
  }

  /**
   * Check if authenticated, throw error if not
   */
  private async ensureAuthenticated(): Promise<void> {
    if (!this.isAuthenticated) {
      const isAuth = await this.checkAuthStatus();
      if (!isAuth) {
        throw new Error('Authentication required');
      }
    }
  }

  /**
   * Get shop information
   */
  async getShop(): Promise<EtsyShop> {
    try {
      await this.ensureAuthenticated();
      const response = await this.api.get<EtsyShop>('/api/shop');
      return response.data;
    } catch (error) {
      console.error('Error fetching shop data:', error);
      throw error;
    }
  }

  /**
   * Get all active listings for the shop
   */
  async getActiveListings(filters?: EtsySearchFilters): Promise<EtsyApiResponse<EtsyListing>> {
    try {
      await this.ensureAuthenticated();
      const params = {
        limit: filters?.limit || 100,
        offset: filters?.offset || 0,
        sort_on: filters?.sort_on || 'created',
        sort_order: filters?.sort_order || 'desc',
        ...filters,
      };

      const response = await this.api.get<EtsyApiResponse<EtsyListing>>(
        '/api/listings',
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }

  /**
   * Get a specific listing by ID
   */
  async getListing(listingId: number): Promise<EtsyListing> {
    try {
      await this.ensureAuthenticated();
      const response = await this.api.get<EtsyApiResponse<EtsyListing>>(
        `/api/listings/${listingId}`
      );
      return response.data.results[0];
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  }

  /**
   * Get listing images
   */
  async getListingImages(listingId: number): Promise<EtsyListingImage[]> {
    try {
      await this.ensureAuthenticated();
      const response = await this.api.get<EtsyApiResponse<EtsyListingImage>>(
        `/api/listings/${listingId}/images`
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching listing images:', error);
      throw error;
    }
  }

  /**
   * Get listing inventory (variations, prices, quantities)
   */
  async getListingInventory(listingId: number): Promise<EtsyListingInventory> {
    try {
      const response = await this.api.get<EtsyListingInventory>(
        `/listings/${listingId}/inventory`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching listing inventory:', error);
      throw error;
    }
  }

  /**
   * Get shop reviews
   */
  async getShopReviews(limit: number = 100, offset: number = 0): Promise<EtsyApiResponse<EtsyReview>> {
    try {
      await this.ensureAuthenticated();
      const response = await this.api.get<EtsyApiResponse<EtsyReview>>(
        '/api/reviews',
        {
          params: { limit, offset },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }

  /**
   * Get listing reviews
   */
  async getListingReviews(
    listingId: number,
    limit: number = 100,
    offset: number = 0
  ): Promise<EtsyApiResponse<EtsyReview>> {
    try {
      const response = await this.api.get<EtsyApiResponse<EtsyReview>>(
        `/listings/${listingId}/reviews`,
        {
          params: { limit, offset },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching listing reviews:', error);
      throw error;
    }
  }

  /**
   * Get shop sections
   */
  async getShopSections(): Promise<EtsyApiResponse<EtsyShopSection>> {
    try {
      await this.ensureAuthenticated();
      const response = await this.api.get<EtsyApiResponse<EtsyShopSection>>(
        '/api/sections'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching shop sections:', error);
      throw error;
    }
  }

  /**
   * Search listings with text query
   */
  async searchListings(query: string, filters?: EtsySearchFilters): Promise<EtsyApiResponse<EtsyListing>> {
    try {
      const listings = await this.getActiveListings(filters);
      
      // Filter listings based on search query
      const searchLower = query.toLowerCase();
      const filteredResults = listings.results.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.description.toLowerCase().includes(searchLower) ||
        listing.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );

      return {
        count: filteredResults.length,
        results: filteredResults,
      };
    } catch (error) {
      console.error('Error searching listings:', error);
      throw error;
    }
  }

  /**
   * Get featured listings
   */
  async getFeaturedListings(limit: number = 6): Promise<EtsyApiResponse<EtsyListing>> {
    try {
      const listings = await this.getActiveListings({
        limit: 100,
        sort_on: 'score',
      });

      // Sort by featured rank and take top items
      const featured = listings.results
        .sort((a, b) => a.featured_rank - b.featured_rank)
        .slice(0, limit);

      return {
        count: featured.length,
        results: featured,
      };
    } catch (error) {
      console.error('Error fetching featured listings:', error);
      throw error;
    }
  }

  /**
   * Get shop statistics
   */
  async getShopStats() {
    try {
      const [shop, listings, reviews] = await Promise.all([
        this.getShop(),
        this.getActiveListings({ limit: 1 }),
        this.getShopReviews(1, 0),
      ]);

      return {
        totalListings: listings.count,
        totalReviews: reviews.count,
        averageRating: shop.review_average || 0,
        totalSales: shop.transaction_sold_count,
        favoriteCount: shop.num_favorers,
      };
    } catch (error) {
      console.error('Error fetching shop stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const etsyApi = new EtsyApiService();
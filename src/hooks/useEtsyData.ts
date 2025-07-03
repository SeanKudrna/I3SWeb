/**
 * Custom hook for fetching Etsy data with caching and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { etsyApi } from '../services/etsyApi';
import {
  EtsySearchFilters,
  ProcessedListing,
} from '../types/etsy';
import { formatPrice } from '../utils/formatting';

interface UseEtsyDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Generic hook for fetching Etsy data
 */
function useEtsyData<T>(
  fetcher: () => Promise<T>,
  dependencies: any[] = []
): UseEtsyDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for fetching shop data
 */
export const useShop = () => {
  return useEtsyData(() => etsyApi.getShop());
};

/**
 * Hook for fetching shop sections
 */
export const useShopSections = () => {
  return useEtsyData(() => etsyApi.getShopSections());
};

/**
 * Hook for fetching active listings with processing
 */
export const useListings = (filters?: EtsySearchFilters) => {
  const [processedListings, setProcessedListings] = useState<ProcessedListing[]>([]);
  
  const { data, loading, error, refetch } = useEtsyData(
    () => etsyApi.getActiveListings(filters),
    [JSON.stringify(filters)]
  );

  useEffect(() => {
    const processListings = async () => {
      if (!data?.results) return;

      const processed = await Promise.all(
        data.results.map(async (listing) => {
          try {
            const images = await etsyApi.getListingImages(listing.listing_id);
            return {
              ...listing,
              images,
              primaryImage: images[0],
              displayPrice: formatPrice(listing.price),
            } as ProcessedListing;
          } catch {
            return {
              ...listing,
              images: [],
              displayPrice: formatPrice(listing.price),
            } as ProcessedListing;
          }
        })
      );

      setProcessedListings(processed);
    };

    processListings();
  }, [data]);

  return {
    data: processedListings,
    totalCount: data?.count || 0,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for fetching a single listing with full details
 */
export const useListing = (listingId: number | null) => {
  const [fullListing, setFullListing] = useState<ProcessedListing | null>(null);
  
  const { data: listing, loading, error, refetch } = useEtsyData(
    () => (listingId ? etsyApi.getListing(listingId) : Promise.resolve(null)),
    [listingId]
  );

  useEffect(() => {
    const fetchFullDetails = async () => {
      if (!listing || !listingId) return;

      try {
        const [images, inventory] = await Promise.all([
          etsyApi.getListingImages(listingId),
          etsyApi.getListingInventory(listingId).catch(() => null),
        ]);

        setFullListing({
          ...listing,
          images,
          inventory: inventory || undefined,
          primaryImage: images[0],
          displayPrice: formatPrice(listing.price),
        });
      } catch (err) {
        console.error('Error fetching listing details:', err);
      }
    };

    fetchFullDetails();
  }, [listing, listingId]);

  return {
    data: fullListing,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for fetching shop reviews
 */
export const useShopReviews = (limit: number = 100, offset: number = 0) => {
  return useEtsyData(
    () => etsyApi.getShopReviews(limit, offset),
    [limit, offset]
  );
};

/**
 * Hook for fetching listing reviews
 */
export const useListingReviews = (
  listingId: number | null,
  limit: number = 100,
  offset: number = 0
) => {
  return useEtsyData(
    () => (listingId ? etsyApi.getListingReviews(listingId, limit, offset) : Promise.resolve({ count: 0, results: [] })),
    [listingId, limit, offset]
  );
};

/**
 * Hook for searching listings
 */
export const useSearchListings = (query: string, filters?: EtsySearchFilters) => {
  const [results, setResults] = useState<ProcessedListing[]>([]);
  
  const { data, loading, error, refetch } = useEtsyData(
    () => (query ? etsyApi.searchListings(query, filters) : Promise.resolve({ count: 0, results: [] })),
    [query, JSON.stringify(filters)]
  );

  useEffect(() => {
    const processResults = async () => {
      if (!data?.results) return;

      const processed = await Promise.all(
        data.results.map(async (listing) => {
          try {
            const images = await etsyApi.getListingImages(listing.listing_id);
            return {
              ...listing,
              images,
              primaryImage: images[0],
              displayPrice: formatPrice(listing.price),
            } as ProcessedListing;
          } catch {
            return {
              ...listing,
              images: [],
              displayPrice: formatPrice(listing.price),
            } as ProcessedListing;
          }
        })
      );

      setResults(processed);
    };

    processResults();
  }, [data]);

  return {
    data: results,
    totalCount: data?.count || 0,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for fetching featured listings
 */
export const useFeaturedListings = (limit: number = 6) => {
  const [featured, setFeatured] = useState<ProcessedListing[]>([]);
  
  const { data, loading, error, refetch } = useEtsyData(
    () => etsyApi.getFeaturedListings(limit),
    [limit]
  );

  useEffect(() => {
    const processFeatured = async () => {
      if (!data?.results) return;

      const processed = await Promise.all(
        data.results.map(async (listing) => {
          try {
            const images = await etsyApi.getListingImages(listing.listing_id);
            return {
              ...listing,
              images,
              primaryImage: images[0],
              displayPrice: formatPrice(listing.price),
            } as ProcessedListing;
          } catch {
            return {
              ...listing,
              images: [],
              displayPrice: formatPrice(listing.price),
            } as ProcessedListing;
          }
        })
      );

      setFeatured(processed);
    };

    processFeatured();
  }, [data]);

  return {
    data: featured,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for fetching shop statistics
 */
export const useShopStats = () => {
  return useEtsyData(() => etsyApi.getShopStats());
};
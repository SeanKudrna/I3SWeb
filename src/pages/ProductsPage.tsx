/**
 * Products listing page with filtering and pagination
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EtsySearchFilters } from '../types/etsy';
import { useListings } from '../hooks/useEtsyData';
import ProductGrid from '../components/Product/ProductGrid';
import ProductFilters from '../components/Product/ProductFilters';
import { ITEMS_PER_PAGE } from '../utils/constants';

const PageContainer = styled.div`
  min-height: 60vh;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? '#2e7d32' : '#ddd'};
  background: ${props => props.active ? '#2e7d32' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#1b5e20' : '#f5f5f5'};
    border-color: #2e7d32;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: #666;
  font-size: 0.875rem;
`;

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<EtsySearchFilters>({
    sort_on: 'created',
    sort_order: 'desc',
    limit: ITEMS_PER_PAGE,
    offset: 0,
  });

  // Parse filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const tags = searchParams.get('tags');
    const page = searchParams.get('page');

    setFilters(prev => ({
      ...prev,
      tags: tags ? tags.split(',') : category ? [category] : undefined,
      min_price: minPrice ? parseFloat(minPrice) : undefined,
      max_price: maxPrice ? parseFloat(maxPrice) : undefined,
    }));

    setCurrentPage(page ? parseInt(page) : 1);
  }, [searchParams]);

  const { data: products, totalCount, loading, error, refetch } = useListings({
    ...filters,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleFiltersChange = (newFilters: EtsySearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.tags?.length) params.set('tags', newFilters.tags.join(','));
    if (newFilters.min_price) params.set('minPrice', newFilters.min_price.toString());
    if (newFilters.max_price) params.set('maxPrice', newFilters.max_price.toString());
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    setSearchParams(params);
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>All Products</h1>
        <p>Discover our complete collection of 3D printed gaming accessories</p>
      </PageHeader>

      <ProductFilters
        totalCount={totalCount}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        onRetry={refetch}
      />

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </PageContainer>
  );
};

export default ProductsPage;
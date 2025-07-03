/**
 * Product grid component for displaying multiple products
 */

import styled from 'styled-components';
import { ProcessedListing } from '../../types/etsy';
import ProductCard from './ProductCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    gap: 2rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  
  svg {
    width: 64px;
    height: 64px;
    color: #666;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

interface ProductGridProps {
  products: ProcessedListing[];
  loading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  error = null,
  onRetry,
  emptyMessage = 'No products found',
}) => {
  if (loading) {
    return <LoadingSpinner fullScreen text="Loading products..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load products"
        message={error.message || 'Something went wrong while loading products.'}
        onRetry={onRetry}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15.5h-1.5V14h-1v3H8v-3H7v4.5H5.5V5.5h1.25v5.5H8V6h1.5v5h1V6H12v5h1V6h1.5v5h1V5.5H17v13h-1.5V14h-1v3h-1.5v1.5zm1.5-13v3H12V6h1.5z"/>
        </svg>
        <h3>{emptyMessage}</h3>
        <p>Try adjusting your filters or search terms</p>
      </EmptyState>
    );
  }

  return (
    <Grid>
      {products.map((product, index) => (
        <ProductCard
          key={product.listing_id}
          product={product}
          index={index}
        />
      ))}
    </Grid>
  );
};

export default ProductGrid;
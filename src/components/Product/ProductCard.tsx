/**
 * Product card component for listing display
 */

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { COLORS, SHADOWS, TRANSITIONS } from '../../utils/constants';
import { ProcessedListing } from '../../types/etsy';
import { truncateText } from '../../utils/formatting';

const Card = styled(motion.article)`
  background: ${COLORS.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${SHADOWS.sm};
  transition: ${TRANSITIONS.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${SHADOWS.lg};
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled(Link)`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: ${COLORS.background};
`;

const ProductImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${TRANSITIONS.slow};

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.span<{ type: 'sale' | 'new' | 'featured' }>`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  background: ${props => {
    switch (props.type) {
      case 'sale': return COLORS.error;
      case 'new': return COLORS.success;
      case 'featured': return COLORS.secondary;
      default: return COLORS.primary;
    }
  }};
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  box-shadow: ${SHADOWS.md};
  transition: ${TRANSITIONS.fast};
  opacity: 0;

  ${Card}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${COLORS.text.secondary};
    transition: ${TRANSITIONS.fast};
  }

  &:hover svg {
    fill: ${COLORS.error};
  }
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  
  a {
    color: ${COLORS.text.primary};
    text-decoration: none;
    display: block;
    line-height: 1.4;
    
    &:hover {
      color: ${COLORS.primary};
    }
  }
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.primary};
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${COLORS.text.secondary};
  margin-top: auto;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 16px;
    height: 16px;
    fill: ${COLORS.secondary};
  }
`;

const QuickActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 1rem 1rem;
`;

const ActionButton = styled(Link)`
  flex: 1;
  padding: 0.75rem 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 4px;
  text-decoration: none;
  transition: ${TRANSITIONS.fast};

  &.primary {
    background: ${COLORS.primary};
    color: white;

    &:hover {
      background: ${COLORS.primaryDark};
    }
  }

  &.secondary {
    background: ${COLORS.background};
    color: ${COLORS.text.primary};
    border: 1px solid ${COLORS.border};

    &:hover {
      background: ${COLORS.border};
    }
  }
`;

interface ProductCardProps {
  product: ProcessedListing;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const isNew = Date.now() - product.created_timestamp * 1000 < 7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <ImageContainer to={`/product/${product.listing_id}`}>
        <ProductImage
          src={product.primaryImage?.url_570xN || '/placeholder.jpg'}
          alt={product.title}
          effect="blur"
          placeholder={<div style={{ backgroundColor: COLORS.background, width: '100%', height: '100%' }} />}
        />
        {isNew && <Badge type="new">New</Badge>}
        {product.featured_rank <= 5 && <Badge type="featured">Featured</Badge>}
        <FavoriteButton 
          onClick={(e) => {
            e.preventDefault();
            // Handle favorite functionality
          }}
          aria-label="Add to favorites"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </FavoriteButton>
      </ImageContainer>

      <Content>
        <Title>
          <Link to={`/product/${product.listing_id}`}>
            {truncateText(product.title, 60)}
          </Link>
        </Title>
        
        <Price>{product.displayPrice}</Price>
        
        <MetaInfo>
          {product.num_favorers > 0 && (
            <Rating>
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>{product.num_favorers}</span>
            </Rating>
          )}
          {product.views > 0 && (
            <span>{product.views} views</span>
          )}
        </MetaInfo>
      </Content>

      <QuickActions>
        <ActionButton to={`/product/${product.listing_id}`} className="secondary">
          View Details
        </ActionButton>
        <ActionButton 
          to={product.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="primary"
        >
          Buy on Etsy
        </ActionButton>
      </QuickActions>
    </Card>
  );
};

export default ProductCard;
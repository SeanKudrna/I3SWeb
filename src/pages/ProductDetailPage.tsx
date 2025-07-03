/**
 * Product detail page with images, reviews, and variations
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { COLORS, TRANSITIONS } from '../utils/constants';
import { useListing, useListingReviews } from '../hooks/useEtsyData';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';
import { formatDate, formatProcessingTime, generateStarRating } from '../utils/formatting';

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BreadCrumb = styled.nav`
  margin-bottom: 2rem;
  font-size: 0.875rem;

  a {
    color: ${COLORS.text.secondary};
    text-decoration: none;

    &:hover {
      color: ${COLORS.primary};
    }
  }

  span {
    margin: 0 0.5rem;
    color: ${COLORS.text.disabled};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;

const ImageSection = styled.div`
  position: sticky;
  top: 2rem;
  align-self: start;
`;

const MainImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: ${COLORS.background};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ImageThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
`;

const Thumbnail = styled.button<{ active?: boolean }>`
  aspect-ratio: 1;
  border: 2px solid ${props => props.active ? COLORS.primary : COLORS.border};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.primary};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.primary};
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${COLORS.border};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${COLORS.text.secondary};

  svg {
    width: 20px;
    height: 20px;
  }
`;

const VariationSection = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const VariationOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const VariationButton = styled.button<{ selected?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.selected ? COLORS.primary : COLORS.border};
  background: ${props => props.selected ? COLORS.primary : COLORS.surface};
  color: ${props => props.selected ? 'white' : COLORS.text.primary};
  border-radius: 4px;
  font-weight: 500;
  transition: ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BuyButton = styled.a`
  flex: 1;
  padding: 1rem 2rem;
  background: ${COLORS.primary};
  color: white;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  transition: ${TRANSITIONS.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${COLORS.primaryDark};
    transform: translateY(-1px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FavoriteButton = styled.button`
  padding: 1rem;
  border: 2px solid ${COLORS.border};
  background: ${COLORS.surface};
  border-radius: 4px;
  transition: ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.error};
    background: rgba(244, 67, 54, 0.05);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${COLORS.text.secondary};
  }

  &:hover svg {
    fill: ${COLORS.error};
  }
`;

const Description = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.8;
    white-space: pre-wrap;
  }
`;

const TabSection = styled.div`
  margin-bottom: 3rem;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid ${COLORS.border};
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 1rem 1.5rem;
  font-weight: 500;
  color: ${props => props.active ? COLORS.primary : COLORS.text.secondary};
  border-bottom: 2px solid ${props => props.active ? COLORS.primary : 'transparent'};
  margin-bottom: -2px;
  transition: ${TRANSITIONS.fast};

  &:hover {
    color: ${COLORS.primary};
  }
`;

const TabContent = styled.div``;

const DetailsGrid = styled.dl`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;

  dt {
    font-weight: 600;
    color: ${COLORS.text.secondary};
  }

  dd {
    margin: 0;
  }
`;

const ReviewsSection = styled.div``;

const ReviewCard = styled.div`
  background: ${COLORS.background};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ReviewRating = styled.div`
  color: ${COLORS.secondary};
  font-size: 0.875rem;
`;

const ReviewDate = styled.time`
  color: ${COLORS.text.secondary};
  font-size: 0.875rem;
`;

const ReviewText = styled.p`
  line-height: 1.6;
  margin: 0;
`;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'reviews'>('details');
  
  const { data: product, loading, error, refetch } = useListing(id ? parseInt(id) : null);
  const { data: reviews } = useListingReviews(id ? parseInt(id) : null);

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <ErrorMessage
        title="Product not found"
        message="The product you're looking for doesn't exist or has been removed."
        onRetry={refetch}
      />
    );
  }

  const currentImage = product.images[selectedImage];

  return (
    <ProductContainer>
      <BreadCrumb>
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.title}</span>
      </BreadCrumb>

      <ProductGrid>
        <ImageSection>
          <MainImage>
            <LazyLoadImage
              src={currentImage?.url_fullxfull || '/placeholder.jpg'}
              alt={product.title}
              effect="blur"
              width="100%"
              height="100%"
              style={{ objectFit: 'cover' }}
            />
          </MainImage>
          
          {product.images.length > 1 && (
            <ImageThumbnails>
              {product.images.map((image, index) => (
                <Thumbnail
                  key={image.listing_image_id}
                  active={index === selectedImage}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image.url_170x135} alt={`${product.title} ${index + 1}`} />
                </Thumbnail>
              ))}
            </ImageThumbnails>
          )}
        </ImageSection>

        <ProductInfo>
          <Title>{product.title}</Title>
          
          <PriceSection>
            <Price>{product.displayPrice}</Price>
          </PriceSection>

          <MetaInfo>
            <MetaItem>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {product.num_favorers} favorites
            </MetaItem>
            <MetaItem>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              {product.views} views
            </MetaItem>
            <MetaItem>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
              </svg>
              Ships in {formatProcessingTime(product.processing_min, product.processing_max)}
            </MetaItem>
          </MetaInfo>

          {product.inventory && product.inventory.products.length > 0 && (
            <VariationSection>
              <h3>Options</h3>
              <VariationOptions>
                {product.inventory.products.map((variant) => (
                  <VariationButton
                    key={variant.product_id}
                    selected={false}
                  >
                    {variant.property_values.map(pv => pv.values.join(', ')).join(' / ')}
                  </VariationButton>
                ))}
              </VariationOptions>
            </VariationSection>
          )}

          <ActionButtons>
            <BuyButton
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zM10 6a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z"/>
              </svg>
              Buy on Etsy
            </BuyButton>
            <FavoriteButton>
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </FavoriteButton>
          </ActionButtons>

          <Description>
            <h2>Description</h2>
            <p>{product.description}</p>
          </Description>

          <TabSection>
            <TabList>
              <Tab
                active={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
              >
                Details
              </Tab>
              <Tab
                active={activeTab === 'shipping'}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Policies
              </Tab>
              <Tab
                active={activeTab === 'reviews'}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews?.count || 0})
              </Tab>
            </TabList>

            <TabContent>
              {activeTab === 'details' && (
                <DetailsGrid>
                  <dt>Materials</dt>
                  <dd>{product.materials.join(', ') || 'PLA Plastic'}</dd>
                  
                  <dt>Tags</dt>
                  <dd>{product.tags.join(', ')}</dd>
                  
                  <dt>Listed on</dt>
                  <dd>{formatDate(product.created_timestamp)}</dd>
                  
                  {product.item_weight && (
                    <>
                      <dt>Weight</dt>
                      <dd>{product.item_weight} {product.item_weight_unit}</dd>
                    </>
                  )}
                  
                  {product.item_length && (
                    <>
                      <dt>Dimensions</dt>
                      <dd>
                        {product.item_length} x {product.item_width} x {product.item_height} {product.item_dimensions_unit}
                      </dd>
                    </>
                  )}
                </DetailsGrid>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3>Processing Time</h3>
                  <p>The time I need to prepare an order for shipping varies. For details, see individual items.</p>
                  <p>Estimated processing time: {formatProcessingTime(product.processing_min, product.processing_max)}</p>
                  
                  <h3>Shipping Policy</h3>
                  <p>Items are shipped via USPS First Class or Priority Mail with tracking.</p>
                  
                  <h3>Return Policy</h3>
                  <p>I gladly accept returns and exchanges. Contact me within 14 days of delivery.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <ReviewsSection>
                  {reviews?.results.length === 0 ? (
                    <p>No reviews yet. Be the first to review this product!</p>
                  ) : (
                    reviews?.results.map((review) => (
                      <ReviewCard key={`${review.listing_id}-${review.create_timestamp}`}>
                        <ReviewHeader>
                          <ReviewRating>{generateStarRating(review.rating)}</ReviewRating>
                          <ReviewDate>{formatDate(review.created_timestamp)}</ReviewDate>
                        </ReviewHeader>
                        {review.review && <ReviewText>{review.review}</ReviewText>}
                      </ReviewCard>
                    ))
                  )}
                </ReviewsSection>
              )}
            </TabContent>
          </TabSection>
        </ProductInfo>
      </ProductGrid>
    </ProductContainer>
  );
};

export default ProductDetailPage;
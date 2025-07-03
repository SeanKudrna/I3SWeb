/**
 * Footer component with shop information and links
 */

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS, ETSY_SHOP_URL } from '../../utils/constants';
import { useShop } from '../../hooks/useEtsyData';

const FooterContainer = styled.footer`
  background: ${COLORS.text.primary};
  color: white;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: white;
  }

  p, a {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    line-height: 1.6;
  }

  a {
    display: block;
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    svg {
      width: 20px;
      height: 20px;
      fill: white;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  font-size: 0.875rem;
  
  strong {
    display: block;
    font-size: 1.25rem;
    color: ${COLORS.secondary};
  }
`;

const Footer: React.FC = () => {
  const { data: shop } = useShop();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <h3>About Innovative 3D Shop</h3>
            <p>
              Premium 3D printed accessories for retro gaming enthusiasts. 
              Custom designs for your favorite consoles and controllers.
            </p>
            {shop && (
              <StatsGrid>
                <StatItem>
                  <strong>{shop.listing_active_count}</strong>
                  Active Products
                </StatItem>
                <StatItem>
                  <strong>{shop.transaction_sold_count}</strong>
                  Happy Customers
                </StatItem>
              </StatsGrid>
            )}
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <Link to="/products">All Products</Link>
            <Link to="/about">About Us</Link>
            <Link to="/reviews">Customer Reviews</Link>
            <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer">
              Visit Etsy Shop
            </a>
          </FooterSection>

          <FooterSection>
            <h3>Categories</h3>
            <Link to="/products?category=nintendo">Nintendo Accessories</Link>
            <Link to="/products?category=playstation">PlayStation Accessories</Link>
            <Link to="/products?category=xbox">Xbox Accessories</Link>
            <Link to="/products?category=retro">Retro Gaming</Link>
          </FooterSection>

          <FooterSection>
            <h3>Connect With Us</h3>
            <p>Follow us for updates on new products and special offers!</p>
            <SocialLinks>
              <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer" aria-label="Etsy">
                <svg viewBox="0 0 24 24">
                  <path d="M7.2 3.6c0-.4-.1-.6-.6-.6H3.7c-.3 0-.5.1-.6.4-.3.9-.7 2.8-.7 2.8-.1.3-.2.4-.5.4H.5c-.3 0-.5.2-.5.5v.8c0 .3.2.5.5.5h1.3c.3 0 .5.2.5.5v8.8c0 .3-.2.5-.5.5H.5c-.3 0-.5.2-.5.5v.8c0 .3.2.5.5.5h7.1c.3 0 .5-.2.5-.5v-.8c0-.3-.2-.5-.5-.5H6.1c-.3 0-.5-.2-.5-.5v-3.6c0-.3.2-.5.5-.5h1.1c.2 0 .4-.1.5-.3l.7-1.9c.1-.3 0-.6-.3-.7-.1 0-.1-.1-.2-.1H6.1c-.3 0-.5-.2-.5-.5V7.2c0-.3.2-.5.5-.5h.6c.2 0 .4-.1.5-.3l.7-2.1c.1-.2.1-.4.1-.7z"/>
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <svg viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </SocialLinks>
          </FooterSection>
        </FooterContent>

        <Copyright>
          <p>&copy; {currentYear} Innovative 3D Shop. All rights reserved.</p>
          <p>
            <Link to="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link> | 
            <Link to="/terms" style={{ color: 'inherit' }}> Terms of Service</Link> | 
            <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}> Shop on Etsy</a>
          </p>
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer;
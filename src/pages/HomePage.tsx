/**
 * Modern retro gaming homepage
 */

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, GAMING_EMOJIS, SITE_NAME, SITE_DESCRIPTION, CONSOLE_COLORS } from '../utils/constants';
import { useShop, useFeaturedListings, useShopStats } from '../hooks/useEtsyData';
import ProductGrid from '../components/Product/ProductGrid';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import AuthButton from '../components/Common/AuthButton';

const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, ${COLORS.backgroundLight} 0%, ${COLORS.surface} 100%);
  padding: 6rem 0 4rem;
  margin-bottom: 4rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent});
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 0.9;
  letter-spacing: -0.02em;
  
  &.hero {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: ${COLORS.text.secondary};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  line-height: 1.4;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeroButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark});
    color: white;
    box-shadow: ${COLORS.glow.primary};

    &:hover {
      transform: translateY(-3px);
      box-shadow: ${COLORS.glow.primary}, 0 12px 30px rgba(0, 0, 0, 0.3);
      color: white;
    }
  }

  &.secondary {
    background: transparent;
    color: ${COLORS.primary};
    border: 2px solid ${COLORS.primary};

    &:hover {
      background: ${COLORS.primary};
      color: white;
      transform: translateY(-3px);
      box-shadow: ${COLORS.glow.primary};
    }
  }

  .icon {
    width: 20px;
    height: 20px;
  }
`;

const HeroAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &.primary {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark});
    color: white;
    box-shadow: ${COLORS.glow.primary};

    &:hover {
      transform: translateY(-3px);
      box-shadow: ${COLORS.glow.primary}, 0 12px 30px rgba(0, 0, 0, 0.3);
      color: white;
    }
  }

  &.secondary {
    background: transparent;
    color: ${COLORS.primary};
    border: 2px solid ${COLORS.primary};

    &:hover {
      background: ${COLORS.primary};
      color: white;
      transform: translateY(-3px);
      box-shadow: ${COLORS.glow.primary};
    }
  }

  .icon {
    width: 20px;
    height: 20px;
  }
`;

const FeaturesSection = styled.section`
  margin-bottom: 5rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight});
  border: 1px solid ${COLORS.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${COLORS.glow.primary}, 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${COLORS.primary};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  &.console-nintendo { color: ${CONSOLE_COLORS.nintendo}; }
  &.console-playstation { color: ${CONSOLE_COLORS.playstation}; }
  &.console-xbox { color: ${CONSOLE_COLORS.xbox}; }
  &.console-arcade { color: ${CONSOLE_COLORS.arcade}; }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${COLORS.text.primary};
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: ${COLORS.text.secondary};
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight});
  border: 1px solid ${COLORS.border};
  border-radius: 20px;
  padding: 3rem 2rem;
  margin-bottom: 5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent});
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-label {
    color: ${COLORS.text.secondary};
    font-size: 0.95rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const Section = styled.section`
  margin-bottom: 5rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 1rem;
    position: relative;
  }
  
  .section-subtitle {
    color: ${COLORS.text.secondary};
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary});
  color: white;
  border-radius: 10px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 2rem auto 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${COLORS.glow.accent}, 0 8px 25px rgba(0, 0, 0, 0.3);
    color: white;
  }

  .icon {
    width: 18px;
    height: 18px;
  }
`;

const HomePage: React.FC = () => {
  const { error: shopError } = useShop();
  const { data: featuredProducts, loading, error: productsError, refetch } = useFeaturedListings(6);
  const { data: stats, error: statsError } = useShopStats();

  const hasApiErrors = shopError || productsError || statsError;

  return (
    <>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <HeroTitle
              className="hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {SITE_NAME}
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {SITE_DESCRIPTION}. Level up your retro gaming setup with custom 3D printed accessories.
            </HeroSubtitle>
            <HeroButtons
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <HeroButton to="/products" className="primary">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Explore Gear
              </HeroButton>
              <HeroAnchor 
                href="https://www.etsy.com/shop/Innovative3DShop" 
                target="_blank"
                rel="noopener noreferrer"
                className="secondary"
              >
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zM10 6a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z"/>
                </svg>
                Shop on Etsy
              </HeroAnchor>
            </HeroButtons>
          </HeroContent>
        </div>
      </HeroSection>

      <div className="container">
        <FeaturesSection>
          <SectionHeader>
            <h2>Why Gamers Choose I3S</h2>
            <p className="section-subtitle">
              Premium 3D printed accessories designed specifically for retro gaming enthusiasts
            </p>
          </SectionHeader>
          
          <FeaturesGrid>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FeatureIcon className="console-nintendo">{GAMING_EMOJIS.controller}</FeatureIcon>
              <FeatureTitle>Retro Compatible</FeatureTitle>
              <FeatureDescription>
                Perfect fit for classic consoles including Nintendo, PlayStation, Xbox, and more vintage systems.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FeatureIcon className="console-playstation">{GAMING_EMOJIS.gem}</FeatureIcon>
              <FeatureTitle>Premium Quality</FeatureTitle>
              <FeatureDescription>
                High-grade PLA+ materials with precision engineering for durability and perfect finishes.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeatureIcon className="console-xbox">{GAMING_EMOJIS.rocket}</FeatureIcon>
              <FeatureTitle>Fast Delivery</FeatureTitle>
              <FeatureDescription>
                Quick turnaround times with careful packaging to get your gaming accessories to you safely.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FeatureIcon className="console-arcade">{GAMING_EMOJIS.trophy}</FeatureIcon>
              <FeatureTitle>Custom Options</FeatureTitle>
              <FeatureDescription>
                Personalization available for colors, sizing, and special requests to match your setup.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        {/* Show stats if available, otherwise show placeholder */}
        {stats && !statsError ? (
          <StatsSection>
            <SectionHeader>
              <h2>Shop Statistics</h2>
            </SectionHeader>
            <StatsGrid>
              <StatItem
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="stat-number">{stats.totalListings}</div>
                <div className="stat-label">Active Products</div>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="stat-number">{stats.totalSales}</div>
                <div className="stat-label">Happy Customers</div>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="stat-number">{stats.averageRating.toFixed(1)}</div>
                <div className="stat-label">Average Rating</div>
              </StatItem>
              <StatItem
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="stat-number">{stats.favoriteCount}</div>
                <div className="stat-label">Shop Favorites</div>
              </StatItem>
            </StatsGrid>
          </StatsSection>
        ) : (
          <StatsSection>
            <SectionHeader>
              <h2>I3S By The Numbers</h2>
            </SectionHeader>
            <StatsGrid>
              <StatItem>
                <div className="stat-number">24+</div>
                <div className="stat-label">Active Products</div>
              </StatItem>
              <StatItem>
                <div className="stat-number">387+</div>
                <div className="stat-label">Happy Customers</div>
              </StatItem>
              <StatItem>
                <div className="stat-number">4.8</div>
                <div className="stat-label">Average Rating</div>
              </StatItem>
              <StatItem>
                <div className="stat-number">145+</div>
                <div className="stat-label">Shop Favorites</div>
              </StatItem>
            </StatsGrid>
          </StatsSection>
        )}

        <Section>
          <SectionHeader>
            <h2>Featured Products</h2>
            <p className="section-subtitle">
              Discover our most popular 3D printed gaming accessories
            </p>
          </SectionHeader>
          
          {hasApiErrors ? (
            <AuthButton onAuthChange={(authenticated) => {
              if (authenticated) {
                refetch();
              }
            }} />
          ) : loading && !featuredProducts.length ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <LoadingSpinner />
              <p style={{ marginTop: '1rem', color: COLORS.text.secondary }}>
                Loading featured products...
              </p>
            </div>
          ) : (
            <ProductGrid
              products={featuredProducts}
              loading={loading}
              error={productsError}
              onRetry={refetch}
            />
          )}
          
          <div style={{ textAlign: 'center' }}>
            <ViewAllButton to="/products">
              View All Products
              <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </ViewAllButton>
          </div>
        </Section>
      </div>
    </>
  );
};

export default HomePage;
/**
 * About page with shop information
 */

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS, ETSY_SHOP_URL } from '../utils/constants';
import { useShop } from '../hooks/useEtsyData';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${COLORS.primary};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${COLORS.text.secondary};
  margin-bottom: 2rem;
`;

const ContentSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: ${COLORS.primary};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${COLORS.surface};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${SHADOWS.sm};
  text-align: center;

  h3 {
    color: ${COLORS.primary};
    margin-bottom: 1rem;
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
`;

const ProcessSection = styled.div`
  background: ${COLORS.background};
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: ${COLORS.primary};
    color: white;
    border-radius: 50%;
    font-weight: 600;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;

    h4 {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
      color: ${COLORS.primary};
    }

    p {
      margin: 0;
      line-height: 1.6;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: ${COLORS.surface};
  border-radius: 8px;
  box-shadow: ${SHADOWS.sm};

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${COLORS.primary};
    display: block;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: ${COLORS.text.secondary};
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const CallToAction = styled.section`
  background: ${COLORS.primary};
  color: white;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  margin: 3rem 0;

  h2 {
    color: white;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: white;
  color: ${COLORS.primary};
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${SHADOWS.lg};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const AboutPage: React.FC = () => {
  const { data: shop } = useShop();

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Innovative 3D Shop
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Crafting premium 3D printed accessories for passionate gamers
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <SectionTitle>Our Story</SectionTitle>
        <p>
          Welcome to Innovative 3D Shop! I'm passionate about both retro gaming and 3D printing 
          technology. What started as a hobby project to create custom accessories for my own 
          gaming setup has evolved into a business dedicated to helping fellow gamers enhance 
          their gaming experience.
        </p>
        <p>
          Every product in our shop is designed with functionality and aesthetics in mind. 
          I believe that gaming accessories should not only be practical but also complement 
          the beauty of your gaming setup. From controller stands to console organizers, 
          each piece is carefully crafted to meet the needs of modern gamers.
        </p>
      </ContentSection>

      <ContentGrid>
        <FeatureCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="icon">🎮</span>
          <h3>Gamer-Designed</h3>
          <p>
            Every product is designed by a gamer, for gamers. I understand the needs 
            and preferences of the gaming community.
          </p>
        </FeatureCard>

        <FeatureCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="icon">🏆</span>
          <h3>Premium Quality</h3>
          <p>
            Using high-quality PLA plastic and precision 3D printing technology 
            to ensure durability and perfect fit.
          </p>
        </FeatureCard>

        <FeatureCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className="icon">💡</span>
          <h3>Custom Solutions</h3>
          <p>
            Need something specific? I offer custom designs and modifications 
            to meet your unique gaming setup requirements.
          </p>
        </FeatureCard>

        <FeatureCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <span className="icon">🚀</span>
          <h3>Fast Shipping</h3>
          <p>
            Quick processing times and reliable shipping to get your accessories 
            to you as soon as possible.
          </p>
        </FeatureCard>
      </ContentGrid>

      <ContentSection>
        <SectionTitle>Our Process</SectionTitle>
        <ProcessSection>
          <ProcessStep>
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Design & Prototype</h4>
              <p>
                Each product starts with careful design and prototyping to ensure 
                perfect functionality and fit for your gaming equipment.
              </p>
            </div>
          </ProcessStep>

          <ProcessStep>
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Precision 3D Printing</h4>
              <p>
                Using state-of-the-art 3D printers and high-quality materials 
                to create durable, long-lasting accessories.
              </p>
            </div>
          </ProcessStep>

          <ProcessStep>
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Quality Control</h4>
              <p>
                Every item is carefully inspected and tested before shipping 
                to ensure it meets our high standards.
              </p>
            </div>
          </ProcessStep>

          <ProcessStep>
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Secure Packaging</h4>
              <p>
                Items are carefully packaged to ensure they arrive in perfect 
                condition, ready to enhance your gaming setup.
              </p>
            </div>
          </ProcessStep>
        </ProcessSection>
      </ContentSection>

      {shop && (
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="stat-number">{shop.listing_active_count}+</span>
            <span className="stat-label">Products Available</span>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="stat-number">{shop.transaction_sold_count}+</span>
            <span className="stat-label">Happy Customers</span>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="stat-number">{shop.review_average?.toFixed(1) || '5.0'}</span>
            <span className="stat-label">Average Rating</span>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className="stat-number">{new Date().getFullYear() - 2020}+</span>
            <span className="stat-label">Years Experience</span>
          </StatCard>
        </StatsGrid>
      )}

      <CallToAction>
        <h2>Ready to Upgrade Your Gaming Setup?</h2>
        <p>
          Browse our collection of premium 3D printed gaming accessories 
          and find the perfect additions to your setup.
        </p>
        <CTAButton href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zM10 6a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z"/>
          </svg>
          Shop on Etsy
        </CTAButton>
      </CallToAction>
    </PageContainer>
  );
};

export default AboutPage;
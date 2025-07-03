/**
 * Component to handle Etsy API error states
 */

import styled from 'styled-components';
import { COLORS, GAMING_EMOJIS } from '../../utils/constants';

const ErrorContainer = styled.div`
  background: linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight});
  border: 1px solid ${COLORS.border};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.accent}, ${COLORS.secondary});
  }
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  color: ${COLORS.text.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: ${COLORS.text.secondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark});
  color: white;
  border-radius: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: ${COLORS.glow.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${COLORS.glow.primary}, 0 8px 25px rgba(0, 0, 0, 0.3);
    color: white;
  }
`;

const TechNote = styled.details`
  margin-top: 1.5rem;
  padding: 1rem;
  background: ${COLORS.backgroundLight};
  border-radius: 8px;
  border: 1px solid ${COLORS.border};
  
  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${COLORS.text.accent};
    margin-bottom: 0.5rem;
    
    &:hover {
      color: ${COLORS.primary};
    }
  }
  
  p {
    font-size: 0.9rem;
    color: ${COLORS.text.secondary};
    margin: 0.5rem 0 0 0;
  }
`;

interface ApiErrorMessageProps {
  type?: 'cors' | 'oauth' | 'network' | 'general';
  showTechnicalDetails?: boolean;
}

const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({ 
  type = 'oauth', 
  showTechnicalDetails = true 
}) => {
  const getErrorContent = () => {
    switch (type) {
      case 'cors':
        return {
          icon: '🔒',
          title: 'CORS Restriction',
          message: 'The Etsy API cannot be accessed directly from the browser due to CORS policy.',
        };
      case 'oauth':
        return {
          icon: '🔐',
          title: 'Authentication Required',
          message: 'Etsy API v3 requires OAuth 2.0 authentication which needs a backend server to implement securely.',
        };
      case 'network':
        return {
          icon: '🌐',
          title: 'Network Error',
          message: 'Unable to connect to Etsy API. Please check your internet connection.',
        };
      default:
        return {
          icon: '⚠️',
          title: 'API Unavailable',
          message: 'Live Etsy data is currently unavailable. Visit our Etsy shop directly for the latest products.',
        };
    }
  };

  const content = getErrorContent();

  return (
    <ErrorContainer className="gaming-card">
      <ErrorIcon>{content.icon}</ErrorIcon>
      <ErrorTitle>{content.title}</ErrorTitle>
      <ErrorMessage>{content.message}</ErrorMessage>
      
      <ActionButton 
        href="https://www.etsy.com/shop/Innovative3DShop" 
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{GAMING_EMOJIS.rocket}</span>
        Visit Etsy Shop
      </ActionButton>
      
      {showTechnicalDetails && (
        <TechNote>
          <summary>Technical Details</summary>
          <p>
            <strong>Why this happens:</strong> Etsy API v3 requires OAuth 2.0 authentication which cannot be 
            implemented securely in a client-side React application. A backend server is needed to handle 
            the OAuth flow and proxy API requests.
          </p>
          <p>
            <strong>Solution:</strong> To display live Etsy data, this application would need a backend 
            service (Node.js, Python, etc.) to authenticate with Etsy and serve the data to the frontend.
          </p>
        </TechNote>
      )}
    </ErrorContainer>
  );
};

export default ApiErrorMessage;
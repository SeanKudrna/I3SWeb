/**
 * Loading spinner component
 */

import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../utils/constants';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ fullScreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: ${props => props.fullScreen ? '60vh' : 'auto'};
`;

const Spinner = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  width: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '36px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small': return '24px';
      case 'large': return '48px';
      default: return '36px';
    }
  }};
  border: 3px solid ${COLORS.background};
  border-top: 3px solid ${COLORS.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${COLORS.text.secondary};
  font-size: 0.875rem;
`;

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  fullScreen = false,
  text = 'Loading...',
}) => {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <div>
        <Spinner size={size} role="status" aria-label="Loading" />
        {text && <LoadingText>{text}</LoadingText>}
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
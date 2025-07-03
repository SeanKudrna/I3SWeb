/**
 * Error message component
 */

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../utils/constants';

const ErrorContainer = styled(motion.div)`
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid ${COLORS.error};
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ErrorIcon = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: ${COLORS.error};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ErrorContent = styled.div`
  flex: 1;

  h3 {
    color: ${COLORS.error};
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${COLORS.text.primary};
    font-size: 0.875rem;
    margin: 0;
  }
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${COLORS.error};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${COLORS.error};
    opacity: 0.9;
  }
`;

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'An error occurred',
  message = 'Something went wrong. Please try again later.',
  onRetry,
}) => {
  return (
    <ErrorContainer
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ErrorIcon>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </ErrorIcon>
      <ErrorContent>
        <h3>{title}</h3>
        <p>{message}</p>
      </ErrorContent>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Retry
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;
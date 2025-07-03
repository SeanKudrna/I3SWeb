/**
 * OAuth callback handler page
 * Processes the OAuth callback from Etsy and completes the authentication flow
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const Message = styled.div<{ type?: 'error' | 'success' }>`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: ${props => props.type === 'error' ? '#f44336' : props.type === 'success' ? '#4caf50' : '#333'};
`;

const OAuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  const [message, setMessage] = useState('Processing authentication...');
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const auth = searchParams.get('auth');
      
      // Handle auth status from backend redirect
      if (auth) {
        if (auth === 'success') {
          setMessage('Authentication successful! Redirecting...');
          setError(false);
          setTimeout(() => navigate('/'), 2000);
        } else {
          const reason = searchParams.get('reason') || 'unknown';
          setMessage(`Authentication failed: ${reason}`);
          setError(true);
        }
        setProcessing(false);
        return;
      }

      // Handle OAuth callback with code
      if (code && state) {
        try {
          // Get stored OAuth parameters
          const storedState = sessionStorage.getItem('oauth_state');
          const codeVerifier = sessionStorage.getItem('oauth_code_verifier');

          if (state !== storedState) {
            throw new Error('State mismatch - possible CSRF attack');
          }

          if (!codeVerifier) {
            throw new Error('Code verifier not found');
          }

          // Redirect to backend callback with code_verifier
          const backendUrl = process.env.REACT_APP_BACKEND_URL || 
            (window.location.hostname === 'localhost' ? 'http://localhost:8080' : '');
          
          const callbackUrl = new URL(`${backendUrl}/api/auth/callback`);
          callbackUrl.searchParams.append('code', code);
          callbackUrl.searchParams.append('state', state);
          callbackUrl.searchParams.append('code_verifier', codeVerifier);

          // Clear stored OAuth parameters
          sessionStorage.removeItem('oauth_state');
          sessionStorage.removeItem('oauth_code_verifier');

          // Redirect to backend callback
          window.location.href = callbackUrl.toString();
        } catch (err) {
          console.error('OAuth callback error:', err);
          setMessage(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setError(true);
          setProcessing(false);
        }
      } else {
        setMessage('Invalid OAuth callback - missing parameters');
        setError(true);
        setProcessing(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <CallbackContainer>
      {processing ? (
        <>
          <LoadingSpinner />
          <Message>{message}</Message>
        </>
      ) : (
        <>
          <Message type={error ? 'error' : 'success'}>{message}</Message>
          {error && (
            <button onClick={() => navigate('/')}>
              Return to Home
            </button>
          )}
        </>
      )}
    </CallbackContainer>
  );
};

export default OAuthCallbackPage;
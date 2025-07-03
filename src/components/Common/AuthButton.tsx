import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { etsyApi } from '../../services/etsyApi';

const AuthContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 20px 0;
`;

const AuthButton = styled.button`
  background: #ff6f00;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #e65100;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const AuthStatus = styled.div<{ authenticated: boolean }>`
  color: ${props => props.authenticated ? '#4caf50' : '#f44336'};
  font-weight: 500;
  margin-bottom: 10px;
`;

const AuthDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
`;

interface AuthButtonProps {
  onAuthChange?: (authenticated: boolean) => void;
}

const AuthButtonComponent: React.FC<AuthButtonProps> = ({ onAuthChange }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isAuth = await etsyApi.checkAuthStatus();
      setAuthenticated(isAuth);
      onAuthChange?.(isAuth);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthenticated(false);
      onAuthChange?.(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticate = async () => {
    try {
      await etsyApi.authenticate();
    } catch (error) {
      console.error('Error authenticating:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <AuthContainer>
        <div>Checking authentication status...</div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthStatus authenticated={authenticated}>
        {authenticated ? '✓ Shop data available' : '⚠ Shop setup required'}
      </AuthStatus>
      
      {authenticated ? (
        <AuthDescription>
          The shop owner has authorized this app. All visitors can now see live product data from Etsy.
        </AuthDescription>
      ) : (
        <>
          <AuthDescription>
            <strong>One-time setup needed:</strong> The shop owner needs to authorize this app once so all visitors can see live Etsy products. This is a one-time setup that enables the website for everyone.
          </AuthDescription>
          <AuthButton onClick={handleAuthenticate}>
            Authorize Shop (Shop Owner Only)
          </AuthButton>
        </>
      )}
    </AuthContainer>
  );
};

export default AuthButtonComponent;
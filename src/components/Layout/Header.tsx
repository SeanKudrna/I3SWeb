/**
 * Modern retro gaming header component
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, TRANSITIONS, Z_INDEX } from '../../utils/constants';
import { useIsMobile } from '../../hooks/useMediaQuery';
import SearchBar from '../Common/SearchBar';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight});
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${COLORS.border};
  position: sticky;
  top: 0;
  z-index: ${Z_INDEX.dropdown};
  transition: ${TRANSITIONS.default};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent});
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 2rem;
  position: relative;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.text.primary};
  text-decoration: none;
  transition: ${TRANSITIONS.fast};
  z-index: ${Z_INDEX.modal + 2};

  &:hover {
    transform: scale(1.05);
    color: ${COLORS.primary};
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${COLORS.glow.primary};
    
    svg {
      width: 24px;
      height: 24px;
      color: white;
    }
  }
  
  .logo-text {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 320px;
    background: linear-gradient(135deg, ${COLORS.surface}, ${COLORS.surfaceLight});
    backdrop-filter: blur(20px);
    border-left: 1px solid ${COLORS.border};
    flex-direction: column;
    padding: 6rem 2rem 2rem;
    transform: translateX(${props => props.$isOpen ? '0' : '100%'});
    transition: ${TRANSITIONS.smooth};
    z-index: ${Z_INDEX.modal};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent});
    }
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? COLORS.primary : COLORS.text.secondary};
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  position: relative;
  transition: ${TRANSITIONS.fast};
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
    transition: width 0.3s ease;
    border-radius: 1px;
  }

  &:hover {
    color: ${COLORS.primary};
    transform: translateY(-1px);

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 1rem 0;
    width: 100%;
    text-align: left;
    
    &::after {
      bottom: 0;
      height: 1px;
    }
  }
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  width: 44px;
  height: 44px;
  position: relative;
  z-index: ${Z_INDEX.modal + 1};
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  transition: ${TRANSITIONS.fast};
  
  &:hover {
    background: ${COLORS.surfaceLight};
    border-color: ${COLORS.primary};
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-icon {
    width: 20px;
    height: 16px;
    position: relative;
    
    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${COLORS.text.primary};
      transition: ${TRANSITIONS.fast};
      border-radius: 1px;

      &:nth-child(1) {
        top: ${props => props.$isOpen ? '7px' : '0'};
        transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      }

      &:nth-child(2) {
        top: 7px;
        opacity: ${props => props.$isOpen ? '0' : '1'};
      }

      &:nth-child(3) {
        bottom: ${props => props.$isOpen ? '7px' : '0'};
        transform: ${props => props.$isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: ${Z_INDEX.modal - 1};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSearchContainer = styled.div`
  display: none;
  padding: 1rem 0;
  border-top: 1px solid ${COLORS.divider};

  @media (max-width: 768px) {
    display: block;
    margin-top: auto;
    width: 100%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const ShopButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${COLORS.accent}, ${COLORS.secondary});
  color: white;
  border-radius: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: ${TRANSITIONS.fast};
  box-shadow: ${COLORS.glow.accent};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${COLORS.glow.accent}, 0 8px 25px rgba(0, 0, 0, 0.3);
    color: white;
  }

  .shop-icon {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo to="/">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span className="logo-text">I3S</span>
          </Logo>

          {!isMobile && (
            <SearchContainer>
              <SearchBar onSearch={handleSearch} />
            </SearchContainer>
          )}

          <Nav $isOpen={isMenuOpen}>
            <NavLink to="/" onClick={closeMenu} $isActive={isActivePath('/')}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={closeMenu} $isActive={isActivePath('/products')}>
              Products
            </NavLink>
            <NavLink to="/about" onClick={closeMenu} $isActive={isActivePath('/about')}>
              About
            </NavLink>
            <NavLink to="/reviews" onClick={closeMenu} $isActive={isActivePath('/reviews')}>
              Reviews
            </NavLink>
            
            {isMobile && (
              <MobileSearchContainer>
                <SearchBar onSearch={handleSearch} />
              </MobileSearchContainer>
            )}
            
            <ActionButtons>
              <ShopButton 
                href="https://www.etsy.com/shop/Innovative3DShop" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="shop-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zM10 6a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z"/>
                </svg>
                Shop on Etsy
              </ShopButton>
            </ActionButtons>
          </Nav>

          <MenuButton 
            $isOpen={isMenuOpen}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="menu-icon">
              <span />
              <span />
              <span />
            </div>
          </MenuButton>
        </HeaderContent>
      </div>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
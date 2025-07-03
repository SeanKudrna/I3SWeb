/**
 * Main layout wrapper component
 */

import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 0;

  @media (min-width: 768px) {
    padding: 3rem 0;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <div className="container">
          {children}
        </div>
      </Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
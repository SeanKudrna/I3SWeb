/**
 * Search results page
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { EtsySearchFilters } from '../types/etsy';
import { useSearchListings } from '../hooks/useEtsyData';
import ProductGrid from '../components/Product/ProductGrid';
import ProductFilters from '../components/Product/ProductFilters';
import SearchBar from '../components/Common/SearchBar';
import { ITEMS_PER_PAGE } from '../utils/constants';

const PageContainer = styled.div`
  min-height: 60vh;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
`;

const SearchQuery = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  span {
    color: #2e7d32;
  }
`;

const SearchBarContainer = styled.div`
  max-width: 600px;
  margin-bottom: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const SuggestedSearches = styled.div`
  margin-top: 2rem;

  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #666;
  }
`;

const SuggestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SuggestionLink = styled.button`
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2e7d32;
    color: white;
    border-color: #2e7d32;
  }
`;

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [filters, setFilters] = useState<EtsySearchFilters>({
    sort_on: 'score',
    sort_order: 'desc',
    limit: ITEMS_PER_PAGE,
    offset: 0,
  });

  const { data: products, totalCount, loading, error, refetch } = useSearchListings(searchQuery, filters);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setSearchParams({ q: newQuery });
  };

  const handleFiltersChange = (newFilters: EtsySearchFilters) => {
    setFilters(newFilters);
  };

  const suggestedSearches = [
    'Nintendo Switch',
    'PlayStation 5',
    'Xbox Controller',
    'GameCube',
    'Retro Gaming',
    'Controller Stand',
    'Console Mount',
    'Gaming Organizer',
  ];

  return (
    <PageContainer>
      <SearchHeader>
        <SearchQuery>
          {searchQuery ? (
            <>Search results for: <span>"{searchQuery}"</span></>
          ) : (
            'Search our products'
          )}
        </SearchQuery>
      </SearchHeader>

      <SearchBarContainer>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search for gaming accessories..."
        />
      </SearchBarContainer>

      {searchQuery && (
        <>
          <ProductFilters
            totalCount={totalCount}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          {!loading && products.length === 0 && (
            <NoResults>
              <h2>No products found</h2>
              <p>
                We couldn't find any products matching "{searchQuery}".
                Try adjusting your search terms or browse our categories.
              </p>
              
              <SuggestedSearches>
                <h3>Try searching for:</h3>
                <SuggestionList>
                  {suggestedSearches.map((suggestion) => (
                    <SuggestionLink
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                    >
                      {suggestion}
                    </SuggestionLink>
                  ))}
                </SuggestionList>
              </SuggestedSearches>
            </NoResults>
          )}

          {(loading || products.length > 0) && (
            <ProductGrid
              products={products}
              loading={loading}
              error={error}
              onRetry={refetch}
            />
          )}
        </>
      )}

      {!searchQuery && (
        <NoResults>
          <h2>What are you looking for?</h2>
          <p>Enter a search term above to find the perfect gaming accessory.</p>
          
          <SuggestedSearches>
            <h3>Popular searches:</h3>
            <SuggestionList>
              {suggestedSearches.map((suggestion) => (
                <SuggestionLink
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                >
                  {suggestion}
                </SuggestionLink>
              ))}
            </SuggestionList>
          </SuggestedSearches>
        </NoResults>
      )}
    </PageContainer>
  );
};

export default SearchPage;
/**
 * Search bar component with autocomplete
 */

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS, TRANSITIONS } from '../../utils/constants';
import { useDebounce } from '../../hooks/useDebounce';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
  font-size: 1rem;
  background: ${COLORS.surface};
  transition: ${TRANSITIONS.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
  }

  &::placeholder {
    color: ${COLORS.text.secondary};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  color: ${COLORS.text.secondary};
  transition: ${TRANSITIONS.fast};

  &:hover {
    color: ${COLORS.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ClearButton = styled(SearchButton)`
  right: 2.5rem;
`;

const SuggestionsContainer = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
  box-shadow: ${SHADOWS.lg};
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

const Suggestion = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
  background: none;
  transition: ${TRANSITIONS.fast};
  cursor: pointer;

  &:hover {
    background: ${COLORS.background};
  }

  &:focus {
    outline: none;
    background: ${COLORS.background};
  }

  mark {
    background: ${COLORS.secondaryLight};
    color: inherit;
    font-weight: 600;
  }
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for 3D printed accessories...',
  suggestions = [],
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample suggestions for demo
  const defaultSuggestions = [
    'Nintendo Switch Pro Controller',
    'PlayStation 5 Controller Stand',
    'Xbox Series X Controller Grips',
    'Retro Console Display Stand',
    'GameCube Controller Holder',
    'Steam Deck Accessories',
  ];

  const filteredSuggestions = (suggestions.length ? suggestions : defaultSuggestions)
    .filter(suggestion => 
      suggestion.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
    .slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <SearchContainer ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          aria-label="Search products"
        />
        
        {query && (
          <ClearButton
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </ClearButton>
        )}
        
        <SearchButton type="submit" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </SearchButton>
      </form>

      <AnimatePresence>
        {showSuggestions && debouncedQuery && filteredSuggestions.length > 0 && (
          <SuggestionsContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <Suggestion
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {highlightMatch(suggestion, debouncedQuery)}
              </Suggestion>
            ))}
          </SuggestionsContainer>
        )}
      </AnimatePresence>
    </SearchContainer>
  );
};

export default SearchBar;
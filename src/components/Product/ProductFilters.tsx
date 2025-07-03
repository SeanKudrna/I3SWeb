/**
 * Product filters component for sorting and filtering products
 */

import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS, TRANSITIONS, SORT_OPTIONS } from '../../utils/constants';
import { EtsySearchFilters } from '../../types/etsy';

const FiltersContainer = styled.div`
  margin-bottom: 2rem;
`;

const FiltersHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterCount = styled.p`
  color: ${COLORS.text.secondary};
  font-size: 0.875rem;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? COLORS.primary : COLORS.border};
  background: ${props => props.$active ? COLORS.primary : COLORS.surface};
  color: ${props => props.$active ? 'white' : COLORS.text.primary};
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.primary};
    background: ${props => props.$active ? COLORS.primaryDark : COLORS.background};
  }

  svg {
    width: 16px;
    height: 16px;
    margin-left: 0.25rem;
    vertical-align: middle;
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid ${COLORS.border};
  border-radius: 4px;
  background: ${COLORS.surface};
  font-size: 0.875rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  transition: ${TRANSITIONS.fast};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

const FiltersPanel = styled(motion.div)`
  background: ${COLORS.surface};
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${SHADOWS.sm};
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const PriceRange = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: ${COLORS.primary};
    }
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  &:hover {
    color: ${COLORS.primary};
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.button<{ $selected?: boolean }>`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${props => props.$selected ? COLORS.primary : COLORS.border};
  background: ${props => props.$selected ? COLORS.primaryLight : COLORS.surface};
  color: ${props => props.$selected ? 'white' : COLORS.text.primary};
  border-radius: 16px;
  font-size: 0.75rem;
  transition: ${TRANSITIONS.fast};

  &:hover {
    border-color: ${COLORS.primary};
    background: ${props => props.$selected ? COLORS.primary : COLORS.background};
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  transition: ${TRANSITIONS.fast};

  &:hover {
    background: ${COLORS.primaryDark};
  }
`;

const ClearButton = styled.button`
  color: ${COLORS.text.secondary};
  font-size: 0.875rem;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  transition: ${TRANSITIONS.fast};

  &:hover {
    color: ${COLORS.primary};
  }
`;

interface ProductFiltersProps {
  totalCount: number;
  filters: EtsySearchFilters;
  onFiltersChange: (filters: EtsySearchFilters) => void;
  tags?: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  totalCount,
  filters,
  onFiltersChange,
  tags = ['controller', 'stand', 'holder', 'grip', 'mount', 'organizer', 'display'],
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSortChange = (value: string) => {
    const [sort_on, sort_order] = value.split('-') as [any, any];
    onFiltersChange({ ...filters, sort_on, sort_order });
  };

  const handlePriceChange = (field: 'min_price' | 'max_price', value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    setLocalFilters({ ...localFilters, [field]: numValue });
  };

  const handleTagToggle = (tag: string) => {
    const currentTags = localFilters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    setLocalFilters({ ...localFilters, tags: newTags });
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const clearedFilters: EtsySearchFilters = {
      sort_on: 'created',
      sort_order: 'desc',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.min_price || filters.max_price || 
    (filters.tags && filters.tags.length > 0);

  const currentSort = `${filters.sort_on}-${filters.sort_order}`;

  return (
    <FiltersContainer>
      <FiltersHeader>
        <FilterCount>{totalCount} products found</FilterCount>
        
        <FilterButtons>
          <FilterButton
            $active={showFilters}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
            {hasActiveFilters && ` (${
              (filters.tags?.length || 0) + 
              (filters.min_price ? 1 : 0) + 
              (filters.max_price ? 1 : 0)
            })`}
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d={showFilters 
                ? "M7 10l5 5 5-5z" 
                : "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
              }/>
            </svg>
          </FilterButton>

          <SortSelect 
            value={currentSort} 
            onChange={(e) => handleSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SortSelect>

          {hasActiveFilters && (
            <ClearButton onClick={clearFilters}>
              Clear all
            </ClearButton>
          )}
        </FilterButtons>
      </FiltersHeader>

      <AnimatePresence>
        {showFilters && (
          <FiltersPanel
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FilterSection>
              <h4>Price Range</h4>
              <PriceRange>
                <input
                  type="number"
                  placeholder="Min"
                  value={localFilters.min_price || ''}
                  onChange={(e) => handlePriceChange('min_price', e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localFilters.max_price || ''}
                  onChange={(e) => handlePriceChange('max_price', e.target.value)}
                />
              </PriceRange>
            </FilterSection>

            <FilterSection>
              <h4>Product Tags</h4>
              <TagList>
                {tags.map(tag => (
                  <Tag
                    key={tag}
                    $selected={localFilters.tags?.includes(tag)}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </TagList>
            </FilterSection>

            <FilterSection>
              <h4>Options</h4>
              <CheckboxGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={localFilters.custom_only || false}
                    onChange={(e) => setLocalFilters({
                      ...localFilters,
                      custom_only: e.target.checked
                    })}
                  />
                  <span>Custom orders only</span>
                </Checkbox>
              </CheckboxGroup>
            </FilterSection>

            <ApplyButton onClick={applyFilters}>
              Apply Filters
            </ApplyButton>
          </FiltersPanel>
        )}
      </AnimatePresence>
    </FiltersContainer>
  );
};

export default ProductFilters;
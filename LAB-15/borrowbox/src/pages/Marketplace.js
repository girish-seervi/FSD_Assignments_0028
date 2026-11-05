import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Store, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { itemApi, userApi } from '../services/api';
import useAuth from '../hooks/useAuth';

const Marketplace = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Extract filter state from URL search params
  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'All',
    condition: searchParams.get('condition') || 'All',
    availability: searchParams.get('availability') || 'All',
    costType: searchParams.get('costType') || 'All',
    sort: searchParams.get('sort') || 'recently-added',
    page: parseInt(searchParams.get('page'), 10) || 1
  };

  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== 'All' && v !== '' && !(k === 'page' && v === 1)) {
        params.set(k, v);
      }
    });
    setSearchParams(params);
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await itemApi.getAll({
        search: filters.search,
        category: filters.category,
        condition: filters.condition,
        availability: filters.availability,
        costType: filters.costType,
        sort: filters.sort,
        page: filters.page,
        limit: 9
      });

      if (res.success) {
        setItems(res.data || []);
        setTotalPages(res.totalPages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch items from marketplace.');
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.category,
    filters.condition,
    filters.availability,
    filters.costType,
    filters.sort,
    filters.page
  ]);

  // Load favorites if user is authenticated
  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await userApi.getFavorites();
      if (res.success) {
        setFavoriteIds(res.favoriteIds || []);
      }
    } catch (_) {}
  }, [isAuthenticated]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleToggleFavorite = async (itemId) => {
    if (!isAuthenticated) {
      alert('Please sign in to save items to your favorites list.');
      return;
    }
    const isFav = favoriteIds.includes(itemId);
    try {
      if (isFav) {
        await userApi.removeFavorite(itemId);
        setFavoriteIds((prev) => prev.filter((id) => id !== itemId));
      } else {
        await userApi.addFavorite(itemId);
        setFavoriteIds((prev) => [...prev, itemId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      updateFilters({ ...filters, page: newPage });
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="marketplace-layout">
      <div className="container">
        {/* Header */}
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Store size={28} color="var(--color-accent)" />
              Explore Marketplace
            </h1>
            <p className="page-subtitle">
              Browse {totalCount} items available to borrow from university students
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: 440 }}>
            <SearchBar
              value={filters.search}
              onChange={(val) => updateFilters({ ...filters, search: val, page: 1 })}
              onClear={() => updateFilters({ ...filters, search: '', page: 1 })}
              placeholder="Search items, categories, or keywords..."
            />
          </div>
        </div>

        {/* Filters */}
        <FilterPanel
          filters={filters}
          onChange={(newF) => updateFilters({ ...newF, page: 1 })}
          onReset={handleResetFilters}
        />

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Items Grid */}
        {loading ? (
          <LoadingSpinner label="Fetching campus listings..." />
        ) : items.length === 0 ? (
          <EmptyState
            title="No matching campus items"
            description="We couldn't find any listings matching your search criteria. Try adjusting your filters or search term."
            actionText="Clear All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <>
            <div className="items-grid">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isFavorited={favoriteIds.includes(item.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`page-btn ${filters.page === p ? 'active' : ''}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  className="page-btn"
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { SkeletonCard } from '../components/SkeletonLoader';
import { Search, Sparkles, EggOff } from 'lucide-react';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const activeCategoryParam = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'eggless' | 'featured'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          categoryService.getCategories(),
          productService.getProducts({ all: 'false' }),
        ]);

        if (catRes.success) setCategories(catRes.data);
        if (prodRes.success) setProducts(prodRes.data);
      } catch (err) {
        console.error('Failed to load menu data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (slugOrId) => {
    if (slugOrId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slugOrId });
    }
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (activeCategoryParam !== 'all') {
        const catObj = item.category;
        const matchesCat =
          catObj?._id === activeCategoryParam ||
          catObj?.slug === activeCategoryParam ||
          catObj?.name?.toLowerCase() === activeCategoryParam.toLowerCase();
        if (!matchesCat) return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'eggless' && !item.isEggless) return false;
      if (dietFilter === 'featured' && !item.isFeatured) return false;

      return true;
    });
  }, [products, activeCategoryParam, searchQuery, dietFilter]);

  // Group products by category when viewing "All"
  const groupedCategories = useMemo(() => {
    if (activeCategoryParam !== 'all') return [];

    return categories.map((cat) => {
      const catProducts = filteredProducts.filter(
        (p) => p.category?._id === cat._id || p.category?.slug === cat.slug
      );
      return {
        ...cat,
        products: catProducts,
      };
    }).filter((g) => g.products.length > 0);
  }, [categories, filteredProducts, activeCategoryParam]);

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-[#FCFAF7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="font-sans text-[#8C735A] font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
            ARTISANAL BAKERY
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3A2923] tracking-tight mb-2 sm:mb-3">
            Our Menu
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#6F5746] leading-relaxed">
            Handcrafted delights, made fresh every morning.
          </p>
        </div>

        {/* Search & Dietary Filter Controls */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm border border-[#3A2923]/10 mb-6 sm:mb-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Search input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C735A]" />
            <input
              type="text"
              placeholder="Search cakes, biscuits, breads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#F7F4EE] border border-[#3A2923]/10 text-xs sm:text-sm text-[#3A2923] placeholder:text-[#6F5746]/60 focus:outline-none focus:ring-2 focus:ring-[#8C735A]"
            />
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none no-scrollbar justify-start md:justify-center">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                dietFilter === 'all'
                  ? 'bg-[#3A2923] text-[#FCFAF7] shadow-xs'
                  : 'bg-[#F7F4EE] text-[#6F5746] hover:bg-[#E8DED1]'
              }`}
            >
              All Items
            </button>

            <button
              onClick={() => setDietFilter('veg')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                dietFilter === 'veg'
                  ? 'bg-green-800 text-white shadow-xs'
                  : 'bg-[#F7F4EE] text-green-900 hover:bg-green-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-600" />
              Veg Only
            </button>

            <button
              onClick={() => setDietFilter('eggless')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                dietFilter === 'eggless'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-[#F7F4EE] text-amber-900 hover:bg-amber-50'
              }`}
            >
              <EggOff className="w-3.5 h-3.5" />
              Eggless
            </button>

            <button
              onClick={() => setDietFilter('featured')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                dietFilter === 'featured'
                  ? 'bg-[#8C735A] text-white shadow-xs'
                  : 'bg-[#F7F4EE] text-[#3A2923] hover:bg-[#E8DED1]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C735A]" />
              Featured
            </button>
          </div>
        </div>

        {/* Horizontal Category Navigation Bar */}
        <div className="relative mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                activeCategoryParam === 'all'
                  ? 'bg-[#3A2923] text-[#FCFAF7] shadow-sm'
                  : 'bg-white text-[#6F5746] hover:bg-[#F7F4EE] border border-[#3A2923]/10'
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => {
              const isActive =
                activeCategoryParam === cat.slug ||
                activeCategoryParam === cat._id;
              return (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug || cat._id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-[#3A2923] text-[#FCFAF7] shadow-sm'
                      : 'bg-white text-[#6F5746] hover:bg-[#F7F4EE] border border-[#3A2923]/10'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl p-8 border border-[#3A2923]/10 shadow-sm max-w-lg mx-auto">
            <h3 className="font-display text-xl font-bold text-[#3A2923] mb-2">No matching treats found</h3>
            <p className="font-sans text-xs sm:text-sm text-[#6F5746] mb-6">
              Try adjusting your dietary filter or search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietFilter('all');
                handleCategoryChange('all');
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#3A2923] text-white text-xs font-bold uppercase tracking-wider"
            >
              <span>RESET FILTERS</span>
            </button>
          </div>
        ) : activeCategoryParam === 'all' && searchQuery === '' && dietFilter === 'all' ? (
          /* Grouped by Categories view */
          <div className="space-y-16">
            {groupedCategories.map((group) => (
              <section key={group._id} className="scroll-mt-36" id={group.slug}>
                {/* Category Header */}
                <div className="border-b border-[#3A2923]/10 pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#3A2923] uppercase tracking-wide">
                      {group.name}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-[#6F5746] mt-1">
                      {group.description}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#8C735A] bg-[#F7F4EE] px-3 py-1 rounded-full whitespace-nowrap">
                    {group.products.length} {group.products.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {group.products.map((prod) => (
                    <ProductCard key={prod._id} product={prod} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Filtered Flat Grid */
          <div>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8C735A] uppercase tracking-wider">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

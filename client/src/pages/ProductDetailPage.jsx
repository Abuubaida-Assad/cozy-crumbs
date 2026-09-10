import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { LoadingSpinner } from '../components/SkeletonLoader';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductById(id);
        if (res.success && res.data) {
          setProduct(res.data);
          setRelated(res.data.relatedProducts || []);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner text="Loading handcrafted treat..." />;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center pt-36">
        <h2 className="font-display text-2xl font-bold text-[#3A2923] mb-3">Product Not Found</h2>
        <p className="text-xs sm:text-sm text-[#6F5746] mb-6">The requested bakery item may have been updated or moved.</p>
        <Link to="/menu" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#3A2923] text-white text-xs font-bold uppercase tracking-wider">
          <span>Back to Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3A2923] hover:text-[#8C735A] transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Main Product Layout */}
        <div className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-sm border border-[#3A2923]/10 overflow-hidden mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center p-5 sm:p-8 lg:p-12">
            
            {/* Image Column */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8DED1] shadow-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-2">
                {product.isVeg ? (
                  <span className="badge-veg bg-white/95 p-1 shadow-xs" title="Vegetarian">
                    <span className="badge-veg-dot" />
                  </span>
                ) : (
                  <span className="badge-nonveg bg-white/95 p-1 shadow-xs" title="Non-Vegetarian">
                    <span className="badge-nonveg-dot" />
                  </span>
                )}
                {product.isEggless && (
                  <span className="bg-amber-100 text-amber-900 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    100% Eggless
                  </span>
                )}
              </div>
            </div>

            {/* Product Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#8C735A] mb-1.5 sm:mb-2 block">
                  {typeof product.category === 'object' ? product.category.name : 'Artisanal Bakery'}
                </span>

                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#3A2923] mb-2 sm:mb-3 leading-tight">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <span className="font-sans text-2xl sm:text-3xl font-black text-[#3A2923]">
                    ₹{product.price}
                  </span>
                  {product.weight && (
                    <span className="text-xs font-semibold text-[#6F5746] bg-[#E8DED1]/60 px-2.5 sm:px-3 py-1 rounded-lg">
                      {product.weight}
                    </span>
                  )}
                  <span className="text-[11px] sm:text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 sm:px-3 py-1 rounded-lg">
                    Freshly Available
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#6F5746] leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Nutrition Box */}
                {product.nutritionalInfo && (
                  <div className="grid grid-cols-3 gap-3 bg-[#F7F4EE] rounded-2xl p-4 border border-[#3A2923]/10 mb-6 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#8C735A] block">Calories</span>
                      <span className="text-xs sm:text-sm font-bold text-[#3A2923]">
                        {product.nutritionalInfo.calories || '320 kcal'}
                      </span>
                    </div>
                    <div className="border-x border-[#3A2923]/10">
                      <span className="text-[10px] uppercase font-semibold text-[#8C735A] block">Servings</span>
                      <span className="text-xs sm:text-sm font-bold text-[#3A2923]">
                        {product.nutritionalInfo.servings || '4-6 Slices'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#8C735A] block">Shelf Life</span>
                      <span className="text-xs font-bold text-[#3A2923]">
                        {product.nutritionalInfo.shelfLife || '3 Days'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3A2923] block mb-2">
                      Key Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium bg-white border border-[#3A2923]/10 px-3 py-1 rounded-full text-[#6F5746]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Area: Inquire / Contact */}
              <div className="pt-6 border-t border-[#3A2923]/10 space-y-3">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#3A2923] hover:bg-[#24130D] text-[#FCFAF7] text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-[#B09A7C]" />
                  <span>INQUIRE / CUSTOM ORDER</span>
                </Link>
                <p className="text-xs text-center text-[#8C735A]">
                  For celebration inquiries or custom baking requests, contact our Cozy Crumbs team.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[#3A2923] mb-6">
              You May Also Savor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

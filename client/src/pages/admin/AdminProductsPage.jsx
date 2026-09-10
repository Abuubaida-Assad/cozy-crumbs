import React, { useState, useEffect, useMemo } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { ImageUploader } from '../../components/ImageUploader';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { LoadingSpinner } from '../../components/SkeletonLoader';
import { useToast } from '../../context/ToastContext';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  X,
  Cake,
  Filter,
  Check,
} from 'lucide-react';

export const AdminProductsPage = () => {
  const { success, error: toastError } = useToast();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation State
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    category: '',
    description: '',
    price: '',
    weight: '500g',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    isEggless: true,
    isFeatured: false,
    isAvailable: true,
    displayOrder: 0,
    ingredients: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  const loadData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts({ all: 'true' }),
        categoryService.getCategories(true),
      ]);
      if (prodRes.success) setProducts(prodRes.data || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err) {
      console.error('Failed to load products/categories:', err);
      toastError('Failed to retrieve product data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      ...initialFormState,
      category: categories.length > 0 ? categories[0]._id : '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentId(product._id);
    setFormData({
      name: product.name,
      category: typeof product.category === 'object' ? product.category._id : product.category,
      description: product.description,
      price: product.price,
      weight: product.weight || '',
      image: product.image,
      isVeg: product.isVeg,
      isEggless: product.isEggless,
      isFeatured: product.isFeatured,
      isAvailable: product.isAvailable,
      displayOrder: product.displayOrder || 0,
      ingredients: Array.isArray(product.ingredients) ? product.ingredients.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.image) {
      toastError('Please fill out all required fields');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing) {
        const res = await productService.updateProduct(currentId, formData);
        if (res.success) {
          success(`Product "${formData.name}" updated successfully!`);
          setIsModalOpen(false);
          loadData();
        }
      } else {
        const res = await productService.createProduct(formData);
        if (res.success) {
          success(`Product "${formData.name}" created successfully!`);
          setIsModalOpen(false);
          loadData();
        }
      }
    } catch (err) {
      console.error('Product save error:', err);
      toastError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await productService.deleteProduct(deleteId);
      if (res.success) {
        success('Product deleted successfully');
        setDeleteId(null);
        loadData();
      }
    } catch (err) {
      console.error('Product delete error:', err);
      toastError(err.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      const res = await productService.toggleAvailability(id);
      if (res.success) {
        success(res.message);
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isAvailable: res.isAvailable } : p))
        );
      }
    } catch (err) {
      toastError('Failed to toggle availability');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const res = await productService.toggleFeatured(id);
      if (res.success) {
        success(res.message);
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isFeatured: res.isFeatured } : p))
        );
      }
    } catch (err) {
      toastError('Failed to toggle featured state');
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all') {
        const catId = typeof p.category === 'object' ? p.category?._id : p.category;
        if (catId !== selectedCategory) return false;
      }

      // Availability filter
      if (filterAvailability === 'available' && !p.isAvailable) return false;
      if (filterAvailability === 'hidden' && p.isAvailable) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      }

      return true;
    });
  }, [products, selectedCategory, filterAvailability, searchQuery]);

  if (loading) {
    return <LoadingSpinner text="Loading product inventory..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Product Management
          </h1>
          <p className="text-xs text-slate-500">
            Add, update, or remove cakes, breads, pastries, and snacks in real-time.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 w-full md:w-auto">
          {/* Category Dropdown Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Dropdown Filter */}
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available Only</option>
            <option value="hidden">Hidden / Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Image & Product</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Price</th>
                <th className="py-3.5 px-4 font-bold">Dietary</th>
                <th className="py-3.5 px-4 font-bold">Featured</th>
                <th className="py-3.5 px-4 font-bold">Availability</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No products found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Image & Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block max-w-[220px] truncate">
                            {prod.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            {prod.weight || '500g'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {typeof prod.category === 'object' ? prod.category?.name : 'General'}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {prod.price > 0 ? `₹${prod.price}` : (
                        <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">
                          In Store
                        </span>
                      )}
                    </td>

                    {/* Dietary Badges */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        {prod.isVeg ? (
                          <span className="w-4 h-4 border border-green-600 rounded-[2px] flex items-center justify-center p-[1px]" title="Vegetarian">
                            <span className="w-2 h-2 rounded-full bg-green-600" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 border border-red-600 rounded-[2px] flex items-center justify-center p-[1px]" title="Non-Vegetarian">
                            <span className="w-2 h-2 rounded-full bg-red-600" />
                          </span>
                        )}
                        {prod.isEggless && (
                          <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                            Eggless
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleFeatured(prod._id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          prod.isFeatured
                            ? 'text-purple-600 bg-purple-50 hover:bg-purple-100'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={prod.isFeatured ? 'Featured on homepage' : 'Not featured'}
                      >
                        <Star className={`w-4 h-4 ${prod.isFeatured ? 'fill-purple-600' : ''}`} />
                      </button>
                    </td>

                    {/* Availability Toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleAvailability(prod._id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all ${
                          prod.isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {prod.isAvailable ? (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(prod._id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 z-10 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {isEditing ? 'Edit Bakery Product' : 'Add New Bakery Product'}
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in product details, pricing, and category.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Belgian Chocolate Fudge Cake"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-input"
                  >
                    <option value="">Select a Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Price in ₹ (INR) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 549"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="admin-label">Weight / Serving Size</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g. 500g / 1 pc / 6 inch"
                    className="admin-input"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Rich dark cocoa sponge layered with silky ganache..."
                  className="admin-input"
                />
              </div>

              {/* Reusable Image Uploader */}
              <ImageUploader
                value={formData.image}
                onChange={(img) => setFormData({ ...formData, image: img })}
                label="Product Image (URL, Preset, or Upload) *"
              />

              <div>
                <label className="admin-label">Key Ingredients (Comma Separated)</label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  placeholder="e.g. Dark Chocolate, Fresh Cream, Vanilla, Butter"
                  className="admin-input"
                />
              </div>

              {/* Checkboxes & Flags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isEggless}
                    onChange={(e) => setFormData({ ...formData, isEggless: e.target.checked })}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <span>Eggless</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded text-accent focus:ring-accent"
                  />
                  <span>Available</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider shadow-md disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Bakery Product"
        message="Are you sure you want to delete this product? It will immediately be removed from the public menu catalog."
        confirmText="Yes, Delete Product"
        isLoading={isDeleting}
        onConfirm={handleDeleteProduct}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

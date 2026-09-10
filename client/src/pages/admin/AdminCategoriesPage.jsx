import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import { ImageUploader } from '../../components/ImageUploader';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { LoadingSpinner } from '../../components/SkeletonLoader';
import { useToast } from '../../context/ToastContext';
import { getCategoryIcon } from '../../components/CollectionSection';
import {
  Plus,
  FolderTree,
  Edit2,
  Trash2,
  X,
  Layers,
  AlertTriangle,
  Eye,
  EyeOff,
} from 'lucide-react';

const CATEGORY_ICONS = [
  'Cake',
  'Flame',
  'Pizza',
  'IceCream',
  'Cookie',
  'Croissant',
  'Donut',
  'Sparkles',
  'Citrus',
  'CupSoda',
  'UtensilsCrossed',
  'Coffee',
];

export const AdminCategoriesPage = () => {
  const { success, error: toastError } = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    icon: 'Cake',
    displayOrder: 0,
    isActive: true,
  };
  const [formData, setFormData] = useState(initialFormState);

  const loadCategories = async () => {
    try {
      const res = await categoryService.getCategories(true);
      if (res.success) {
        setCategories(res.data || []);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
      toastError('Failed to retrieve categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      ...initialFormState,
      displayOrder: categories.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setIsEditing(true);
    setCurrentId(cat._id);
    setFormData({
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
      icon: cat.icon || 'Cake',
      displayOrder: cat.displayOrder || 0,
      isActive: cat.isActive !== undefined ? cat.isActive : true,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toastError('Please provide category name');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing) {
        const res = await categoryService.updateCategory(currentId, formData);
        if (res.success) {
          success(`Category "${formData.name}" updated successfully!`);
          setIsModalOpen(false);
          loadCategories();
        }
      } else {
        const res = await categoryService.createCategory(formData);
        if (res.success) {
          success(`Category "${formData.name}" created successfully!`);
          setIsModalOpen(false);
          loadCategories();
        }
      }
    } catch (err) {
      console.error('Category save error:', err);
      toastError(err.response?.data?.message || 'Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteTarget) return;

    if (deleteTarget.productCount > 0) {
      toastError(`This category contains ${deleteTarget.productCount} products. Move or delete those products before deleting the category.`);
      setDeleteTarget(null);
      return;
    }

    setIsDeleting(true);
    try {
      const res = await categoryService.deleteCategory(deleteTarget._id);
      if (res.success) {
        success('Category deleted successfully');
        setDeleteTarget(null);
        loadCategories();
      }
    } catch (err) {
      console.error('Category delete error:', err);
      toastError(err.response?.data?.message || 'Failed to delete category');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (cat) => {
    try {
      const res = await categoryService.updateCategory(cat._id, {
        isActive: !cat.isActive,
      });
      if (res.success) {
        success(`Category is now ${!cat.isActive ? 'active' : 'inactive'}`);
        setCategories((prev) =>
          prev.map((c) => (c._id === cat._id ? { ...c, isActive: !c.isActive } : c))
        );
      }
    } catch (err) {
      toastError('Failed to update category status');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading bakery categories..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Category Management
          </h1>
          <p className="text-xs text-slate-500">
            Organize bakery sections, display order, and customer menu filters.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Icon & Slug</th>
                <th className="py-3.5 px-4 font-bold">Products</th>
                <th className="py-3.5 px-4 font-bold">Display Order</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => {
                const IconComponent = getCategoryIcon(cat.icon);
                return (
                  <tr key={cat._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Category Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cat.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'}
                          alt={cat.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">
                            {cat.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block max-w-xs truncate">
                            {cat.description || 'No description'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Icon & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-slate-500 text-[11px]">
                          /{cat.slug || cat.name.toLowerCase()}
                        </span>
                      </div>
                    </td>

                    {/* Product Count */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        {cat.productCount || 0} products
                      </span>
                    </td>

                    {/* Display Order */}
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      #{cat.displayOrder || 0}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(cat)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          cat.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {cat.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          title="Edit category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cat)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 z-10 my-auto max-h-[90dvh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white">
                <FolderTree className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {isEditing ? 'Edit Category' : 'Create Bakery Category'}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure category name, icon, and display sequence.
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="admin-label">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Pastries & Tarts"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Short Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Sweet little luxuries made fresh daily"
                  className="admin-input"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="admin-label">Category Icon</label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {CATEGORY_ICONS.map((iconName) => {
                    const IconComp = getCategoryIcon(iconName);
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: iconName })}
                        className={`p-2.5 rounded-lg flex flex-col items-center justify-center transition-all ${
                          formData.icon === iconName
                            ? 'bg-accent text-white shadow-sm ring-2 ring-accent'
                            : 'bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                        title={iconName}
                      >
                        <IconComp className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Input */}
              <ImageUploader
                value={formData.image}
                onChange={(img) => setFormData({ ...formData, image: img })}
                label="Category Banner Image"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded text-accent focus:ring-accent"
                    />
                    <span>Active in Menu</span>
                  </label>
                </div>
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
                  {isSaving ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title={`Delete "${deleteTarget?.name}" Category`}
        message={
          deleteTarget?.productCount > 0
            ? `⚠️ Cannot delete: This category currently contains ${deleteTarget.productCount} products. Move or delete those products before deleting the category.`
            : `Are you sure you want to delete "${deleteTarget?.name}"? It will immediately be removed from the store navigation.`
        }
        confirmText={deleteTarget?.productCount > 0 ? 'Understood' : 'Yes, Delete Category'}
        cancelText="Cancel"
        isDestructive={deleteTarget?.productCount === 0}
        isLoading={isDeleting}
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

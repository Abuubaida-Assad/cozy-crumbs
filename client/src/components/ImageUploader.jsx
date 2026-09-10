import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, Sparkles } from 'lucide-react';

const BAKERY_IMAGE_PRESETS = [
  {
    name: 'Signature Chocolate Cake',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Red Velvet Cake',
    url: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Pineapple Cake',
    url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Belgian Chocolate Brownie',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Artisan Chicken / Veg Puff',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Gourmet Sourdough Bread',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Glazed Ring Donut',
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Osmania Butter Biscuits',
    url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
  },
];

export const ImageUploader = ({ value, onChange, label = 'Product Image' }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [previewError, setPreviewError] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="admin-label">{label}</label>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-cocoa/10 pb-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'url'
              ? 'bg-cocoa text-white'
              : 'text-cocoa/70 hover:bg-cream-beige'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Image URL
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'presets'
              ? 'bg-cocoa text-white'
              : 'text-cocoa/70 hover:bg-cream-beige'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Bakery Presets
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('file')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'file'
              ? 'bg-cocoa text-white'
              : 'text-cocoa/70 hover:bg-cream-beige'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload File
        </button>
      </div>

      {/* URL Input */}
      {activeTab === 'url' && (
        <div>
          <input
            type="url"
            value={value || ''}
            onChange={(e) => {
              setPreviewError(false);
              onChange(e.target.value);
            }}
            placeholder="https://images.unsplash.com/..."
            className="admin-input text-xs"
          />
          <p className="text-[11px] text-cocoa-light mt-1">
            Provide a direct image URL (e.g. from Unsplash or image host).
          </p>
        </div>
      )}

      {/* Bakery Presets */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1 bg-cream-beige/40 rounded-xl border border-cocoa/10">
          {BAKERY_IMAGE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => {
                setPreviewError(false);
                onChange(preset.url);
              }}
              className={`group relative rounded-xl overflow-hidden aspect-video border transition-all ${
                value === preset.url
                  ? 'border-accent ring-2 ring-accent'
                  : 'border-cocoa/10 hover:border-cocoa/30'
              }`}
            >
              <img
                src={preset.url}
                alt={preset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-cocoa/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1 text-center">
                <span className="text-[10px] text-white font-bold leading-tight">{preset.name}</span>
              </div>
              {value === preset.url && (
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* File Upload Input */}
      {activeTab === 'file' && (
        <div className="border-2 border-dashed border-cocoa/20 rounded-2xl p-4 text-center hover:bg-cream-pure transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-file-input"
          />
          <label htmlFor="image-file-input" className="cursor-pointer flex flex-col items-center gap-2">
            <Upload className="w-6 h-6 text-accent" />
            <span className="text-xs font-semibold text-cocoa">Click to upload from device</span>
            <span className="text-[10px] text-cocoa-light">PNG, JPG, WEBP up to 5MB</span>
          </label>
        </div>
      )}

      {/* Live Preview Box */}
      {value && (
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-cocoa/10">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream-beige flex-shrink-0 border border-cocoa/5">
            {!previewError ? (
              <img
                src={value}
                alt="Image Preview"
                onError={() => setPreviewError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-red-500 text-[10px]">
                Invalid image
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md inline-block mb-1">
              Preview Ready
            </span>
            <p className="text-xs text-cocoa truncate font-mono">{value}</p>
          </div>
        </div>
      )}
    </div>
  );
};

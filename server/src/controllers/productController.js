import { Product } from '../models/Product.js';
import { Category } from '../models/Category.js';

// @desc    Get all products with filters, search, sorting
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      search,
      isVeg,
      isEggless,
      isFeatured,
      isAvailable,
      all,
      sort = 'displayOrder',
      page = 1,
      limit = 100,
    } = req.query;

    const query = {};

    // Availability filter (default true for customers, admin can pass all=true or specific filter)
    if (all !== 'true') {
      if (isAvailable !== undefined) {
        query.isAvailable = isAvailable === 'true';
      } else {
        query.isAvailable = true;
      }
    }

    // Category filter (support category ObjectId or slug)
    if (category) {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const foundCategory = await Category.findOne({
          $or: [{ slug: category.toLowerCase() }, { name: { $regex: new RegExp(`^${category}$`, 'i') } }],
        });
        if (foundCategory) {
          query.category = foundCategory._id;
        } else {
          return res.json({ success: true, count: 0, total: 0, data: [] });
        }
      }
    }

    // Dietary filters
    if (isVeg !== undefined) query.isVeg = isVeg === 'true';
    if (isEggless !== undefined) query.isEggless = isEggless === 'true';
    if (isFeatured !== undefined) query.isFeatured = isFeatured === 'true';

    // Search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sorting
    let sortOption = { displayOrder: 1, createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    else if (sort === 'price-high') sortOption = { price: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else if (sort === 'name') sortOption = { name: 1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate('category', 'name slug icon')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isAvailable: true })
      .populate('category', 'name slug icon')
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(8);

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:idOrSlug
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let product;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(idOrSlug).populate('category', 'name slug icon');
    } else {
      product = await Product.findOne({ slug: idOrSlug }).populate('category', 'name slug icon');
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products from same category
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      isAvailable: true,
    })
      .populate('category', 'name slug')
      .limit(4);

    res.json({
      success: true,
      data: {
        ...product.toObject(),
        relatedProducts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      weight,
      image,
      category,
      isVeg,
      isEggless,
      isFeatured,
      isAvailable,
      displayOrder,
      ingredients,
      nutritionalInfo,
    } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, price, category, and image',
      });
    }

    const catObj = await Category.findById(category);
    if (!catObj) {
      return res.status(400).json({ success: false, message: 'Invalid category specified' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const product = await Product.create({
      name,
      slug,
      description: description || 'Artisanal bake prepared fresh daily with premium ingredients.',
      price: Number(price),
      weight: weight || '500g',
      image,
      category,
      isVeg: isVeg !== undefined ? isVeg : true,
      isEggless: isEggless !== undefined ? isEggless : false,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      ingredients: Array.isArray(ingredients) ? ingredients : typeof ingredients === 'string' ? ingredients.split(',').map((s) => s.trim()) : [],
      nutritionalInfo: nutritionalInfo || {},
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name slug icon');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      weight,
      image,
      category,
      isVeg,
      isEggless,
      isFeatured,
      isAvailable,
      displayOrder,
      ingredients,
      nutritionalInfo,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (category) {
      const catObj = await Category.findById(category);
      if (!catObj) {
        return res.status(400).json({ success: false, message: 'Invalid category specified' });
      }
      product.category = category;
    }

    if (name) {
      product.name = name;
      product.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (weight !== undefined) product.weight = weight;
    if (image !== undefined) product.image = image;
    if (isVeg !== undefined) product.isVeg = isVeg;
    if (isEggless !== undefined) product.isEggless = isEggless;
    if (isFeatured !== undefined) product.isFeatured = isFeatured;
    if (isAvailable !== undefined) product.isAvailable = isAvailable;
    if (displayOrder !== undefined) product.displayOrder = Number(displayOrder);
    if (ingredients !== undefined) {
      product.ingredients = Array.isArray(ingredients) ? ingredients : typeof ingredients === 'string' ? ingredients.split(',').map((s) => s.trim()) : [];
    }
    if (nutritionalInfo !== undefined) product.nutritionalInfo = nutritionalInfo;

    const updated = await product.save();
    const populated = await Product.findById(updated._id).populate('category', 'name slug icon');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: populated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle product availability
// @route   PATCH /api/products/:id/toggle-availability
// @access  Private/Admin
export const toggleAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    product.isAvailable = !product.isAvailable;
    await product.save();
    res.json({ success: true, message: `Product is now ${product.isAvailable ? 'available' : 'unavailable'}`, isAvailable: product.isAvailable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle product featured
// @route   PATCH /api/products/:id/toggle-featured
// @access  Private/Admin
export const toggleFeatured = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    product.isFeatured = !product.isFeatured;
    await product.save();
    res.json({ success: true, message: `Product is ${product.isFeatured ? 'featured' : 'unfeatured'}`, isFeatured: product.isFeatured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { seedCategories, seedProductsData } from '../utils/seedData.js';

let mongoMemoryInstance = null;

export const autoSeedIfEmpty = async () => {
  try {
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();

    if (userCount === 0 || categoryCount === 0) {
      console.log('[DB Init] Database is empty. Running automatic seed data initialization...');

      await User.deleteMany({});
      await Category.deleteMany({});
      await Product.deleteMany({});

      const primaryAdminEmail = process.env.ADMIN_EMAIL || 'cozycrumbs6767@gmail.com';
      const primaryAdminPass = process.env.ADMIN_PASSWORD || '@#cozycrumbs6767@gmail.com#@';

      // Admin user
      await User.create({
        name: 'Cozy Crumbs Admin',
        email: primaryAdminEmail.toLowerCase(),
        password: primaryAdminPass,
        role: 'admin',
      });

      // Fallback typo email support
      if (primaryAdminEmail.toLowerCase() !== 'cozycrums6767@gmail.com') {
        await User.create({
          name: 'Cozy Crumbs Admin (Fallback)',
          email: 'cozycrums6767@gmail.com',
          password: '@#cozycrums6767#@',
          role: 'admin',
        });
      }

      // Categories
      const createdCategories = await Category.insertMany(seedCategories);
      const categoryMap = {};
      createdCategories.forEach((cat) => {
        categoryMap[cat.name] = cat._id;
      });

      // Products
      const productsToInsert = seedProductsData.map((prod) => ({
        name: prod.name,
        slug: prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description: prod.description,
        price: prod.price,
        weight: prod.weight,
        image: prod.image,
        category: categoryMap[prod.categoryName],
        isVeg: prod.isVeg,
        isEggless: prod.isEggless,
        isFeatured: prod.isFeatured,
        isAvailable: prod.isAvailable,
        displayOrder: prod.displayOrder,
        ingredients: prod.ingredients,
        nutritionalInfo: prod.nutritionalInfo,
      }));

      await Product.insertMany(productsToInsert);

      console.log('✅ [DB Init] Auto-seeding completed: Admin, Categories, and Products ready.');
    }
  } catch (err) {
    console.error('[DB Init Error] Auto-seeding error:', err.message);
  }
};

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cozy_crumbs';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
    await autoSeedIfEmpty();
    return;
  } catch (error) {
    console.log(`[MongoDB] Standard connection to ${uri} failed (${error.message}).`);
    console.log('[MongoDB] Initializing In-Memory MongoDB Server fallback...');

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryInstance = await MongoMemoryServer.create();
      const memUri = mongoMemoryInstance.getUri();

      const conn = await mongoose.connect(memUri);
      console.log(`[MongoDB] In-Memory Server Active: ${memUri}`);

      await autoSeedIfEmpty();
    } catch (memErr) {
      console.error('[MongoDB Error] Fallback In-Memory MongoDB failed:', memErr.message);
    }
  }
};

import sequelize from './db/config.js';
import Category from './models/category.js';
import Product from './models/product.js';
import User from './models/user.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');
    
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    const categories = await Category.bulkCreate([
      { name: 'Grains & Staples', slug: 'grains-staples' },
      { name: 'Vegetables', slug: 'vegetables' },
      { name: 'Fruits', slug: 'fruits' },
      { name: 'Dairy Products', slug: 'dairy-products' },
      { name: 'Other', slug: 'other' }
    ], { ignoreDuplicates: true });

    console.log('Categories created:', categories.length);

    const seller = await User.create({
      name: 'Raj Kumar',
      email: 'raj@samadhan.com',
      password: await bcrypt.hash('password123', 10),
      role: 'seller'
    }).catch(() => null);

    const buyer = await User.create({
      name: 'Arjun Singh',
      email: 'arjun@samadhan.com',
      password: await bcrypt.hash('password123', 10),
      role: 'buyer'
    }).catch(() => null);

    console.log('Users created');

    const products = [
      {
        title: 'Fresh Potato',
        price: 30,
        stock: 100,
        categoryId: 1,
        product_desc: 'High quality farm fresh potatoes',
        img_link: 'https://via.placeholder.com/300x200?text=Potato',
        sellerId: seller?.id || 1,
        sellerName: 'Raj Kumar',
        unit: 'kg'
      },
      {
        title: 'Organic Tomatoes',
        price: 50,
        stock: 80,
        categoryId: 2,
        product_desc: 'Fresh red farm tomatoes',
        img_link: 'https://via.placeholder.com/300x200?text=Tomatoes',
        sellerId: seller?.id || 1,
        sellerName: 'Raj Kumar',
        unit: 'kg'
      },
      {
        title: 'Basmati Rice',
        price: 120,
        stock: 150,
        categoryId: 1,
        product_desc: 'Premium quality basmati rice',
        img_link: 'https://via.placeholder.com/300x200?text=Rice',
        sellerId: seller?.id || 1,
        sellerName: 'Raj Kumar',
        unit: 'kg'
      },
      {
        title: 'Carrots',
        price: 40,
        stock: 200,
        categoryId: 2,
        product_desc: 'Fresh orange carrots',
        img_link: 'https://via.placeholder.com/300x200?text=Carrots',
        sellerId: seller?.id || 1,
        sellerName: 'Raj Kumar',
        unit: 'kg'
      },
      {
        title: 'Fresh Apples',
        price: 80,
        stock: 120,
        categoryId: 3,
        product_desc: 'Sweet and juicy farm apples',
        img_link: 'https://via.placeholder.com/300x200?text=Apples',
        sellerId: seller?.id || 1,
        sellerName: 'Raj Kumar',
        unit: 'kg'
      },
      {
        title: 'Milk',
        price: 60,
        stock: 200,
        categoryId: 4,
        product_desc: 'Fresh farm milk',
        img_link: 'https://via.placeholder.com/300x200?text=Milk',
        sellerId: seller?.id || 1,
        sellerName: 'Raj Kumar',
        unit: 'kg'
      }
    ];

    await Product.bulkCreate(products, { ignoreDuplicates: true });
    console.log('Products created');

    console.log('Database seeding completed!');
    console.log('\nTest Accounts:');
    console.log('Seller - Email: raj@samadhan.com, Password: password123');
    console.log('Buyer - Email: arjun@samadhan.com, Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();

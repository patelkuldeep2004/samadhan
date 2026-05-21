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
      { name: 'Other', slug: 'other' },
      { name: 'Beverages', slug: 'beverages' },
      { name: 'Snacks', slug: 'snacks' },
      { name: 'Meat', slug: 'meat' },
      { name: 'Poultry', slug: 'poultry' },
      { name: 'Seafood', slug: 'seafood' }
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
      { title: 'Fresh Potato', price: 20, stock: 100, categoryId: 1, product_desc: 'High quality farm fresh potatoes, harvested directly from organic farms', img_link: 'uploads/potato.jpg', sellerId: seller?.id || 2, sellerName: 'Aman', unit: 'kg' },
      { title: 'Organic Wheat', price: 30, stock: 200, categoryId: 1, product_desc: 'Naturally grown organic wheat, free from pesticides and chemicals', img_link: 'uploads/wheat.jpg', sellerId: seller?.id || 2, sellerName: 'Nitn', unit: 'kg' },
      { title: 'Basmati Rice', price: 60, stock: 150, categoryId: 1, product_desc: 'Premium quality basmati rice with aromatic fragrance', img_link: 'uploads/rice.jpg', sellerId: seller?.id || 3, sellerName: 'sauraf', unit: 'kg' },
      { title: 'Fresh Tomatoes', price: 25, stock: 80, categoryId: 2, product_desc: 'Juicy red farm tomatoes, perfect for cooking and salads', img_link: 'uploads/tomato.jpg', sellerId: seller?.id || 3, sellerName: 'Ayush', unit: 'kg' },
      { title: 'Green Chillies', price: 40, stock: 60, categoryId: 2, product_desc: 'Spicy fresh green chillies, brings authentic flavor to your dishes', img_link: 'uploads/chillies.jpg', sellerId: seller?.id || 4, sellerName: 'khilesh', unit: 'kg' },
      { title: 'Onions', price: 22, stock: 120, categoryId: 2, product_desc: 'Fresh red onions harvested at peak ripeness', img_link: 'uploads/onion.jpg', sellerId: seller?.id || 4, sellerName: 'Mayank', unit: 'kg' },
      { title: 'Carrots', price: 35, stock: 90, categoryId: 2, product_desc: 'Crunchy organic carrots, rich in beta-carotene and vitamins', img_link: 'uploads/carrot.jpg', sellerId: seller?.id || 5, sellerName: 'Rupesh', unit: 'kg' },
      { title: 'Cabbage', price: 18, stock: 70, categoryId: 2, product_desc: 'Fresh green cabbage, ideal for curries and salads', img_link: 'uploads/cabbage.jpg', sellerId: seller?.id || 5, sellerName: 'Gourav', unit: 'kg' },
      { title: 'Cauliflower', price: 28, stock: 65, categoryId: 2, product_desc: 'Farm fresh cauliflower with cream-white florets', img_link: 'uploads/cauliflower.jpg', sellerId: seller?.id || 6, sellerName: 'jay', unit: 'kg' },
      { title: 'Spinach', price: 15, stock: 50, categoryId: 2, product_desc: 'Healthy green spinach leaves, packed with nutrients', img_link: 'uploads/spinach.jpg', sellerId: seller?.id || 6, sellerName: 'Nihal', unit: 'kg' },
      { title: 'Mango', price: 80, stock: 100, categoryId: 3, product_desc: 'Sweet juicy mangoes, king of fruits with natural sweetness', img_link: 'uploads/mango.jpg', sellerId: seller?.id || 2, sellerName: 'Aanchal', unit: 'kg' },
      { title: 'Banana', price: 40, stock: 150, categoryId: 3, product_desc: 'Fresh bananas, rich in potassium and nutrition', img_link: 'uploads/banana.jpg', sellerId: seller?.id || 3, sellerName: 'shubham', unit: 'kg' },
      { title: 'Apple', price: 120, stock: 90, categoryId: 3, product_desc: 'Red delicious apples, crispy and sweet', img_link: 'uploads/apple.jpg', sellerId: seller?.id || 4, sellerName: 'vaishali', unit: 'kg' },
      { title: 'Papaya', price: 50, stock: 60, categoryId: 3, product_desc: 'Fresh ripe papaya, perfect for smoothies and desserts', img_link: 'uploads/papaya.jpg', sellerId: seller?.id || 5, sellerName: 'Madhur', unit: 'kg' },
      { title: 'Pomegranate', price: 90, stock: 70, categoryId: 3, product_desc: 'Healthy pomegranate, loaded with antioxidants', img_link: 'uploads/pomegranate.jpg', sellerId: seller?.id || 6, sellerName: 'sauraf', unit: 'kg' },
      { title: 'Milk', price: 55, stock: 200, categoryId: 4, product_desc: 'Pure cow milk, fresh from farms without additives', img_link: 'uploads/milk.jpg', sellerId: seller?.id || 2, sellerName: 'Aman', unit: 'liter' },
      { title: 'Paneer', price: 300, stock: 40, categoryId: 4, product_desc: 'Fresh homemade paneer, soft and creamy texture', img_link: 'uploads/paneer.jpg', sellerId: seller?.id || 3, sellerName: 'Ayush', unit: 'kg' },
      { title: 'Butter', price: 450, stock: 30, categoryId: 4, product_desc: 'Organic butter, rich and creamy from farm milk', img_link: 'uploads/butter.jpg', sellerId: seller?.id || 4, sellerName: 'Nihal', unit: 'kg' },
      { title: 'Mustard Seeds', price: 70, stock: 100, categoryId: 5, product_desc: 'High quality mustard seeds, essential spice for cooking', img_link: 'uploads/mustard.jpg', sellerId: seller?.id || 5, sellerName: 'Nihal', unit: 'kg' },
      { title: 'Cumin Seeds', price: 150, stock: 80, categoryId: 5, product_desc: 'Aromatic cumin seeds, adds authentic flavor to dishes', img_link: 'uploads/cumin.jpg', sellerId: seller?.id || 6, sellerName: 'Aastha', unit: 'kg' }
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

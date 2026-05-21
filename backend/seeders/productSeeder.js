import Product from '../models/product.js';
import Category from '../models/category.js';
import sequelize from '../db/config.js';

const seedProducts = async () => {
  try {
    const categories = await Category.findAll();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.id] = cat;
    });

    const productsData = [
      {
        title: "Fresh Potato",
        price: 20,
        stock: 100,
        product_desc: "High quality farm fresh potatoes, harvested directly from organic farms",
        img_link: "uploads/potato.jpg",
        categoryId: 1,
        sellerId: 2,
        sellerName: "Aman",
        unit: 'kg'
      },
      {
        title: "Organic Wheat",
        price: 30,
        stock: 200,
        product_desc: "Naturally grown organic wheat, free from pesticides and chemicals",
        img_link: "uploads/wheat.jpg",
        categoryId: 1,
        sellerId: 2,
        sellerName: "Nitn",
        unit: 'kg'
      },
      {
        title: "Basmati Rice",
        price: 60,
        stock: 150,
        product_desc: "Premium quality basmati rice with aromatic fragrance",
        img_link: "uploads/rice.jpg",
        categoryId: 1,
        sellerId: 3,
        sellerName: "sauraf",
        unit: 'kg'
      },
      {
        title: "Fresh Tomatoes",
        price: 25,
        stock: 80,
        product_desc: "Juicy red farm tomatoes, perfect for cooking and salads",
        img_link: "uploads/tomato.jpg",
        categoryId: 2,
        sellerId: 3,
        sellerName: "Ayush",
        unit: 'kg'
      },
      {
        title: "Green Chillies",
        price: 40,
        stock: 60,
        product_desc: "Spicy fresh green chillies, brings authentic flavor to your dishes",
        img_link: "uploads/chillies.jpg",
        categoryId: 2,
        sellerId: 4,
        sellerName: "khilesh",
        unit: 'kg'
      },
      {
        title: "Onions",
        price: 22,
        stock: 120,
        product_desc: "Fresh red onions harvested at peak ripeness",
        img_link: "uploads/onion.jpg",
        categoryId: 2,
        sellerId: 4,
        sellerName: "Mayank",
        unit: 'kg'
      },
      {
        title: "Carrots",
        price: 35,
        stock: 90,
        product_desc: "Crunchy organic carrots, rich in beta-carotene and vitamins",
        img_link: "uploads/carrot.jpg",
        categoryId: 2,
        sellerId: 5,
        sellerName: "Rupesh",
        unit: 'kg'
      },
      {
        title: "Cabbage",
        price: 18,
        stock: 70,
        product_desc: "Fresh green cabbage, ideal for curries and salads",
        img_link: "uploads/cabbage.jpg",
        categoryId: 2,
        sellerId: 5,
        sellerName: "Gourav",
        unit: 'kg'
      },
      {
        title: "Cauliflower",
        price: 28,
        stock: 65,
        product_desc: "Farm fresh cauliflower with cream-white florets",
        img_link: "uploads/cauliflower.jpg",
        categoryId: 2,
        sellerId: 6,
        sellerName: "jay",
        unit: 'kg'
      },
      {
        title: "Spinach",
        price: 15,
        stock: 50,
        product_desc: "Healthy green spinach leaves, packed with nutrients",
        img_link: "uploads/spinach.jpg",
        categoryId: 2,
        sellerId: 6,
        sellerName: "Nihal",
        unit: 'kg'
      },
      {
        title: "Mango",
        price: 80,
        stock: 100,
        product_desc: "Sweet juicy mangoes, king of fruits with natural sweetness",
        img_link: "uploads/mango.jpg",
        categoryId: 3,
        sellerId: 2,
        sellerName: "Aanchal",
        unit: 'kg'
      },
      {
        title: "Banana",
        price: 40,
        stock: 150,
        product_desc: "Fresh bananas, rich in potassium and nutrition",
        img_link: "uploads/banana.jpg",
        categoryId: 3,
        sellerId: 3,
        sellerName: "shubham",
        unit: 'kg'
      },
      {
        title: "Apple",
        price: 120,
        stock: 90,
        product_desc: "Red delicious apples, crispy and sweet",
        img_link: "uploads/apple.jpg",
        categoryId: 3,
        sellerId: 4,
        sellerName: "vaishali",
        unit: 'kg'
      },
      {
        title: "Papaya",
        price: 50,
        stock: 60,
        product_desc: "Fresh ripe papaya, perfect for smoothies and desserts",
        img_link: "uploads/papaya.jpg",
        categoryId: 3,
        sellerId: 5,
        sellerName: "Madhur",
        unit: 'kg'
      },
      {
        title: "Pomegranate",
        price: 90,
        stock: 70,
        product_desc: "Healthy pomegranate, loaded with antioxidants",
        img_link: "uploads/pomegranate.jpg",
        categoryId: 3,
        sellerId: 6,
        sellerName: "sauraf",
        unit: 'kg'
      },
      {
        title: "Milk",
        price: 55,
        stock: 200,
        product_desc: "Pure cow milk, fresh from farms without additives",
        img_link: "uploads/milk.jpg",
        categoryId: 4,
        sellerId: 2,
        sellerName: "Aman",
        unit: 'liter'
      },
      {
        title: "Paneer",
        price: 300,
        stock: 40,
        product_desc: "Fresh homemade paneer, soft and creamy texture",
        img_link: "uploads/paneer.jpg",
        categoryId: 4,
        sellerId: 3,
        sellerName: "Ayush",
        unit: 'kg'
      },
      {
        title: "Butter",
        price: 450,
        stock: 30,
        product_desc: "Organic butter, rich and creamy from farm milk",
        img_link: "uploads/butter.jpg",
        categoryId: 4,
        sellerId: 4,
        sellerName: "Nihal",
        unit: 'kg'
      },
      {
        title: "Mustard Seeds",
        price: 70,
        stock: 100,
        product_desc: "High quality mustard seeds, essential spice for cooking",
        img_link: "uploads/mustard.jpg",
        categoryId: 5,
        sellerId: 5,
        sellerName: "Nihal",
        unit: 'kg'
      },
      {
        title: "Cumin Seeds",
        price: 150,
        stock: 80,
        product_desc: "Aromatic cumin seeds, adds authentic flavor to dishes",
        img_link: "uploads/cumin.jpg",
        categoryId: 5,
        sellerId: 6,
        sellerName: "Aastha",
        unit: 'kg'
      }
    ];

    for (const productData of productsData) {
      await Product.create(productData);
    }
    
  } catch (error) {
  }
};

export default seedProducts;

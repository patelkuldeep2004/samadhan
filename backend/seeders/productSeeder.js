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
        img_link: "https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg",
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
        img_link: "https://tse1.explicit.bing.net/th/id/OIP.XEllGzv4RNIWMcHeexLSWQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
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
        img_link: "https://cdn11.bigcommerce.com/s-dis4vxtxtc/products/2015/images/3110/image_691__17256.1679026631.386.513.jpg?c=2",
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
        img_link: "https://borates.today/wp-content/uploads/2022/07/Tomato-plants.jpg",
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
        img_link: "https://www.livofy.com/health/wp-content/uploads/2023/06/Untitled-design-1-3.png",
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
        img_link: "https://img.freepik.com/premium-photo/fresh-onion-wallpaper-photo_234209-1958.jpg",
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
        img_link: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2018/4/25/3/shutterstock_440493100_5-second-Studio_carrots.jpg.rend.hgtvcom.1280.853.suffix/1524688181811.jpeg",
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
        img_link: "https://tse3.mm.bing.net/th/id/OIP.UlI0NNeQCRh57kXPiiK8TgHaE6?rs=1&pid=ImgDetMain&o=7&rm=3",
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
        img_link: "https://pics.craiyon.com/2023-11-23/bFvhjkhkQPGt7JaWd9Fi6Q.webp",
        categoryId: 2,
        sellerId: 6,
        sellerName: "satyaprakash",
        unit: 'kg'
      },
      {
        title: "Spinach",
        price: 15,
        stock: 50,
        product_desc: "Healthy green spinach leaves, packed with nutrients",
        img_link: "https://i0.wp.com/spicechronicles.com/wp-content/uploads/2014/07/IMG_9158_2.jpg?ssl=1",
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
        img_link: "https://mangorepublic.co/wp-content/uploads/2023/05/devgad-taluka-alphonso-mangifera-indica-mango-fruit-mango-4c074be3a14e490d7b63d796606e3d2e.png",
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
        img_link: "https://c8.alamy.com/comp/PRFTN4/bunch-of-fresh-ripe-banana-fruits-isolated-on-white-background-PRFTN4.jpg",
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
        img_link: "https://minnetonkaorchards.com/wp-content/uploads/2022/06/shutterstock_214563820-1-1024x683.jpg",
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
        img_link: "https://www.meinstyn.com/wp-content/uploads/2022/08/Eating-Papaya-Benefits-Papaya-Enzyme-Seeds.jpg",
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
        img_link: "https://images.healthshots.com/healthshots/en/uploads/2021/09/27184641/pomegranate.jpg",
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
        img_link: "https://tse1.mm.bing.net/th/id/OIP.2-PGFGcrCzHl67trwz3ULgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
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
        img_link: "https://static.vecteezy.com/system/resources/previews/036/291/652/original/ai-generated-tofu-with-a-transparent-background-ai-png.png",
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
        img_link: "https://tse1.mm.bing.net/th/id/OIP.JjvLx-LJ6Tydb59NDMAM4gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
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
        img_link: "https://www.spiceography.com/wp-content/uploads/2020/07/Yellow-Mustard-Seeds.jpg",
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
        img_link: "https://welldales.co.uk/wp-content/uploads/2022/08/cucumber-large-long-giant-xl-seeds-garden-uk-grow-british-beth-alpha-marketmore-feature-e1661611206144.jpg",
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

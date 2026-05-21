import Category from '../models/category.js';

export const createCategory = async (req, res) => {
  try {
    const { name, slug, url } = req.body;

    // Validation
    if (!name || !slug) {
      return res.status(400).json({ 
        message: "Name and slug are required" 
      });
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ where: { slug } });
    if (existingCategory) {
      return res.status(400).json({ 
        message: "This slug already exists" 
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug: slug.trim(),
      url: url || ''
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
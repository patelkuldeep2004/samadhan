import Review from '../models/review.js';

export const createReview = async (req, res) => {
  try {
    const { rating, comment, reviewerName, reviewerEmail, productId, userId } = req.body;

    // Validation
    if (!rating || !productId || !userId) {
      return res.status(400).json({ 
        message: "Rating, productId, and userId are required" 
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        message: "Rating must be between 1 and 5" 
      });
    }

    const review = await Review.create({
      rating,
      comment: comment || '',
      reviewerName: reviewerName || 'Anonymous',
      reviewerEmail: reviewerEmail || '',
      productId,
      userId
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
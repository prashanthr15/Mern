const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/travelpro', { useNewUrlParser: true, useUnifiedTopology: true });

const reviewSchema = new mongoose.Schema({
  name: String,
  text: String
});
const Review = mongoose.model('Review', reviewSchema);

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// Add review
app.post('/api/reviews', async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.json(review);
});

// Update review
app.put('/api/reviews/:id', async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(review);
});

// Delete review
app.delete('/api/reviews/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));
const { Engine, Reader, Recommender } = require("disco");

// Mock data (replace with your actual data)
const data = [
  { userId: "user1", itemId: "product1", rating: 5 },
  { userId: "user1", itemId: "product2", rating: 4 },
  { userId: "user2", itemId: "product1", rating: 4 },
  { userId: "user2", itemId: "product3", rating: 5 },
  // Add more data...
];

// Initialize a Disco engine
const engine = new Engine();

// Load data into the engine
const reader = new Reader();
reader.addDataset(data);
engine.setReader(reader);

// Initialize a recommender
const recommender = new Recommender(engine);

// Train the recommender
recommender.train();

// Controller function to get recommendations for a user
function getRecommendationsForUser(req, res) {
  const userId = req.params.userId;
  const recommendations = recommender.recommendations(userId, { num: 5 });
  res.json(recommendations);
}

// Export the controller functions
module.exports = {
  getRecommendationsForUser,
};

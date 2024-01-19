// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Create an Express app
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/Price', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema
const exampleSchema = new mongoose.Schema({
  totalDistance: Number,
  totalTime: Number,
  waitingTime: Number,
  calculatedPrice: Number,
});

// Create a Mongoose model
const ExampleModel = mongoose.model('Example', exampleSchema);

// Middleware to parse JSON data
app.use(express.json());
app.use(cors())

// Route to handle data from React
app.post('/api/send-data', async (req, res) => {
  try {
    // Extract data from the request body
    const { totalDistance, totalTime, waitingTime, calculatedPrice } = req.body;

    // Create a new document using the Mongoose model
    const newExample = new ExampleModel({
      totalDistance,
      totalTime,
      waitingTime,
      calculatedPrice,
    });

    // Save the document to the MongoDB database
    await newExample.save();

    // Respond with a success message
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

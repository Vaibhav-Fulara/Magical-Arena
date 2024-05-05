import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { gameRoutes } from './routes/game.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize game routes
const router = express.Router();
gameRoutes(router);
app.use('/magic-arena', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { gameRoutes } from './routes/game.routes';
import { PlayerModel } from './models/player.model';  // Importing our player model

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    // Optional: Create and save a new player document as a test
    const newPlayer = new PlayerModel({
      name: 'TestPlayer',
      health: 100,
      attack: 20,
      strength: 15
    });

    newPlayer.save()
      .then(doc => console.log('New player added:', doc))
      .catch(err => console.error('Error adding new player:', err));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize game routes
const router = express.Router();
gameRoutes(router);
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

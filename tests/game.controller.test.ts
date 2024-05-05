import { GameController } from '../src/controllers/game.controller';
import { GameService } from '../src/services/game.service';
import { PlayerDTO } from '../src/models/player.model';
import request from 'supertest';
import express from 'express';

// Setup express app and controller
const app = express();
app.use(express.json());

const mockGameService = {
  createPlayer: jest.fn(),
  getPlayer: jest.fn(),
  fight: jest.fn()
};

const gameController = new GameController(mockGameService as unknown as GameService);
app.post('/players', gameController.createPlayer);
app.get('/players/:playerId', gameController.getPlayer);
app.post('/fight/:player1Id/:player2Id', gameController.fight);

describe('GameController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPlayer', () => {
    it('should validate player data and return 400 on validation error', async () => {
      const playerData = { health: -10, strength: 5, attack: 5 }; // Invalid health
      const response = await request(app).post('/players').send(playerData);
      expect(response.status).toBe(400);
    });

    it('should create a player and return 201 successfully', async () => {
      const playerData = { name: 'Test', health: 100, strength: 5, attack: 5 };
      mockGameService.createPlayer.mockResolvedValue(new PlayerDTO('Test', 100, 5, 5));
      const response = await request(app).post('/players').send(playerData);
      expect(response.status).toBe(201);
      expect(mockGameService.createPlayer).toHaveBeenCalledWith(expect.any(PlayerDTO));
    });
  });

  describe('getPlayer', () => {
    it('should return 404 if player not found', async () => {
      mockGameService.getPlayer.mockResolvedValue(null);
      const response = await request(app).get('/players/123');
      expect(response.status).toBe(404);
    });

    it('should return 200 and the player if found', async () => {
      mockGameService.getPlayer.mockResolvedValue(new PlayerDTO('Test', 100, 10, 10));
      const response = await request(app).get('/players/123');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ name: 'Test', health: 100, strength: 10, attack: 10 });
    });
  });

  describe('fight', () => {
    it('should initiate a fight and return result', async () => {
      mockGameService.fight.mockResolvedValue({ winner: 'Player1' });
      const response = await request(app).post('/fight/1/2');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ winner: 'Player1' });
    });
  });
});

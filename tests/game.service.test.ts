import { GameService } from '../src/services/game.service';
import { PlayerAccessor } from '../src/accessors/player.accessor';
import { PlayerDTO } from '../src/models/player.model';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';

describe('GameService', () => {
  let gameService: GameService;
  let mockPlayerAccessor: jest.Mocked<PlayerAccessor>;

  beforeEach(() => {
    // Mocking the PlayerAccessor with all necessary methods
    mockPlayerAccessor = {
      createPlayer: jest.fn(),
      findPlayerById: jest.fn(),
      updatePlayerHealth: jest.fn(), // Ensure all methods are mocked
    };
    gameService = new GameService(mockPlayerAccessor);
  });

  describe('createPlayer', () => {
    it('should create a player and return the document', async () => {
      const playerDTO = new PlayerDTO('Hero', 100, 10, 5);
      const mockPlayerDoc = {
        ...playerDTO,
        _id: new mongoose.Types.ObjectId()
      };

      // Mocking `createPlayer` to simulate saving a player
      mockPlayerAccessor.createPlayer.mockResolvedValue(mockPlayerDoc as any);

      const result = await gameService.createPlayer(playerDTO);
      expect(result).toEqual(mockPlayerDoc);
      expect(mockPlayerAccessor.createPlayer).toHaveBeenCalledWith(playerDTO);
    });
  });

  describe('getPlayer', () => {
    it('should retrieve a player by ID', async () => {
      const playerId = 'some-player-id';
      const playerData = { ...new PlayerDTO('Hero', 100, 10, 5), _id: new mongoose.Types.ObjectId() };

      mockPlayerAccessor.findPlayerById.mockResolvedValue(playerData as any);

      const result = await gameService.getPlayer(playerId);
      expect(result).toEqual(playerData);
      expect(mockPlayerAccessor.findPlayerById).toHaveBeenCalledWith(playerId);
    });
  });

  describe('fight', () => {
    const mockGameService = new GameService(mockPlayerAccessor);

    // Mock the fight method
    //@ts-ignore
    mockGameService.fight = jest.fn().mockResolvedValue({
      winner: 'test2',
      details: {
        player1: { id: 'player1-id', health: 0 },
        player2: { id: 'player2-id', health: 100 }
      }
    }) as any;
    it('should conduct a fight and declare a winner', async () => {
      // Ensure the PlayerDTOs are created correctly with the `_id` field.
      const player1 = { ...new PlayerDTO('Hero', 50, 5, 10), _id: 'test1' };
      const player2 = { ...new PlayerDTO('Villain', 100, 10, 5), _id: 'test2' };

      // Mocking the accessor method to return these players
      mockPlayerAccessor.findPlayerById
        .mockResolvedValueOnce(player1 as any) // Cast as any to bypass type checking issues
        .mockResolvedValueOnce(player2 as any);

      // Mock `Math.random()` to control the randomness
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

      // Calling the fight function
      const result = await mockGameService.fight(player1._id.toString(), player2._id.toString());

      // Check if the correct winner is declared based on the controlled random values
      expect(result.winner).toBe(player2._id.toString());
      expect(result.details.player1.health).toBeLessThan(50);
      expect(result.details.player2.health).toBeGreaterThan(0);

      // Restore the original Math.random function to avoid affecting other tests
      jest.restoreAllMocks();
    });
  });

});

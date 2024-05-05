import { Request, Response } from 'express';
import { GameService } from '../services/game.service';

export class GameController {
    constructor(private gameService: GameService) {}

    createPlayer = async (req: Request, res: Response): Promise<void> => {
        try {
            const player = await this.gameService.createPlayer(req.body);
            res.status(201).json(player);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Failed to create player due to an unknown error' });
            }
        }
    }

    getPlayer = async (req: Request, res: Response): Promise<void> => {
        const { playerId } = req.params;
        try {
            const player = await this.gameService.getPlayer(playerId);
            if (player) {
                res.status(200).json(player);
            } else {
                res.status(404).json({ message: 'Player not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}

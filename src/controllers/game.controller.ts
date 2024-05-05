import { Request, Response } from 'express';
import { GameService } from '../services/game.service';
import { PlayerDTO } from '../models/player.model';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class GameController {
    constructor(private gameService: GameService) {}

    fight = async (req: Request, res: Response): Promise<void> => {
        const { player1Id, player2Id } = req.params;
        try {
            const result = await this.gameService.fight(player1Id, player2Id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    createPlayer = async (req: Request, res: Response) => {
        const playerData = plainToInstance(PlayerDTO, req.body);
        const validationErrors: ValidationError[] = await validate(playerData);

        if (validationErrors.length > 0) {
            const messages = validationErrors.map(error => {
                return { property: error.property, errors: Object.values(error.constraints ?? {}) };
            });
            return res.status(400).json(messages);
        }

        try {
            const player = await this.gameService.createPlayer(playerData[0]);
            res.status(201).json(player);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to create player due to an unknown error' });
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
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }
}

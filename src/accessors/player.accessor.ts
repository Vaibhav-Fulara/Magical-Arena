import { PlayerModel, PlayerDTO } from "../models/player.model";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class PlayerAccessor {
    async createPlayer(playerData: PlayerDTO) {
        const playerInstance = plainToInstance(PlayerDTO, playerData);
        const errors = await validate(playerInstance);

        if (errors.length > 0) {
            throw new Error(`Validation failed!`);
        } else {
            const newPlayer = new PlayerModel(playerData);
            return await newPlayer.save();
        }
    }

    async findPlayerById(playerId: string) {
        return await PlayerModel.findById(playerId);
    }

    async updatePlayerHealth(playerId: string, newHealth: number) {
        return await PlayerModel.findByIdAndUpdate(playerId, { health: newHealth }, { new: true });
    }
}

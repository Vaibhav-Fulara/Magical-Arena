import { PlayerDTO } from "../models/player.model";
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class PlayerValidator {
    static async validate(playerData: PlayerDTO): Promise<void> {
        const playerInstance = plainToInstance(PlayerDTO, playerData);
        const errors = await validate(playerInstance);
        if (errors.length > 0) {
            // Map each ValidationError to a readable string, checking for undefined constraints
            const errorMessages = errors.map(error => {
                if (error.constraints) {
                    // Join all constraint messages for this property
                    return Object.values(error.constraints).join(', ');
                }
                return 'Unknown validation error'; // Fallback message
            }).join('; ');
            throw new Error(`Validation failed: ${errorMessages}`);
        }
    }
}

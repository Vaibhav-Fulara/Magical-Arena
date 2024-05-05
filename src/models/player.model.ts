import mongoose from 'mongoose';

// A TypeScript type for Player
interface Player extends mongoose.Document {
    health: number;
    strength: number;
    attack: number;
}

// Create a Mongoose schema for players
const playerSchema = new mongoose.Schema({
    health: { type: Number, required: true },
    strength: { type: Number, required: true },
    attack: { type: Number, required: true }
});

// Mongoose Model
const PlayerModel = mongoose.model<Player>('Player', playerSchema);

// PlayerDTO for data transfer operations and validations
class PlayerDTO {
    health: number;
    strength: number;
    attack: number;

    constructor(health: number, strength: number, attack: number) {
        this.health = health;
        this.strength = strength;
        this.attack = attack;
    }
}

export { PlayerModel, PlayerDTO };

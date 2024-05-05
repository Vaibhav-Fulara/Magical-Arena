import mongoose from 'mongoose';
import { IsInt, IsString, Min } from 'class-validator';

// A TypeScript type for Player
interface Player extends mongoose.Document {
  name: string;
  health: number;
  strength: number;
  attack: number;
}

// Create a Mongoose schema for players
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  health: { type: Number, required: true },
  strength: { type: Number, required: true },
  attack: { type: Number, required: true }
});

// Mongoose Model
const PlayerModel = mongoose.model<Player>('Player', playerSchema);

// PlayerDTO for data transfer operations and validations
class PlayerDTO {

  @IsString({ message: "Name must be a string," })
  name: string;

  @IsInt({ message: "Health must be an integer." })
  @Min(0, { message: "Health must be non-negative." })
  health: number;

  @IsInt({ message: "Strength must be an integer." })
  @Min(0, { message: "Strength must be non-negative." })
  strength: number;

  @IsInt({ message: "Attack must be an integer." })
  @Min(0, { message: "Attack must be non-negative." })
  attack: number;

  constructor(name: string, health: number, strength: number, attack: number) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.attack = attack;
  }
}


export { PlayerModel, PlayerDTO };

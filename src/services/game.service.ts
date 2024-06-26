import { PlayerAccessor } from '../accessors/player.accessor';
import { PlayerDTO } from '../models/player.model';

export class GameService {
  constructor(private playerAccessor: PlayerAccessor) { }

  async createPlayer(playerData: PlayerDTO): Promise<any> {
    return await this.playerAccessor.createPlayer(playerData);
  }

  async getPlayer(playerId: string): Promise<any> {
    return await this.playerAccessor.findPlayerById(playerId);
  }

  async fight(player1Id: string, player2Id: string): Promise<any> {
    let player1 = await this.playerAccessor.findPlayerById(player1Id);
    let player2 = await this.playerAccessor.findPlayerById(player2Id);

    if (!player1 || !player2) {
      throw new Error('One or both players not found');
    }

    let swap = false;

    if(player1.health > player2.health) {
      swap = true;
      const tempPlayer = player1;
      player1 = player2;
      player2 = tempPlayer;
    }
    
    // Assuming a simplistic turn-based fight logic
    while (player1.health > 0 && player2.health > 0) {
      this.performAttack(player1, player2);
      if (player2.health <= 0) break;
      this.performAttack(player2, player1);
    }

    if(swap) {
      const tempPlayer = player1;
      player1 = player2;
      player2 = tempPlayer;
    }

    return {
      winner: player1.health > 0 ? player1.id : player2.id,
      details: {
        player1: { id: player1.id, health: player1.health },
        player2: { id: player2.id, health: player2.health }
      }
    };
  }

  private performAttack(attacker: any, defender: any) {
    const attackRoll = Math.floor(Math.random() * 6) + 1; // Simulating a dice roll (1-6)
    const defenseRoll = Math.floor(Math.random() * 6) + 1;
    const attackValue = attacker.attack * attackRoll;
    const defenseValue = defender.strength * defenseRoll;
    const damage = Math.max(0, attackValue - defenseValue);
    defender.health -= damage;
    defender.health = Math.max(defender.health, 0); // Making the loser's health positive in case of negative result
  }
}

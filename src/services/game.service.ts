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
}

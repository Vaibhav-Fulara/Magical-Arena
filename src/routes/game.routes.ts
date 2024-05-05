import { Router } from 'express';
import { GameController } from '../controllers/game.controller';
import { GameService } from '../services/game.service';
import { PlayerAccessor } from '../accessors/player.accessor';

export const gameRoutes = (router: Router) => {
    const playerAccessor = new PlayerAccessor();
    const gameService = new GameService(playerAccessor);
    const gameController = new GameController(gameService);

    router.post('/fight/:player1Id/:player2Id', gameController.fight.bind(gameController));
    router.post('/players', gameController.createPlayer.bind(gameController));
    router.get('/players/:playerId', gameController.getPlayer.bind(gameController));
}

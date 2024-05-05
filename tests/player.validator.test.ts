import { PlayerDTO } from "../src/models/player.model";
import { PlayerValidator } from "../src/validators/player.validator";

describe("PlayerValidator", () => {
    it("should validate a correct player DTO successfully", async () => {
        const playerData = new PlayerDTO('John Doe', 100, 10, 5);
        await expect(PlayerValidator.validate(playerData)).resolves.toBeUndefined();
    });

    it("should throw an error for invalid player DTO", async () => {
        const playerData = new PlayerDTO('', -10, 0, -1); // Invalid name and negative values
        await expect(PlayerValidator.validate(playerData)).rejects.toThrow("Validation failed");
    });
});

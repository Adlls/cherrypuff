import "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;
import { config } from "./gameConfig";

export class CherryPuff extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new CherryPuff(config);
};
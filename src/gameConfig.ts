import "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;
import { mainScene } from "./scenes/mainScene";
import { scoreScene } from "./scenes/scoreScene";
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export const config: GameConfig = {
    title: "Cherry puff",
    width: "100%",
    height: "100px",
    parent: "game",
    dom: {
        createContainer: true
    },
    scene: [
        mainScene,
        scoreScene
    ],
    backgroundColor: "#18216D",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    plugins: {
        scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI'
			}
		]
    }
};
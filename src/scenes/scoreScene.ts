import Game = Phaser.Game;
import "phaser";

export class scoreScene extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.Text;
    private message: string;
    private hint: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "scoreScene" });
    }


    init(data: any): void {
        this.message = data.message;
    }

    create(): void {
        this.scoreText = this.add.text(this.cameras.main.centerX - 100, 150, this.message);
        var hintText: string = "Click to restart";
        this.hint = this.add.text(this.cameras.main.centerX - 70, 250, hintText);
        this.input.on('pointerdown', function () {
            this.scene.start("mainScene");
        }, this);
    }
}
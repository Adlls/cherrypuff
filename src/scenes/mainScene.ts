import "phaser";
import Game = Phaser.Game;
import { card } from "../entities/card";

export class mainScene extends Phaser.Scene {

    private lifesCount: number;
    private cherryPuffCount: number;
    private currentCountCards: number;
    private infoLifesText: Phaser.GameObjects.Text; 
    private infoCherryPuffTest: Phaser.GameObjects.Text;
    private imageHeart: Phaser.GameObjects.Image;
    private imageCherryPuff: Phaser.GameObjects.Image;
    private cards: Array<card>;
    private ImageObjectCards: Array<Phaser.GameObjects.Image>;

    constructor() {
        super({ key: 'mainScene' })
    }

    
    init(): void {
        this.lifesCount = 3;
        this.cherryPuffCount = 0;
        this.currentCountCards = 4;
        this.ImageObjectCards = new Array(this.currentCountCards);
            
    }

    preload(): void {
        this.load.image('heart', 'src/assets/heart.png');
        this.load.image('cherryPuff', 'src/assets/cherryPuff.jpg');
        this.load.image('card','src/assets/card.png');
        this.load.image('cheeseburger', 'src/assets/cheeseburger.jpg');
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        })
        
        this.load.plugin(
            'rextexteditplugin', 
            'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', 
            true)
    }

    create(): void {
        const text = this.add.text(400, 300, 'Hello World', { fixedWidth: 150, fixedHeight: 36 })
	    text.setOrigin(0.5, 0.5)
        this.infoLifesText = this.add.text(20, 25, this.lifesCount + '', {
            font: '24px Arial Bold',
            color: '#FBFBAC'
        });
       this.infoCherryPuffTest =  this.add.text(this.cameras.main.centerX - 75, 30, this.cherryPuffCount + '', {
            font: '24px Arial Bold',
            color: '#FBFBAC'
        });
        this.imageHeart = this.add.image(55, 40, 'heart');
        this.imageHeart.setDisplaySize(25, 25);

        this.imageCherryPuff = this.add.image(this.cameras.main.centerX, 45, 'cherryPuff');
        this.imageCherryPuff.setDisplaySize(75, 50);
        this.drawCards();
        
    }
    update(time: number): void {
       
    }

    private drawCards() {
        let cards = this.createCards(this.currentCountCards);
        let deltaX = 200;
        for (let i = 0; i < cards.length; i++) {
            let imageCard: Phaser.GameObjects.Image = this.add.image(deltaX, 250, 'card');
            imageCard.setInteractive();
            imageCard.setDisplaySize(160, 200);
            deltaX += 200;
            this.ImageObjectCards[i] = imageCard;
            this.doMove(this.ImageObjectCards[i], cards[i]);
        }
    }

    private doMove(cardImageObject: Phaser.GameObjects.Image, card: card) {
        cardImageObject.on('pointerdown', async () => {
            if (card.getIsHaveCherryPuff()) {
                let widthForCP = cardImageObject.width;
                cardImageObject = this.add.image(cardImageObject.x, cardImageObject.y, 'cherryPuff');
                cardImageObject.setDisplaySize(widthForCP, 100);
                this.cherryPuffCount++;
                this.infoCherryPuffTest.text = this.cherryPuffCount + '';
            } else {
                let widthForCP = cardImageObject.width;
                cardImageObject = this.add.image(cardImageObject.x, cardImageObject.y, 'cheeseburger');
                cardImageObject.setDisplaySize(widthForCP, 100);
                this.lifesCount--;
                this.infoLifesText.text = this.lifesCount + '';

                if (this.lifesCount == 0) {
                    this.time.addEvent({
                        callback: () => {
                            this.scene.start("scoreScene", {
                                message: "Всего слоек с вишней: " + this.cherryPuffCount
                            });
                        }
                    })
                }
            }
            await this.inputEnable();
            await this.sleep(500);
            this.drawCards();
        });
    }

    private inputEnable() {
        for (let i = 0; i < this.ImageObjectCards.length; i++) {
            this.ImageObjectCards[i].disableInteractive();
        }
    }

    private createCards(maxCard: number): Array<card> {
        let newCards = new Array<card>(maxCard);
        let randomIndexOnCherryPuff = Math.floor(Math.random() * maxCard);
        for (let i = 0; i < maxCard; i++) {
            let newCard = new card();
            newCards[i] = newCard;
        }
        newCards[randomIndexOnCherryPuff].setIsHaveCherryPuff(true);
        return newCards;
    }

    private sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

}
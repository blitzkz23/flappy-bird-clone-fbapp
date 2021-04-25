
import Phaser, { FacebookInstantGamesLeaderboard } from 'phaser';

class PreloadScene extends Phaser.Scene {
    
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('bird', 'assets/birdSprite.png', {
            frameWidth: 16, frameHeight: 16
        });
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pause', 'assets/pause.png');
        this.load.image('back', 'assets/back.png');

        const isProd = process.env.FB_ENV || process.env.FB_ENV || process.env.NODE_ENV === 'production';

        this.load.on('progress', value => {
            isProd && FBInstant.setLoadingProgress(value * 100);
        })

        this.load.once('complete', () => {
            if (isProd) {
                FBInstant.startGameAsync().then(() => {
                    this.startGame();
                })
            } else {
                this.startGame();
            }
            
        })
        
    }

    startGame() {
        this.scene.start('MenuScene'); 
    }
}

export default PreloadScene;
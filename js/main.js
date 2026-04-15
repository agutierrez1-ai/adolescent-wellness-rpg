const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
            fps: 60
        }
    },
    render: {
        pixelArt: true,
        antialias: false,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene, GameScene, UIScene]
};

const game = new Phaser.Game(config);

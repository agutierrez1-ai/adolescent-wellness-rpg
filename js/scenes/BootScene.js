class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.setBaseURL('assets/');

        this.load.image('player', 'sprites/player.png');
        this.load.image('npc-base', 'sprites/npc.png');
        this.load.image('tileset', 'tilesets/tileset.png');
        this.load.image('ui-bg', 'ui/dialog-bg.png');

        this.load.json('npcs', 'data/npcs.json');
        this.load.json('missions', 'data/missions.json');
        this.load.json('dialogues', 'data/dialogues.json');
        this.load.json('maps', 'data/maps.json');
    }

    create() {
        console.log('✓ BootScene: Todos los assets cargados');
        this.scene.start('GameScene');
    }
}

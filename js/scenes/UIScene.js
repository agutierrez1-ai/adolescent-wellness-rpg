class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        console.log('🖼️ UIScene iniciada');

        this.gameScene = this.scene.get('GameScene');

        this.emotionalBalanceText = this.add.text(10, 10, 'Equilibrio Emocional: 100%', {
            font: '14px Arial',
            fill: '#00ff00',
            backgroundColor: '#1a1a1a',
            padding: { x: 8, y: 4 }
        });

        this.positionText = this.add.text(10, 40, 'Posición: (0, 0)', {
            font: '12px Arial',
            fill: '#ffffff',
            backgroundColor: '#1a1a1a',
            padding: { x: 8, y: 4 }
        });

        this.activeMissionsText = this.add.text(10, 70, 'Misiones Activas: 0', {
            font: '12px Arial',
            fill: '#ffff00',
            backgroundColor: '#1a1a1a',
            padding: { x: 8, y: 4 }
        });
    }

    update() {
        if (!this.gameScene || !this.gameScene.player) return;

        const dataManager = this.gameScene.dataManager;
        const player = this.gameScene.player;

        this.emotionalBalanceText.setText(
            `Equilibrio Emocional: ${dataManager.playerState.emotionalBalance}%`
        );

        const pos = player.getGridPosition();
        this.positionText.setText(`Posición: (${pos.x}, ${pos.y})`);

        this.activeMissionsText.setText(
            `Misiones Activas: ${dataManager.playerState.activeQuests.length}`
        );
    }
}

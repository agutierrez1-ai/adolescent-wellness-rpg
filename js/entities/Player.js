class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 32, y * 32, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setDrag(0.99);

        this.speed = 150;
        this.gridX = x;
        this.gridY = y;
        this.isMoving = false;

        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interact: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update() {
        this.handleInput();
    }

    handleInput() {
        let vx = 0;
        let vy = 0;

        if (this.keys.up.isDown) vy = -this.speed;
        if (this.keys.down.isDown) vy = this.speed;
        if (this.keys.left.isDown) vx = -this.speed;
        if (this.keys.right.isDown) vx = this.speed;

        this.setVelocity(vx, vy);

        this.gridX = Math.round(this.x / 32);
        this.gridY = Math.round(this.y / 32);
    }

    getGridPosition() {
        return { x: this.gridX, y: this.gridY };
    }
}

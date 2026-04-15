class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        console.log('🎮 GameScene iniciada');

        this.dataManager = new DataManager(this);
        this.npcManager = new NPCManager(this);
        this.missionManager = new MissionManager(this, this.dataManager);
        this.dialogueSystem = new DialogueSystem(this);

        this.createMap();

        this.player = new Player(this, 10, 10);

        this.physics.add.collider(this.player, this.npcManager.npcs);

        this.setupInput();

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 1024, 768);

        console.log('✓ GameScene lista');
    }

    createMap() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x2d5016, 1);
        graphics.fillRect(0, 0, 1024, 768);

        graphics.lineStyle(1, 0x1a3a0a, 0.3);
        for (let x = 0; x < 1024; x += 32) {
            graphics.lineBetween(x, 0, x, 768);
        }
        for (let y = 0; y < 768; y += 32) {
            graphics.lineBetween(0, y, 1024, y);
        }

        this.collisionLayer = this.physics.add.staticGroup();
    }

    setupInput() {
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.dialogueSystem.isActive) {
                this.dialogueSystem.nextLine();
            } else {
                const nearbyNPCs = this.npcManager.getNearbyNPCs(this.player, 80);
                if (nearbyNPCs.length > 0) {
                    this.npcManager.interactNPC(
                        nearbyNPCs[0],
                        this.dialogueSystem,
                        this.dataManager
                    );
                }
            }
        });

        this.input.keyboard.on('keydown-UP', () => {
            if (this.dialogueSystem.isActive) {
                const line = this.dialogueSystem.currentDialogue.lines[this.dialogueSystem.currentLineIndex];
                if (line.options) {
                    this.dialogueSystem.selectedOption = Math.max(0, this.dialogueSystem.selectedOption - 1);
                    this.dialogueSystem.showOptions(line.options);
                }
            }
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            if (this.dialogueSystem.isActive) {
                const line = this.dialogueSystem.currentDialogue.lines[this.dialogueSystem.currentLineIndex];
                if (line.options) {
                    this.dialogueSystem.selectedOption = Math.min(
                        line.options.length - 1,
                        this.dialogueSystem.selectedOption + 1
                    );
                    this.dialogueSystem.showOptions(line.options);
                }
            }
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            if (this.dialogueSystem.isActive) {
                const line = this.dialogueSystem.currentDialogue.lines[this.dialogueSystem.currentLineIndex];
                if (line.options) {
                    this.dialogueSystem.selectOption(this.dialogueSystem.selectedOption);
                }
            }
        });
    }

    update() {
        this.player.update();
    }
}

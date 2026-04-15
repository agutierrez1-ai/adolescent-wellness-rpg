class DataManager {
    constructor(scene) {
        this.scene = scene;
        this.npcs = scene.cache.json.get('npcs') || [];
        this.missions = scene.cache.json.get('missions') || [];
        this.dialogues = scene.cache.json.get('dialogues') || [];
        this.maps = scene.cache.json.get('maps') || [];
        
        this.playerState = {
            currentMap: 'zone_01_village',
            position: { x: 10, y: 10 },
            inventory: [],
            completedMissions: [],
            activeQuests: [],
            npcStatus: {},
            emotionalBalance: 100
        };

        this.initializeNPCStatus();
    }

    initializeNPCStatus() {
        this.npcs.forEach(npc => {
            this.playerState.npcStatus[npc.id] = {
                hasSpoken: false,
                relationshipLevel: 0,
                missionProgress: 0
            };
        });
    }

    getNPC(npcId) {
        return this.npcs.find(npc => npc.id === npcId);
    }

    getMission(missionId) {
        return this.missions.find(mission => mission.id === missionId);
    }

    getDialogue(dialogueId) {
        return this.dialogues.find(dialogue => dialogue.id === dialogueId);
    }

    addQuest(missionId) {
        if (!this.playerState.activeQuests.includes(missionId)) {
            this.playerState.activeQuests.push(missionId);
            console.log(`📋 Misión agregada: ${missionId}`);
        }
    }

    completeQuest(missionId) {
        this.playerState.completedMissions.push(missionId);
        this.playerState.activeQuests = this.playerState.activeQuests.filter(id => id !== missionId);
        console.log(`✓ Misión completada: ${missionId}`);
    }

    updateEmotionalBalance(value) {
        this.playerState.emotionalBalance = Phaser.Math.Clamp(
            this.playerState.emotionalBalance + value,
            0,
            100
        );
    }

    saveGame() {
        localStorage.setItem('gameState', JSON.stringify(this.playerState));
    }

    loadGame() {
        const saved = localStorage.getItem('gameState');
        if (saved) {
            this.playerState = JSON.parse(saved);
            console.log('✓ Juego cargado desde guardado');
        }
    }
}

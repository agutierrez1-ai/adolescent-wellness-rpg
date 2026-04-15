class NPCManager {
    constructor(scene) {
        this.scene = scene;
        this.npcs = scene.physics.add.staticGroup();
        this.npcData = scene.cache.json.get('npcs') || [];
        this.spawnedNPCs = new Map();

        this.loadNPCs();
    }

    loadNPCs() {
        this.npcData.forEach(npcConfig => {
            const npc = this.scene.add.sprite(
                npcConfig.position.x * 32,
                npcConfig.position.y * 32,
                'npc-base'
            );
            npc.setTint(npcConfig.tint || 0xffffff);
            npc.setData('id', npcConfig.id);
            npc.setData('name', npcConfig.name);
            npc.setData('initialDialogueId', npcConfig.initialDialogueId);
            npc.setData('zone', npcConfig.zone);

            this.npcs.add(npc);
            this.spawnedNPCs.set(npcConfig.id, npc);
            
            console.log(`✓ NPC cargado: ${npcConfig.name}`);
        });
    }

    getNPCById(npcId) {
        return this.spawnedNPCs.get(npcId);
    }

    getNearbyNPCs(player, distance = 64) {
        const playerPos = { x: player.x, y: player.y };
        return Array.from(this.spawnedNPCs.values()).filter(npc => {
            const dist = Phaser.Math.Distance.Between(
                playerPos.x, playerPos.y,
                npc.x, npc.y
            );
            return dist < distance;
        });
    }

    interactNPC(npc, dialogueSystem, dataManager) {
        const npcId = npc.getData('id');
        const initialDialogueId = npc.getData('initialDialogueId');
        const dialogue = dataManager.getDialogue(initialDialogueId);

        if (dialogue) {
            dialogueSystem.startDialogue(dialogue);
            dataManager.playerState.npcStatus[npcId].hasSpoken = true;
        }
    }
}

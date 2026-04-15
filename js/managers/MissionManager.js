class MissionManager {
    constructor(scene, dataManager) {
        this.scene = scene;
        this.dataManager = dataManager;
        this.activeMissions = new Map();
        this.completedMissions = new Set(dataManager.playerState.completedMissions);
    }

    activateMission(missionId) {
        const mission = this.dataManager.getMission(missionId);
        if (!mission || this.completedMissions.has(missionId)) {
            return false;
        }

        this.activeMissions.set(missionId, {
            id: missionId,
            progress: 0,
            startTime: this.scene.time.now
        });

        this.dataManager.addQuest(missionId);
        console.log(`📋 Misión iniciada: ${mission.title}`);
        return true;
    }

    completeMission(missionId) {
        const mission = this.dataManager.getMission(missionId);
        if (!mission) return false;

        this.completedMissions.add(missionId);
        this.activeMissions.delete(missionId);
        this.dataManager.completeQuest(missionId);

        if (mission.rewards) {
            if (mission.rewards.emotionalBalance) {
                this.dataManager.updateEmotionalBalance(mission.rewards.emotionalBalance);
            }
        }

        console.log(`✓ Misión completada: ${mission.title}`);
        return true;
    }

    updateMissionProgress(missionId, progress) {
        const active = this.activeMissions.get(missionId);
        if (active) {
            active.progress = progress;
        }
    }

    getActiveMissions() {
        return Array.from(this.activeMissions.values());
    }

    getMissionStatus(missionId) {
        if (this.completedMissions.has(missionId)) {
            return 'completed';
        }
        if (this.activeMissions.has(missionId)) {
            return 'active';
        }
        return 'available';
    }
}

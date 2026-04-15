class DialogueSystem {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.currentDialogue = null;
        this.currentLineIndex = 0;
        this.selectedOption = 0;

        this.dialogueBox = this.createDialogueBox();
        this.dialogueBox.setVisible(false);
    }

    createDialogueBox() {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x1a1a1a, 0.95);
        graphics.fillRect(50, 550, 924, 200);
        graphics.lineStyle(2, 0xffffff);
        graphics.strokeRect(50, 550, 924, 200);

        const textConfig = {
            font: '16px Arial',
            fill: '#ffffff',
            wordWrap: { width: 880 },
            align: 'left'
        };

        graphics.text = this.scene.add.text(70, 570, '', textConfig);
        graphics.nameText = this.scene.add.text(70, 555, '', {
            font: 'bold 18px Arial',
            fill: '#00ff00'
        });

        graphics.optionsContainer = this.scene.add.container(70, 650);
        graphics.optionsContainer.setVisible(false);

        return graphics;
    }

    startDialogue(dialogueData) {
        this.currentDialogue = dialogueData;
        this.currentLineIndex = 0;
        this.isActive = true;
        this.selectedOption = 0;
        this.dialogueBox.setVisible(true);
        this.showLine();
    }

    showLine() {
        if (!this.currentDialogue) return;

        const lines = this.currentDialogue.lines;
        if (this.currentLineIndex >= lines.length) {
            this.endDialogue();
            return;
        }

        const line = lines[this.currentLineIndex];
        this.dialogueBox.nameText.setText(line.speaker || 'NPC');
        this.dialogueBox.text.setText(line.text);

        if (line.options) {
            this.showOptions(line.options);
        } else {
            this.dialogueBox.optionsContainer.setVisible(false);
        }
    }

    showOptions(options) {
        this.dialogueBox.optionsContainer.removeAll(true);
        this.dialogueBox.optionsContainer.setVisible(true);

        options.forEach((option, index) => {
            const optionText = this.scene.add.text(0, index * 30, `> ${option.text}`, {
                font: '14px Arial',
                fill: index === this.selectedOption ? '#ffff00' : '#ffffff'
            });
            this.dialogueBox.optionsContainer.add(optionText);
        });
    }

    selectOption(index) {
        const line = this.currentDialogue.lines[this.currentLineIndex];
        if (line.options && line.options[index]) {
            const option = line.options[index];
            this.currentLineIndex = option.nextLineIndex;
            this.showLine();

            if (option.callback) {
                option.callback();
            }
        }
    }

    nextLine() {
        const line = this.currentDialogue.lines[this.currentLineIndex];

        if (line.options) {
            this.selectOption(this.selectedOption);
        } else {
            this.currentLineIndex++;
            this.showLine();
        }
    }

    endDialogue() {
        this.isActive = false;
        this.dialogueBox.setVisible(false);
        this.currentDialogue = null;
    }
}

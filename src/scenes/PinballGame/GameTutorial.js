export default class GameTutorial{
    constructor(scene,text){
        this.scene = scene
        this.text = text
    }

    create(){
        let startGameLabel = this.scene.add.image(180,325,'startGameLabel').setScale(0.52,0.52).setDepth(29);
        let startGameButton = this.scene.add.image(180,550,'startGameButton').setScale(0.4,0.4).setDepth(29);

        const style = {
            fontSize: this.text.text.size,
            fill: "#000",
            wordWrap: { width: 280, useAdvancedWrap: true }
        }
        let description = this.scene.add.text(50, 80, "\n"+ this.text.text.content, style).setDepth(30)

        startGameButton.setInteractive().on('pointerdown',function(){
            this.scene.isGameStart = true;
            this.scene.startGame();

            startGameLabel.destroy()
            startGameButton.destroy()
            description.destroy()
            startGameLabel = null;
            startGameButton = null;
        },this)
    }

}
export default class GameTutorial{
    constructor(scene){
        this.scene = scene
        // this.balloons = balloons
        // this.text = text
        // console.log(text);

    }
    //.setScale(this.balloons[type-1].img.size/100)
    create(){
        let startGameLabel = this.scene.add.image(180,325,'startGameLabel').setScale(0.52,0.52).setDepth(2);
        let startGameButton = this.scene.add.image(180,550,'startGameButton').setScale(0.4,0.4).setDepth(2);

        // const style = {
        //     fontSize: 24,
        //     fill: "#000",
        //     wordWrap: { width: 280, useAdvancedWrap: true }
        // }
        // let description = this.scene.add.text(50, 80, "\n"+ this.text.text.content, style).setDepth(3)

        startGameButton.setInteractive().on('pointerdown',function(){
            // console.log('startGame!')
            this.scene.isGameStart = true;
            this.scene.startGame();

            startGameLabel.destroy()
            startGameButton.destroy()
            // description.destroy()
            startGameLabel = null;
            startGameButton = null;
        },this)
    }

}
export default class GameoverMessage{
    constructor(scene,items,gameoverMessage){
        this.scene = scene
        this.items = items 
        this.gameoverMessage = gameoverMessage
    }

    create(){
        let gameoverLabel = this.scene.add.image(180,325,'gameoverLabel').setScale(0.52,0.52).setDepth(29);
        let playAgainButton = this.scene.add.image(180,550,'playAgainButton').setScale(0.4,0.4).setDepth(29);
        const scoreTextStyle = {
            fontSize: 26,
            fill: "#000",
            wordWrap: { width: 320, useAdvancedWrap: true }
        }

        let scoreText = this.scene.add.text(50,80,"\n  你獲得了：", scoreTextStyle).setDepth(29);

        let getItemArr = []
        for(let i=0;i< this.items.length;i++){
            getItemArr.push(this.scene.add.image(255,210 + (i * 105), this.items[i].key).setScale(this.items[i].size/100).setDepth(29));
        }

        const style = {
            fontSize: this.gameoverMessage[0].text.size,
            fill: "#000",
            wordWrap: { width: 280, useAdvancedWrap: true }
        }
        let description = this.scene.add.text(50, 150, "\n"+ this.gameoverMessage[0].text.content, style).setDepth(29)
        
        playAgainButton.setInteractive().on('pointerdown',function(){
            scoreText.destroy()
            gameoverLabel.destroy()
            playAgainButton.destroy()
            this.scene.scene.restart()
        },this)
    }
} 


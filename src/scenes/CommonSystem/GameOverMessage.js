export default class GameoverMessage{
    constructor(scene,score){
        this.scene = scene
        this.score = score
    }

    create(){
        let gameoverLabel = this.scene.add.image(180,325,'gameoverLabel').setScale(0.52,0.52).setDepth(2);
        let playAgainButton = this.scene.add.image(180,550,'playAgainButton').setScale(0.4,0.4).setDepth(2);
        let scoreText = this.scene.add.text(65,105,"\n你的得分是：" + this.score,{fontSize:'24px', fill:'#000'}).setDepth(2);

        playAgainButton.setInteractive().on('pointerdown',function(){
            // console.log('game restart')
            scoreText.destroy()
            gameoverLabel.destroy()
            playAgainButton.destroy()
            this.scene.scene.restart()
        },this)
    }
} 


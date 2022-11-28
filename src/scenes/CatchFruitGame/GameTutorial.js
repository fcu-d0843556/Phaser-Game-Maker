export default class GameTutorial{
    constructor(scene,stars ,text){
        this.scene = scene
        this.stars = stars
        this.text = text
    }

    create(){
        let startGameLabel = this.scene.add.image(180,325,'startGameLabel').setScale(0.52,0.52).setDepth(29);
        let startGameButton = this.scene.add.image(180,550,'startGameButton').setScale(0.4,0.4).setDepth(29);

        let starArr = []
        let scoreTextArr = []
        for(let i=1;i< 3;i++){
            starArr.push(this.scene.add.image(85,310 + (i * 65),'star' + i).setScale(this.stars[i - 1].img.size/100).setDepth(30));
            scoreTextArr.push(this.scene.add.text(200,300 + (i * 65), this.stars[i - 1].score.content, {
                "fontSize": 24,
                "fill": "#000"
            }).setDepth(30))
        }

        const style = {
            fontSize: this.text.text.size,
            fill: "#000",
            wordWrap: { width: 280, useAdvancedWrap: true }
        }
        let description = this.scene.add.text(50, 80, "\n"+ this.text.text.content, style).setDepth(30)
        let scoreText = this.scene.add.text(50,280, '\n得分:', style).setDepth(30)
        startGameButton.setInteractive().on('pointerdown',function(){
            this.scene.isGameStart = true;
            this.scene.startGame();

            for(let i=0;i< 2;i++){
                starArr[i].destroy()
                scoreTextArr[i].destroy()
            }
            starArr = null
            scoreTextArr = null

            startGameLabel.destroy()
            startGameButton.destroy()
            description.destroy()
            scoreText.destroy()

            scoreText = null;
            startGameLabel = null;
            startGameButton = null;
        },this)
    }

}
export default class GameTutorial{
    constructor(scene, food, text){
        this.scene = scene
        this.food = food
        this.text = text

    }

    create(){
        let startGameLabel = this.scene.add.image(180,325,'startGameLabel').setScale(0.52,0.52).setDepth(5);
        let startGameButton = this.scene.add.image(180,550,'startGameButton').setScale(0.4,0.4).setDepth(5);

        let foodArr = []
        let scoreTextArr = []
        // for(let i=1;i< 5;i++){
        let scoreTextStyle = {
            "fontSize": 24,
            "fill": "#000"
        }

        foodArr.push(this.scene.add.image(75,405, this.food[1].name).setScale(this.food[1].img.size/100).setDepth(6));
        foodArr.push(this.scene.add.image(225,405, this.food[1].name).setScale(this.food[1].img.size/100).setDepth(6).setTint(0xe3c0ad));

        foodArr.push(this.scene.add.image(225,470, this.food[3].name).setScale(this.food[3].img.size/100).setDepth(6).setTint(0x5C4033));
        foodArr.push(this.scene.add.image(75,470, this.food[3].name).setScale(this.food[3].img.size/100).setDepth(6));

        scoreTextArr.push(this.scene.add.text(115,395, this.food[1].score.content, scoreTextStyle).setDepth(6))
        scoreTextArr.push(this.scene.add.text(115,460, this.food[3].score.content, scoreTextStyle).setDepth(6))
        scoreTextArr.push(this.scene.add.text(255,460, this.food[4].score.content, scoreTextStyle).setDepth(6))
        scoreTextArr.push(this.scene.add.text(255,395, this.food[2].score.content, scoreTextStyle).setDepth(6))
           

        const style = {
            fontSize: this.text.text.size,
            fill: "#000",
            wordWrap: { width: 280, useAdvancedWrap: true }
        }
        let description = this.scene.add.text(50, 80, "\n"+ this.text.text.content, style).setDepth(6)

        startGameButton.setInteractive().on('pointerdown',function(){
            // console.log('startGame!')
            this.scene.isGameStart = true;
            this.scene.startGame();
            for(let i=0;i< 4;i++){
                foodArr[i].destroy()
                scoreTextArr[i].destroy()
            }
            foodArr = null
            scoreTextArr = null
            startGameLabel.destroy()
            startGameButton.destroy()
            description.destroy()
            startGameLabel = null;
            startGameButton = null;
        },this)
    }

}
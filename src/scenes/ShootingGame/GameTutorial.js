export default class GameTutorial{
    constructor(scene, balloons){
        this.scene = scene
        this.balloons = balloons
        console.log(balloons);

    }
    //.setScale(this.balloons[type-1].img.size/100)
    create(){
        let startGameLabel = this.scene.add.image(180,325,'startGameLabel').setScale(0.52,0.52).setDepth(2);
        let startGameButton = this.scene.add.image(180,550,'startGameButton').setScale(0.4,0.4).setDepth(2);

        let balloonArr = []
        let scoreTextArr = []
        for(let i=1;i< 6;i++){
            balloonArr.push(this.scene.add.image(85,130 + (i * 65),'balloon' + i).setScale(this.balloons[i - 1].img.size/100).setDepth(3));
            scoreTextArr.push(this.scene.add.text(200,120 + (i * 65), this.balloons[i - 1].score.content, {
                "fontSize": 24,
                "fill": "#000",
            }).setDepth(3))
        }

        let description = this.scene.add.text(50, 80, "\n在時間內打到越多的氣球!", {
            "fontSize": 24,
            "fill": "#000",
        }).setDepth(3)


        startGameButton.setInteractive().on('pointerdown',function(){
            // console.log('startGame!')
            console.log(this.scene);
            this.scene.isGameStart = true;
            this.scene.startGame();
            for(let i=0;i< 5;i++){
                balloonArr[i].destroy()
                scoreTextArr[i].destroy()
            }
            // balloonArr = null
            startGameLabel.destroy()
            startGameButton.destroy()
            description.destroy()
            // startGameLabel = null;
            // startGameButton = null;
        },this)
    }

}
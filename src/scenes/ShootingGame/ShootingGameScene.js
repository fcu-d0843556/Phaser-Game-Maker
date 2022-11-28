import Phaser from "phaser"

//Common System Scripts
import GameTimer from "../CommonSystem/GameTimer"
import Score from "../CommonSystem/Score"
import DropTimeCounter from "../CommonSystem/DropTimeCounter"
import GameoverMessage from "../CommonSystem/GameOverMessage"

//Shooting Game Scripts
import GameTutorial from "./GameTutorial"
import ballonSpawner from "./BallonSpawner"

export default class ShootingGameScene extends Phaser.Scene{
    constructor(){    
        super("Shooting")
        this.scoreText = undefined
        this.isGameStart = false
    }


    preload(){

        this.modifyDatas = this.scene.settings.data
        // console.log("modifyDatas : ", this.modifyDatas)

        //load image
        Object.keys(this.modifyDatas).forEach((key)=>{
            this.modifyDatas[key].items.forEach((itemObj)=>{
                if( itemObj.img ) {
                    if(this.textures.list[itemObj.name]){
                        this.textures.remove(itemObj.name)
                    }
                    this.load.image( itemObj.name, itemObj.img.src )
                }
            })
        })

        this.load.image('startGameLabel','/img/Games/Common/gameover/startGameLabel.png')
        this.load.image('startGameButton', '/img/Games/Common/gameover/startGameButton.png')
        this.load.image('gameoverLabel','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgainButton', '/img/Games/Common/gameover/playAgainButton.png')


        this.load.image('gun','/img/Games/ShootingGame/gun.png')
        this.load.image('target','/img/Games/ShootingGame/target.png')
        this.load.image('hitbox','/img/Games/ShootingGame/target.png')

    }

    startGame = () => {
        //create score board
        this.createScoreBoard()
        this.scoreText.showScoreText()
        
        //Balloons custom OK.
        const {balloon,balloonSpeed} = this.modifyDatas
        this.balloon = new ballonSpawner(this,this.scoreText, balloon.items, balloonSpeed.items[0]) 

        //Ballon Timer
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.createBalloon.bind(this),500)//5s

        // timeText,gameTimer custom OK.
        const {gameTimer} = this.modifyDatas
        this.createGameTimer(gameTimer.items[0])
    }

    create(){
        
        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)


        this.cursor = this.input.keyboard.createCursorKeys()
        this.add.image(170,550,'gun').setScale(0.21,0.21).setDepth(1);

        
        

        //gameStart Tutorial
        const {balloon,gameTutorialText} = this.modifyDatas
        this.gameTutorialMessage = new GameTutorial(this, balloon.items, gameTutorialText.items[0])
        this.gameTutorialMessage.create()

    }

    gameover(){
        const {gameoverMessage} = this.modifyDatas
        this.physics.pause()
        this.starCoolDown.stop()
        this.gameoverMessage = new GameoverMessage(this,this.scoreText.getScore(),gameoverMessage.items[0])
        this.gameoverMessage.create()
    }

    createGameTimer(gameTimer){
        //Timer
        const style = {
            fontSize: 32,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2
        }
        const gameTimerLabel = this.add.text(16, 34, "時間", style).setDepth(20)
        this.gameTimer = new GameTimer(this, gameTimerLabel, "\n時間")
        this.gameTimer.start(this.gameover.bind(this),gameTimer.text.content * 1000)//5s
    }

    createScoreBoard(){
        //Score
        const scoreTextLabel = this.add.text(16,-10, "", {
            "fontSize": 32,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        }).setDepth(20)
        this.scoreText = new Score(this,scoreTextLabel,"\n分數",0)
    }

    createBalloon(){
        this.balloon.spawn()
    }

    update(){
        if(this.isGameStart){
            this.gameTimer.update()
        }
    }

}
import Phaser from "phaser"

//Common System Scripts
// import GetMouseSpot from "../CommonSystem/GetMouseSpot"
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
        this.allJsonData = []
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
                        // console.log("remove");
                        this.textures.remove(itemObj.name)
                    }
                    // console.log("add", itemObj);
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
        this.scoreText.showScoreText()
        

        //Ballon Timer
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.createBalloon.bind(this),500)//5s

        //timeText,gameTimer custom OK.
        const {timeText,gameTimer} = this.modifyDatas
        this.createGameTimer(timeText.items[0] ,gameTimer.items[0])
    }

    create(){
        
        //background custom OK.
        const {background} = this.modifyDatas
        // this.add.image(400,320 ,'background').setScale(1)

        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)


        this.cursor = this.input.keyboard.createCursorKeys()
        this.add.image(170,550,'gun').setScale(0.21,0.21).setDepth(1);
        
        //create score
        this.createScoreBoard()
        
        

        
        //Balloons custom OK.
        const {balloon,balloonSpeed} = this.modifyDatas
        this.balloon = new ballonSpawner(this,this.scoreText, balloon.items, balloonSpeed.items[0]) 

        //gameStart Tutorial
        this.gameTutorialMessage = new GameTutorial(this, balloon.items)
        this.gameTutorialMessage.create()

        //mouse move
        this.createMouseTracker()
    }

    gameover(){
        this.physics.pause()
        this.starCoolDown.stop()
        this.gameOver = true
        let gameoverMessage = new GameoverMessage(this,this.scoreText.getScore())
        gameoverMessage.create()
    }

    createGameTimer(timeTextDatas,gameTimer){
        //Timer
        const gameTimerLabel = this.add.text(16, 54, "時間", {
            "fontSize": 32,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })
        // const gameTimerLabel = this.add.text(timeTextDatas.text.x, timeTextDatas.text.y, timeTextDatas.text.content, timeTextDatas.text.style)
        this.gameTimer = new GameTimer(this, gameTimerLabel, timeTextDatas.text.content)
        this.gameTimer.start(this.gameover.bind(this),gameTimer.text.content * 1000)//5s
    }

    createScoreBoard(){
        //Score
        const scoreTextLabel = this.add.text(16,16, "", {
            "fontSize": 32,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })
        this.scoreText = new Score(this,scoreTextLabel,"分數",0)
        
    }

    createBalloon(){

        this.balloon.spawn()
    }

    createMouseTracker(){
        this.target = this.physics.add.sprite(400,500,'target').setScale(0.8,0.8)
        this.target.setGravityY(0)

        this.input.on('pointermove',function(pointer){
            // this.mouseSpot.get(pointer)
            this.target.x = pointer.x
            this.target.y = pointer.y
        },this)


        // const moveSpotLabel = this.add.text(10,580,'moveSpot: ',{fontSize:12,fill:'#000'}).setDepth(1)
        // this.mouseSpot = new GetMouseSpot(this,moveSpotLabel)  


        

        // const clickSpotLabel = this.add.text(10,600,'clickSpot: ',{fontSize:12,fill:'#000'}).setDepth(1);
        // this.clickMouseSpot = new GetMouseSpot(this,clickSpotLabel)

        // this.input.on('pointerdown',function(pointer){
            // this.clickMouseSpot.get(pointer)
            
        // },this)
    }

    update(){
        if(this.isGameStart){
            this.gameTimer.update()
        }
    }

}
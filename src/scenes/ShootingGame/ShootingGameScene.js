import Phaser from "phaser"


import GetMouseSpot from "../CommonSystem/GetMouseSpot"
import GameTimer from "../CommonSystem/GameTimer"
import Score from "../CommonSystem/Score"
import DropTimeCounter from "../CommonSystem/DropTimeCounter"
import GameoverMessage from "../CommonSystem/GameOverMessage"

import ballonSpawner from "./BallonSpawner"

export default class ShootingGameScene extends Phaser.Scene{
    constructor(){    
        super("Shooting")
        this.allJsonData = []
        this.scoreText = undefined

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
                    this.load.image( itemObj.name, itemObj.img.src )
                }
            })
        })

        
        this.load.image('gun','/img/Games/ShootingGame/gun.png')
        this.load.image('target','/img/Games/ShootingGame/target.png')
        this.load.image('hitbox','/img/Games/ShootingGame/target.png')
        this.load.image('gameover','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgain', '/img/Games/Common/gameover/playAgainButton.png')

        // this.load.image('background','/img/Games/Common/background.png')
        // this.load.image('balloon1', '/img/Games/ShootingGame/balloon1.png')
        // this.load.image('balloon2', '/img/Games/ShootingGame/balloon2.png')
        // this.load.image('balloon3', '/img/Games/ShootingGame/balloon3.png')
        // this.load.image('balloon4', '/img/Games/ShootingGame/balloon4.png')
        // this.load.image('balloon5', '/img/Games/ShootingGame/balloon5.png')

    }

    create(){
        
        //background custom OK.
        const {background} = this.modifyDatas
        // this.add.image(400,320 ,'background').setScale(1)

        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)


        this.cursor = this.input.keyboard.createCursorKeys()
        this.add.image(170,550,'gun').setScale(0.21,0.21).setDepth(1);


        //timeText,gameTimer custom OK.
        const {timeText,gameTimer} = this.modifyDatas
        this.createGameTimer(timeText.items[0] ,gameTimer.items[0])
        

        this.createScoreBoard()
        

        //Balloons custom OK.
        const {balloon,balloonSpeed} = this.modifyDatas
        this.balloon = new ballonSpawner(this,this.scoreText, balloon.items, balloonSpeed.items[0]) 

        //Ballon Timer
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.createBalloon.bind(this),500)//5s

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
        const gameTimerLabel = this.add.text(16, 54, "time", {
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
        const scoreTextLabel = this.add.text(16,16, "score", {
            "fontSize": 32,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })
        this.scoreText = new Score(this,scoreTextLabel,"score",0)
        this.scoreText.showScoreText()
    }

    createBalloon(){

        this.balloon.spawn()
    }

    createMouseTracker(){


        this.target = this.physics.add.sprite(400,500,'target').setScale(0.8,0.8)
        this.target.setGravityY(0)

        const moveSpotLabel = this.add.text(10,580,'moveSpot: ',{fontSize:12,fill:'#000'}).setDepth(1)
        this.mouseSpot = new GetMouseSpot(this,moveSpotLabel)  
        this.input.on('pointermove',function(pointer){
            // this.mouseSpot.get(pointer)
            this.target.x = pointer.x
            this.target.y = pointer.y
        },this)

        const clickSpotLabel = this.add.text(10,600,'clickSpot: ',{fontSize:12,fill:'#000'}).setDepth(1);
        this.clickMouseSpot = new GetMouseSpot(this,clickSpotLabel)

        this.input.on('pointerdown',function(pointer){
            // this.clickMouseSpot.get(pointer)
            
        },this)
    }

    update(){
        this.gameTimer.update()
    }

}
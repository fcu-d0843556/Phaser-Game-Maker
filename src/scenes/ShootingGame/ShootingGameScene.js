import Phaser from "phaser"


import GetMouseSpot from "../CommonSystem/GetMouseSpot"
import GameTimer from "../CommonSystem/GameTimer"
import Score from "../CommonSystem/Score"
import DropTimeCounter from "../CommonSystem/DropTimeCounter"
import GameoverMessage from "../CommonSystem/GameOverMessage"

import ballonSpawner from "./BallonSpawner"

export default class ShootingGameScene extends Phaser.Scene{
    constructor(userID,appSpot){    
        super("Shooting")
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot
        this.scoreText = undefined

    }


    preload(){
        this.jsonData = this.cache.json.get('jsonData');
        console.log("find jsonData")
        console.log(this.jsonData)

        this.load.image('gun','/img/Games/ShootingGame/gun.png')
        this.load.image('target','/img/Games/ShootingGame/target.png')
        this.load.image('hitbox','/img/Games/ShootingGame/target.png')
        this.load.image('gameover','/img/Games/ShootingGame/gameover/gameoverLabel.png')
        this.load.image('playAgain', '/img/Games/ShootingGame/gameover/playAgainButton.png')

        this.load.image('background','/img/Games/background.png')

        this.load.image('balloon1', '/img/Games/ShootingGame/balloon1.png')
        this.load.image('balloon2', '/img/Games/ShootingGame/balloon2.png')
        this.load.image('balloon3', '/img/Games/ShootingGame/balloon3.png')
        this.load.image('balloon4', '/img/Games/ShootingGame/balloon4.png')
        this.load.image('balloon5', '/img/Games/ShootingGame/balloon5.png')

        // const items = this.jsonData.items
        // console.log("all items = ")
        // console.log(items)

        // for(let t=0; t<items.length; t++){
        //     if(items[t].items){
        //         for(let s=0; s<items[t].items.length; s++){
        //             this.load.image(items[t].items[s].name, this.appSpot + items[t].items[s].src)
        //         }
        //         this.allJsonData[items[t].name] = items[t]
        //     }else{
        //         if(items[t].src){
        //             this.load.image(items[t].name, this.appSpot + items[t].src)
        //         }
        //         this.allJsonData[items[t].name] = items[t]
        //     }
            
        // }

        // console.log("all allJsonData = ")
        // console.log(this.allJsonData)
    }

    create(){
        this.add.image(400,320 ,'background').setScale(1)

        this.cursor = this.input.keyboard.createCursorKeys()
        this.add.image(170,550,'gun').setScale(0.21,0.21).setDepth(1);

        //Timer
        const timerLabel2 = this.add.text(16, 54, "time", {
            "fontSize": 32,
            "fill": "#000"
        })
        this.gameTimer = new GameTimer(this,timerLabel2,"time")
        this.gameTimer.start(this.gameover.bind(this),10000)//5s

        //Score
        const scoreTextLabel = this.add.text(16,16, "score", {
            "fontSize": 32,
            "fill": "#000"
        })
        this.scoreText = new Score(this,scoreTextLabel,"score",0)
        this.scoreText.showScoreText()

        this.allJsonData.balloon = {
            items: [{
                modifyTitle: "氣 球 1",
                name: "balloon1",
                text: "祝你天天開心！",
                src: "/img/Games/ShootingGame/balloon1.png",
                size: 55
            }, {
                modifyTitle: "氣 球 2",
                name: "balloon2",
                text: "祝你事事順利！",
                src: "/img/Games/ShootingGame/balloon2.png",
                size: 55
            }, {
                modifyTitle: "氣 球 3",
                name: "balloon3",
                text: "祝你身體健康！",
                src: "/img/Games/ShootingGame/balloon3.png",
                size: 55
            }, {
                modifyTitle: "氣 球 4",
                name: "balloon4",
                text: "永遠愛你！",
                src: "/img/Games/ShootingGame/balloon4.png",
                size: 55
            }, {
                modifyTitle: "氣 球 5",
                name: "balloon5",
                text: "（づ￣3￣）づ╭❤～",
                src: "/img/Games/ShootingGame/balloon5.png",
                size: 55
            }]
        }
        this.balloon = new ballonSpawner(this,this.scoreText,this.allJsonData.balloon) 

        //Ballon Timer
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.createBalloon.bind(this),500)//5s
 

        // const moveSpotLabel = this.add.text(10,580,'moveSpot: ',{fontSize:12,fill:'#000'})




        this.target = this.physics.add.sprite(400,500,'target').setScale(0.8,0.8)
        this.target.setGravityY(0)


        this.mouseSpot = new GetMouseSpot(this,"")  
        this.input.on('pointermove',function(pointer){
            this.mouseSpot.get(pointer)
            this.target.x = pointer.x
            this.target.y = pointer.y
            this.clickMouseSpot.get(pointer)
        },this)


        // const clickSpotLabel = this.add.text(10,600,'clickSpot: ',{fontSize:12,fill:'#000'}).setDepth(1);
        this.clickMouseSpot = new GetMouseSpot(this,"")

        this.input.on('pointerdown',function(pointer){
            this.clickMouseSpot.get(pointer)
            
        },this)

    }

    gameover(){
        this.physics.pause()
        this.gameOver = true
        let gameoverMessage = new GameoverMessage(this,this.scoreText.getScore())
        gameoverMessage.create()
    }

    createBalloon(){
        this.balloon.spawn()
    }

    update(){
        this.gameTimer.update()
    }

}
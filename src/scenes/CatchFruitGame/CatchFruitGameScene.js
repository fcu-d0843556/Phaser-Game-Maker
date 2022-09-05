import Phaser, { Math } from "phaser"


import Score from "../CommonSystem/Score"
import ShowMessage from "../CommonSystem/ShowMessage"
import DropTimeCounter from "../CommonSystem/DropTimeCounter"
import GameTimer from "../CommonSystem/GameTimer"
import GameoverMessage from "../CommonSystem/GameOverMessage"

import StarsSpawner from "./StarsSpawner"
import BombSpawner from "./BombSpawner"


const BombKey = 'bomb'
const StarKey = 'star'


export default class CatchFruitGameScene extends Phaser.Scene{


    constructor(userID,appSpot){
        super("CatchFruit")
        this.userID = userID
        this.appSpot = appSpot

        // this.player = undefined
        // this.cursor = undefined
        // this.stars = undefined
        // this.scoreText = undefined
        // this.bombsGroup = undefined
        // this.starsGroup = undefined
        // this.gameOver = false
        this.playerMoveSpeed = 400
        this.allJsonData = []

    }

    preload(){
        // this.jsonData = this.cache.json.get('jsonData');
        // console.log("find jsonData")
        // console.log(this.jsonData)

        this.load.image('ground', '/img/Games/CatchFruitGame/platform.png');
        this.load.image('bomb','/img/Games/CatchFruitGame/bomb.png');
        this.load.image('star','/img/Games/CatchFruitGame/star.png');
        this.load.image('arrowButton','/img/Games/CatchFruitGame/arrowButton.png');

        this.load.image('gameover','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgain', '/img/Games/Common/gameover/playAgainButton.png')

        this.load.image('background','/img/Games/Common/background.png')


        this.load.spritesheet('dude','/img/Games/CatchFruitGame/dude.png',{
            frameWidth: 32, frameHeight:48
        });


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
        // this.add.image(this.allJsonData.background.position.x, this.allJsonData.background.position.y ,'background').setScale(this.allJsonData.background.size/100)
        this.add.image(400,320 ,'background').setScale(1)


        this.platforms = this.createPlatform()
        this.player = this.createPlayer()
        this.cursor = this.input.keyboard.createCursorKeys()
        this.starsSpawner = new StarsSpawner(this,"star",{size: 100})
        this.starsGroup = this.starsSpawner.group
        this.bombSpawner = new BombSpawner(this,BombKey)
        this.bombsGroup = this.bombSpawner.groupA

        this.starsSpawner.spawn()

        const timerLabel2 = this.add.text(16, 54, "time", {
            "fontSize": 32,
            "fill": "#000"
        })
        this.gameTimer = new GameTimer(this,timerLabel2,"time")
        this.gameTimer.start(this.gameover.bind(this),3000)//5s

        
        const scoreTextLabel = this.add.text(16,16, "score", {
            "fontSize": 32,
            "fill": "#000"
        })
        this.scoreText = new Score(this,scoreTextLabel,"score",0)
        this.scoreText.showScoreText()

        /* related to collider between objects */
        this.physics.add.collider(this.player,this.platforms)
        this.physics.add.overlap(this.player, this.starsGroup, this.collectStar,null,this)
        this.physics.add.collider(this.platforms, this.starsGroup,this.disableBody,null,this)
        this.physics.add.collider(this.platforms, this.bombsGroup, this.hitBomb,null,this)
        this.physics.add.collider(this.player, this.bombsGroup, this.hitBomb, null, this)

        /* related to time*/
        // const timerLabel = this.add.text(16, 90, 'timeLabel : ', {fontSize:32,fill:'#000'})
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.handleCountDownFinished.bind(this),500)//5s


        // related to button
        this.leftButton = this.physics.add.sprite(70,500,'arrowButton')
        this.leftButton.alpha = 0.3
        this.rightButton = this.physics.add.sprite(300,500,'arrowButton').setFlipX(true);
        this.rightButton.alpha = 0.3

        this.leftButton.setInteractive({ draggable: true })
            .on('dragstart', function(pointer, dragX, dragY){
                this.isMousePress = true
                this.player.setVelocityX(this.playerMoveSpeed * -1)
            }, this)
            .on('drag', function(pointer, dragX, dragY){

                this.player.setVelocityX(this.playerMoveSpeed * -1)
            }, this)
            .on('dragend', function(pointer, dragX, dragY, dropped){
                this.isMousePress = false
                this.player.setVelocityX(0)
            }, this);

        this.rightButton.setInteractive({ draggable: true })
            .on('dragstart', function(pointer, dragX, dragY){
                this.isMousePress = true
                this.player.setVelocityX(this.playerMoveSpeed)
            }, this)
            .on('drag', function(pointer, dragX, dragY){
                this.player.setVelocityX(this.playerMoveSpeed)
            }, this)
            .on('dragend', function(pointer, dragX, dragY, dropped){
                this.isMousePress = false
                this.player.setVelocityX(0)
            }, this);
    }

    handleCountDownFinished(){
        this.starsSpawner.spawn()
    }

    gameover(){
        this.physics.pause()
        this.starCoolDown.stop()
        this.player.setTint(0xff0000)
        this.player.anims.play('stop')
        this.gameOver = true

        let gameoverMessage = new GameoverMessage(this,this.scoreText.getScore())
        gameoverMessage.create()
    }

    disableBody(hit,disablePart){   //碰撞後決定消失的物件（右邊）
        disablePart.disableBody(true,true)
    }

    hitBomb(player,bomb){
        // bomb.disableBody(true,true)
    }

    collectStar(player,star){
        star.disableBody(true,true)
        // const timerLabel = this.add.text(16, 90, 'timeLabel : ', {fontSize:32,fill:'#000'})
        this.getItemMessage = new ShowMessage(this,"Happy!")
        this.getItemMessage.start(this.getItemMessage.stop(),500)//5s
        this.scoreText.addScore(10)
    }

    createPlatform(){
        const platforms = this.physics.add.staticGroup()
        platforms.create(400,568,'ground').setScale(2).refreshBody()
        platforms.create(400,620,'ground').setScale(2).refreshBody()

        return platforms
    }

    createPlayer(){
        const player = this.physics.add.sprite(180,515,'dude')
        player.setCollideWorldBounds(true)
        this.anims.create({
            key: 'goLeft',
            frames: this.anims.generateFrameNumbers('dude',{ start: 0,end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'goRight',
            frames: this.anims.generateFrameNumbers('dude',{ start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'stop',
            frames: [{key:'dude', frame:4}],
            frameRate: 20
        })
        return player
    }

    update(){
        if(this.gameOver == true){
            return
        }

        if(this.cursor.left.isDown){
            this.player.setVelocityX(this.playerMoveSpeed * -1)
            this.player.anims.play('goLeft',true)
        }else if(this.cursor.right.isDown){
            this.player.setVelocityX(this.playerMoveSpeed)
            this.player.anims.play('goRight',true)
        }else if(!this.isMousePress){
            this.player.setVelocityX(0)
            this.player.anims.play('stop',true)
        }

        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-120)
        }

        this.starCoolDown.update()
        this.gameTimer.update()
    }
}


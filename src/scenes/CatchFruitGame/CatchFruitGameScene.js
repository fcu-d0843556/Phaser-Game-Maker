import Phaser from "phaser"

//Common System Scripts
import Score from "../CommonSystem/Score"
import ShowMessage from "../CommonSystem/ShowMessage"
import DropTimeCounter from "../CommonSystem/DropTimeCounter"
import GameTimer from "../CommonSystem/GameTimer"
import GameoverMessage from "../CommonSystem/GameOverMessage"

//CatchFruit Game Scripts
import StarsSpawner from "./StarsSpawner"
import GameTutorial from "./GameTutorial"


export default class CatchFruitGameScene extends Phaser.Scene{


    constructor(){
        super("CatchFruit")
    }

    preload(){
        this.modifyDatas = this.scene.settings.data
        // console.log(this.modifyDatas);
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


        this.load.image('ground', '/img/Games/CatchFruitGame/platform.png');
        this.load.image('arrowButton','/img/Games/CatchFruitGame/arrowButton.png');

        this.load.spritesheet('dude','/img/Games/CatchFruitGame/dude.png',{
            frameWidth: 32, frameHeight:48
        });
    }

    startGame = () => {
        //create score board
        this.scoreText.showScoreText()
    
        //星星落下的時間間隔
        this.starCoolDown = new DropTimeCounter(this,"")
        this.starCoolDown.start(this.handleCountDownFinished.bind(this),500)//5s

        // 遊戲時間 timeText,gameTimer custom OK.
        const {gameTimer} = this.modifyDatas
        this.createGameTimer(gameTimer.items[0])
    }

    createGameTimer(gameTimer){
        //Timer
        const style = {
            fontSize: 32,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2
        }
        const gameTimerLabel = this.add.text(16, 34, "時間", style)
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
        })
        this.scoreText = new Score(this,scoreTextLabel,"\n分數",0)
        
    }

    create(){
        this.isGameStart = false

        this.playerMoveSpeed = 400
        this.cursor = this.input.keyboard.createCursorKeys()

        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)
        
        this.createScoreBoard()
    


        

        //創建角色、星星等
        this.platforms = this.createPlatform()
        this.player = this.createPlayer()

        //Balloons custom OK.
        const {star} = this.modifyDatas
        this.starsSpawner = new StarsSpawner(this,star.items)
        this.starsGroup = this.starsSpawner.group


        
        /* related to collider between objects */
        this.physics.add.collider(this.player,this.platforms)
        this.physics.add.overlap(this.player, this.starsGroup, this.collectStar,null,this)
        this.physics.add.collider(this.platforms, this.starsGroup,this.disableBody,null,this)
        this.physics.add.collider(this.platforms, this.bombsGroup, this.hitBomb,null,this)
        this.physics.add.collider(this.player, this.bombsGroup, this.hitBomb, null, this)

        // related to button 左箭頭右箭頭
        this.createMovingArrow()
        


        //gameStart Tutorial
        const {gameTutorialText} = this.modifyDatas
        this.gameTutorialMessage = new GameTutorial(this, gameTutorialText.items[0])
        this.gameTutorialMessage.create()

    }

    handleCountDownFinished(){
        this.starsSpawner.spawn()
    }

    

    gameover(){
        this.physics.pause()
        this.starCoolDown.stop()
        this.player.setTint(0xff0000)
        this.player.anims.play('stop')

        const {gameoverMessage} = this.modifyDatas
        this.gameoverMessage = new GameoverMessage(this,this.scoreText.getScore(),gameoverMessage.items[0])
        this.gameoverMessage.create()
    }


    disableBody(hit,disablePart){   //碰撞後決定消失的物件（右邊）
        disablePart.disableBody(true,true)
    }

    hitBomb(player,bomb){
        // bomb.disableBody(true,true)
    }

    collectStar(player,star){
        star.disableBody(true,true)
        this.getItemMessage = new ShowMessage(this, star.getData('text'))
        this.scoreText.addScore(star.getData('score'))
        this.getItemMessage.start(this.getItemMessage.stop(),500)//5s
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


        if(this.isGameStart){
            this.starCoolDown.update()
            this.gameTimer.update()
        }
        
    }

    createMovingArrow(){
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
}



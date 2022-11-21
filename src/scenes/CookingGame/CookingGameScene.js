import Phaser from "phaser"

import GameTimer from "../CommonSystem/GameTimer"
import Score from "../CommonSystem/Score"
import GameoverMessage from "../CommonSystem/GameOverMessage"


//Cooking Game Scripts
import MaskManSpawner from "./MaskManSpawner"
import FoodSpawner from "./FoodSpawner"
import GameTutorial from "./GameTutorial"

var zone

export default class CookingGameScene extends Phaser.Scene{
    constructor(){
        super('Cooking')
        this.food = undefined
        this.scoreText = undefined
        this.isGameStart = false
    }

    preload(){
        this.modifyDatas = this.scene.settings.data
        console.log("modifyDatas : ", this.modifyDatas)

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


        this.load.image('panel','/img/Games/CookingGame/cookpanel.png')
        this.load.image('blackBlock','/img/Games/CookingGame/blackBlock.png')



        this.load.image('foodCan','/img/Games/CookingGame/foodCan.png')
        this.load.image('rawFood','/img/Games/CookingGame/rawFood.png')
        this.load.image('half','/img/Games/CookingGame/halfFood.png')
        this.load.image('flip','/img/Games/CookingGame/halfFlipFood.png')
        this.load.image('well','/img/Games/CookingGame/wellFood.png')
        this.load.image('cookSpot','/img/Games/CookingGame/cookSpot.png')






        
        this.load.image('maskMan','/img/Games/CookingGame/maskMan.png')
        this.load.image('maskManSmile','/img/Games/CookingGame/maskManSmile.png')
        this.load.image('maskManAngry','/img/Games/CookingGame/maskManAngry.png')
        this.load.image('wantedItem','/img/Games/CookingGame/wantedItem.png')
    }


    create(){

        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)


        this.add.image(400,480,'panel').setDepth(1);
        this.add.image(400,620,'blackBlock')

        //create score
        this.createScoreBoard()

        

        this.maskMan = new MaskManSpawner(this,'maskMan',this.scoreText)
        this.maskMan.spawn()
        zone = this.add.zone(200,350,50,50)

        this.physics.world.enable(zone)
        zone.body.setAllowGravity(false)
        zone.body.moves = false


        var id = 0
        this.foodGroup = []
        this.cookGroup = this.createFoodSpot()
        this.foodCan = this.physics.add.sprite(130,340,'foodCan').setScale(1).setDepth(2);
        this.foodCan.setInteractive().on('pointerdown',function(){

            this.food = new FoodSpawner(this, 'rawFood', id, {
                position: {
                    x: 200,
                    y: 350
                },
                size: 100}
            )

            this.foodGroup.push(this.food)
            this.foodGroup[id].spawn()
            id++

        },this)

        this.setInputInteractive()
        
        //gameStart Tutorial
        const {gameTutorialText} = this.modifyDatas
        this.gameTutorialMessage = new GameTutorial(this, gameTutorialText.items[0])
        this.gameTutorialMessage.create()
    }

    setInputInteractive(){
        // return this.food
        this.input.on('dragover', function (pointer, gameObject, dropZone) {
            if(dropZone.texture.key === "cookSpot"){
                dropZone.setTint(0xffffff);
                // console.log('name : ' + gameObject.name)
                var name = parseInt(gameObject.name)
                if(this.foodGroup[name].timer.label){
                    this.foodGroup[name].timer.label.x = gameObject.x
                    this.foodGroup[name].timer.label.y = gameObject.y
                }
                if(this.foodGroup[name].timer.timerEvent){
                    // console.log('wow!!')
                    this.foodGroup[name].timer.keepStart()
                }
            }
            
        },this);

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            
            if(dropZone.texture.key === "cookSpot"){
                dropZone.clearTint();
                var name = parseInt(gameObject.name)
                if(this.foodGroup[name].timer.label){
                    this.foodGroup[name].timer.label.x = gameObject.x
                    this.foodGroup[name].timer.label.y = gameObject.y
                }
                
                if(this.foodGroup[name].timer.timerEvent){
                    // console.log('wow!!')

                    this.foodGroup[name].timer.pause()
                }
            }
            
        },this);    //寫function 時一定要加這裡的 ,this

    }
    gameover(){
        this.physics.pause()
        const {gameoverMessage} = this.modifyDatas
        this.gameoverMessage = new GameoverMessage(this,this.scoreText.getScore(),gameoverMessage.items[0])
        this.gameoverMessage.create()
    }

    createFoodSpot(){
        const foodGroup = this.physics.add.group()
        for(let i=1,y=428;i<=2;i++){
            for(let x=200,t=1;t<=5;x+=100,t++){
                foodGroup.create(x,y,'cookSpot')
            }
            y=505
        }

        Phaser.Actions.Call(foodGroup.getChildren(),function(child){
            child.setInteractive({draggable: false,})
                 .on('dragstart', function(pointer, dragX, dragY){
                     // ...
                 })
                 .on('drag', function(pointer, dragX, dragY){
                     child.setPosition(dragX, dragY);
                 })
                 .on('dragend', function(pointer, dragX, dragY, dropped){
                     // ...
                 })
            child.input.dropZone = true

        },this)
        return foodGroup
    }

    update(){
        for(var i= 0 ;i<this.foodGroup.length;i++){
            this.foodGroup[i].timer.update()
        }
        zone.body.debugBodyColor = zone.body.touching.none ? 0x00ffff : 0xffff00

        if(this.isGameStart){
            this.gameTimer.update()
        }
    }

    startGame = () => {
        //create score board
        this.scoreText.showScoreText()
        

        // timeText,gameTimer custom OK.
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
}


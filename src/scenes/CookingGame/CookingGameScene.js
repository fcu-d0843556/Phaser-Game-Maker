import Phaser from "phaser"

import GameTimer from "../CommonSystem/GameTimer"
import Score from "../CommonSystem/Score"
import GameoverMessage from "../CommonSystem/GameOverMessage"

import MaskManSpawner from "./MaskManSpawner"
import FoodSpawner from "./FoodSpawner"



var zone

export default class CookingGameScene extends Phaser.Scene{
    constructor(userID,appSpot){
        super('Cooking')
        this.userID = userID
        this.appSpot = appSpot

        this.food = undefined
        this.allJsonData = []
        this.scoreText = undefined
        this.gameOver = false
    }

    preload(){
        // this.jsonData = this.cache.json.get('jsonData');
        // console.log("find jsonData")
        // console.log(this.jsonData)

        this.load.image('half','/img/Games/CookingGame/halfFood.png')
        this.load.image('flip','/img/Games/CookingGame/halfFlipFood.png')
        this.load.image('well','/img/Games/CookingGame/wellFood.png')
        this.load.image('panel','/img/Games/CookingGame/cookpanel.png')
        this.load.image('blackBlock','/img/Games/CookingGame/blackBlock.png')

        this.load.image('foodCan','/img/Games/CookingGame/foodCan.png')
        this.load.image('rawFood','/img/Games/CookingGame/rawFood.png')
        this.load.image('background','/img/Games/Common/background.png')

        this.load.image('cookSpot','/img/Games/CookingGame/cookSpot.png')
        this.load.image('maskMan','/img/Games/CookingGame/maskMan.png')
        this.load.image('maskManSmile','/img/Games/CookingGame/maskManSmile.png')
        this.load.image('maskManAngry','/img/Games/CookingGame/maskManAngry.png')

        this.load.image('wantedItem','/img/Games/CookingGame/wantedItem.png')


        this.load.image('gameover','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgain', '/img/Games/Common/gameover/playAgainButton.png')

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

        // this.add.image(this.allJsonData.background.position.x, this.allJsonData.background.position.y ,'background').setScale(this.allJsonData.background.size/100)
        this.add.image(400,480,'panel').setDepth(1);
        this.add.image(400,620,'blackBlock')



        const scoreTextLabel = this.add.text(16,16, "score", {
            "fontSize": 32,
            "fill": "#000"
        })
        this.scoreText = new Score(this,scoreTextLabel,"score",0)
        this.scoreText.showScoreText()



        const timerLabel2 = this.add.text(16, 54, "time", {
            "fontSize": 32,
            "fill": "#000"
        })
        this.gameTimer = new GameTimer(this,timerLabel2,"time")
        this.gameTimer.start(this.gameover.bind(this),3000)//5s


        

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
        this.gameOver = true

        let gameoverMessage = new GameoverMessage(this,this.scoreText.getScore())
        gameoverMessage.create()
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
        this.gameTimer.update()

    }
}


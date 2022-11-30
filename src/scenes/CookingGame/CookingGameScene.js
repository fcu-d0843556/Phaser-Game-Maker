import Phaser, { LEFT } from "phaser"

import GameTimer from "../CommonSystem/GameTimer"
import Score from "../CommonSystem/Score"
import GameoverMessage from "../CommonSystem/GameOverMessage"


//Cooking Game Scripts
import CustomerSpawner from "./CustomerSpawner"
import FoodSpawner from "./FoodSpawner"
import GameTutorial from "./GameTutorial"


export default class CookingGameScene extends Phaser.Scene{
    constructor(){
        super('Cooking')
    }

    preload(){
        this.modifyDatas = this.scene.settings.data
        console.log("modifyDatas : ", this.modifyDatas)

        // load image
        Object.keys(this.modifyDatas).forEach((key)=>{
            this.modifyDatas[key].items.forEach((itemObj)=>{
                if( itemObj.img ) {
                    if(this.textures.list[itemObj.name]){
                        console.log(itemObj);
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


        this.load.image('panel','/img/Games/CookingGame/cookpanel.png')
        this.load.image('blackBlock','/img/Games/CookingGame/blackBlock.png')

        this.load.image('trashCan','/img/Games/CookingGame/trashCan.png')

        this.load.image('cookSpot','/img/Games/CookingGame/cookSpot.png')


        this.load.image('wantedItem','/img/Games/CookingGame/wantedItem.png')
    }


    create(){
        this.foodCreatedNum = 0
        this.isGameStart = false

        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)

        

        this.add.image(400,480,'panel').setDepth(1);
        this.add.image(400,620,'blackBlock').setDepth(1)
        
        this.createTrashCan()

        this.cookHitBoxGroup = this.createCookHitBox()

        

        

        //開啟碰撞
        this.setInputInteractive()
        

        //gameStart Tutorial
        const {gameTutorialText,food} = this.modifyDatas
        this.gameTutorialMessage = new GameTutorial(this,food.items, gameTutorialText.items[0])
        this.gameTutorialMessage.create()
    }

    createFoodCan(){
        this.foodGroup = {}
        const {food} = this.modifyDatas
        this.foodCan = this.physics.add.sprite(food.items[0].img.position.x,food.items[0].img.position.y,'foodCan').setScale(food.items[0].img.size/100).setDepth(2);
        this.foodCan.setInteractive().on('pointerdown',function(){
            let foodSpawner = new FoodSpawner(this,food.items)
            let newFood = foodSpawner.spawn()
            let foodGroupLen = this.foodCreatedNum
            newFood.food.setData('name', this.foodCreatedNum)
            newFood.food.setData('type', 'rawFood')
            this.foodGroup[foodGroupLen] = newFood
            this.foodCreatedNum++
        },this)
    }


    setInputInteractive(){

        
        // this.input.on('dragstart', function (pointer, gameObject) {gameObject.setTint(0xff0000);});
        // this.input.on('dragend', function (pointer, gameObject) {gameObject.clearTint();});



        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            // console.log(gameObject);
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragover', function (pointer, gameObject, dropZone) {
            // console.log('dragover');
            if(dropZone.texture.key === "cookSpot"){
                dropZone.setTint(0xffffff);
                let name = gameObject.getData('name')
                
                //debug
                // if(this.foodGroup[name].timer.label){
                //     this.foodGroup[name].timer.label.x = gameObject.x
                //     this.foodGroup[name].timer.label.y = gameObject.y
                // }


                if(this.foodGroup[name].timer.timerEvent){
                    this.foodGroup[name].timer.keepStart()
                }
            }
        },this);

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            if(dropZone.texture.key === "cookSpot"){
                dropZone.clearTint();
                let name = gameObject.getData('name')

                // debug
                // if(this.foodGroup[name].timer.label){
                //     this.foodGroup[name].timer.label.x = gameObject.x
                //     this.foodGroup[name].timer.label.y = gameObject.y
                // }

                if(this.foodGroup[name].timer.timerEvent){
                    this.foodGroup[name].timer.pause()
                }
            }
        },this);  

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if(dropZone.texture.key === "wantedItem"){
                const {food} = this.modifyDatas
                switch(gameObject.getData('type')){
                    case 'rawFood':
                        this.customer.setTexture('angryCustomer')
                        this.scoreText.addScore(food.items[1].score.content)
                        break
                    case 'halfFood':
                        this.customer.setTexture('neturalCustomer')
                        this.scoreText.addScore(food.items[2].score.content)
                        break
                    case 'wellFood':
                        this.customer.setTexture('happyCustomer')
                        this.scoreText.addScore(food.items[3].score.content)
                        break
                    case 'overcookedFood':
                        this.customer.setTexture('angryCustomer')
                        this.scoreText.addScore(food.items[4].score.content)
                        break
                }
                delete this.foodGroup[gameObject.getData('name')]
                gameObject.destroy(true,true)
            }else if(dropZone.texture.key === "trashCan"){
                delete this.foodGroup[gameObject.getData('name')]
                gameObject.destroy(true,true)
            }
        },this);
    }

    gameover(){
        this.physics.pause()

        //遊戲結束時讓食物不可以拖動了
        Object.keys(this.foodGroup).forEach((food)=>{
            this.input.setDraggable(this.foodGroup[food].food, false);
        })

        //遊戲結束評語
        const {gameoverMessage} = this.modifyDatas
        this.gameoverMessage = new GameoverMessage(this,this.scoreText.getScore(),gameoverMessage.items[0])
        this.gameoverMessage.create()
    }

    createTrashCan(){
        this.trashCan = this.physics.add.image(40,610,'trashCan').setScale(0.15).setInteractive()
        this.trashCan.input.dropZone = true
    }

    //建造4個煮東西的判定
    createCookHitBox(){
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
        if(this.isGameStart){
            this.gameTimer.update()

            //顯示食物計時器，debug
            // Object.keys(this.foodGroup).forEach((food)=>{
            //     this.foodGroup[food].timer.update()
            // })

        }
    }

    startGame = () => {
        // create score board
        this.createScoreBoard()
        this.scoreText.showScoreText()
        const {food, customer} = this.modifyDatas
        let customerSpawner  = new CustomerSpawner(this,this.scoreText,food.items[3], customer.items)
        this.customer = customerSpawner.spawn()
        
        //創建食物桶，可以用來生成生的食物
        this.createFoodCan()

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
        const gameTimerLabel = this.add.text(16, 34, "時間", style).setDepth(20).setDepth(20)
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
}


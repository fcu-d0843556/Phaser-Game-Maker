import Phaser from "phaser";


//Common System Scripts
import UsefulMath from "../CommonSystem/UsefulMath";

//PokeGetItem Game Scripts
import WordDisappearTimer from './WordDisappearTimer';
import GameoverMessage from "./GameOverMessage";

export default class PokeGetItemGameScene extends Phaser.Scene{
    constructor(userID,appSpot){
        super('PokeGetItem')
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot

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

        this.load.image('gameoverLabel','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgainButton', '/img/Games/Common/gameover/playAgainButton.png')

        this.load.image('box','/img/Games/PokeGetItemGame/chuochuobox.png')
        this.load.image('smallBox','/img/Games/PokeGetItemGame/smallBox.png')
        this.load.image('smallBoxBreak','/img/Games/PokeGetItemGame/smallBoxBreak.png')
        this.load.image('finger','/img/Games/PokeGetItemGame/finger.png')

    }
    
    gameover(){
        //遊戲結束評語
        const {gameoverMessage} = this.modifyDatas
        this.gameoverMessage = new GameoverMessage(this,this.getItemObjs,gameoverMessage.items)
        this.gameoverMessage.create()
    }

    create(){
        this.locationKey = [
            'upperLeft','upperMiddle','upperRight',
            'middleLeft','center','middleRight',
            'lowerLeft','lowerMiddle','lowerRight']
        this.getItemObjs = []
        
        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)

        this.add.image(180,400,'box')

        

        //顯示提示訊息
        const {gameMessage} = this.modifyDatas
        const gameMessageStyle = {
            fontSize: gameMessage.items[0].text.size,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2,
            wordWrap: { width: 320, useAdvancedWrap: true }
        }
        this.add.text(20,70, '\n' + gameMessage.items[0].text.content, gameMessageStyle)

        //顯示可以戳幾次
        const {gameRule} = this.modifyDatas
        this.hitTimes = gameRule.items[0].text.content
        const hitTimesStyle = {
            fontSize: 28,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2,
            wordWrap: { width: 320, useAdvancedWrap: true }
        }
        this.hitTimesText = this.add.text(20,6, '\n您還可以戳 ' + this.hitTimes + ' 次', hitTimesStyle)

        //生成盒子外觀，盒子裡的物品
        const {boxObject,boxSkin} = this.modifyDatas
        let smallBoxs = this.physics.add.group()
        let smallBoxsTimes = 0
        if(gameRule.items[1].selection.selected === 'random'){
            const usefulMath = new UsefulMath(this)
            this.randomLocationKey = [...this.locationKey]
            usefulMath.shuffle(this.randomLocationKey)
        }
        this.boxObjectModifyDatas = {}
        for(let i=0;i< boxObject.items.length;i++){
            this.boxObjectModifyDatas[boxObject.items[i].name.replace("Object","")] = {
                text: boxObject.items[i].text.content,
                size: boxObject.items[i].img.size
            }
        }
        for(let y = 300,timesY = 0;timesY<3; y+= 100,timesY++){
            for(let x = 80,timesX = 0;timesX<3; x+= 100,timesX++){
                let smallBox = this.physics.add.sprite(x,y, 'smallBox')
                this.add.image(x,y, this.locationKey[smallBoxsTimes] + 'Skin').setScale(boxSkin.items[smallBoxsTimes].img.size/100)
                if(gameRule.items[1].selection.selected === 'stick'){
                    smallBox.setData('getItemKey', this.locationKey[smallBoxsTimes] + 'Object')   
                    smallBox.setData('text', this.boxObjectModifyDatas[this.locationKey[smallBoxsTimes]].text)
                    smallBox.setData('size', this.boxObjectModifyDatas[this.locationKey[smallBoxsTimes]].size)
                }else if(gameRule.items[1].selection.selected === 'random'){
                    smallBox.setData('getItemKey', this.randomLocationKey[smallBoxsTimes] + 'Object')   
                    smallBox.setData('text', this.boxObjectModifyDatas[this.randomLocationKey[smallBoxsTimes]].text)
                    smallBox.setData('size', this.boxObjectModifyDatas[this.randomLocationKey[smallBoxsTimes]].size)
                }
                
                smallBoxs.add(smallBox)
                smallBoxsTimes++
            }       
        }

        Phaser.Actions.Call(smallBoxs.getChildren(),function(child){
            child.setInteractive()
            child.on('pointerdown',function(){
                const getItemObj = {
                    key: child.getData('getItemKey'),
                    size: child.getData('size')
                }
                this.getItemObjs.push(getItemObj)
                this.getItemTimer = new WordDisappearTimer(this,child)
                this.getItemTimer.fingerStart(this.getItemTimer.fingerStop(),1000)
                child.disableInteractive()

                this.hitTimes--
                this.hitTimesText.text = '\n您還可以戳 ' + this.hitTimes + ' 次'

                if(this.hitTimes === 0){
                    this.gameover()
                }
                
            },this)
        }, this)
    }


}
import Phaser from "phaser";

import GetMouseSpot from "../CommonSystem/GetMouseSpot"
import WordDisappearTimer from './WordDisappearTimer';

export default class PokeGetItemGameScene extends Phaser.Scene{
    constructor(userID,appSpot){
        super('PokeGetItem')
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot

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

        this.load.image('box','/img/Games/PokeGetItemGame/chuochuobox.png')
        this.load.image('smallBox','/img/Games/PokeGetItemGame/smallBox.png')
        this.load.image('smallBoxBreak','/img/Games/PokeGetItemGame/smallBoxBreak.png')
        this.load.image('finger','/img/Games/PokeGetItemGame/finger.png')
        this.load.image('heart','/img/Games/PokeGetItemGame/heartRed.png')


    }

    create(){
        this.locationKey = [
            'upperLeft','upperMiddle','upperRight',
            'middleLeft','center','middleRight',
            'lowerLeft','lowerMiddle','lowerRight']

        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)

        this.add.image(180,400,'box')


        // this.add.text(20,70,'選個洞戳戳看有什麼獎品吧！',{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})
        const {gameMessage} = this.modifyDatas
        // console.log(gameMessage);
        const gameMessageStyle = {
            fontSize: gameMessage.items[0].text.size,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2,
            wordWrap: { width: 320, useAdvancedWrap: true }
        }
        this.add.text(20,70, '\n' + gameMessage.items[0].text.content, gameMessageStyle)


        const {boxObject,boxSkin} = this.modifyDatas
        // console.log(boxObject);
        let smallBoxs = this.physics.add.group()
        let smallBoxsTimes = 0
        for(let y = 300,timesY = 0;timesY<3; y+= 100,timesY++){
            for(let x = 80,timesX = 0;timesX<3; x+= 100,timesX++){
                let smallBox = this.physics.add.sprite(x,y, 'smallBox')
                this.add.image(x,y, this.locationKey[smallBoxsTimes] + 'Skin').setScale(boxSkin.items[smallBoxsTimes].img.size/100)
                smallBox.setData('getItemKey', this.locationKey[smallBoxsTimes] + 'Object')
                smallBox.setData('text', boxObject.items[smallBoxsTimes].text.content)
                smallBox.setData('size', boxObject.items[smallBoxsTimes].img.size)
                smallBoxs.add(smallBox)
                smallBoxsTimes++
            }       
        }

        Phaser.Actions.Call(smallBoxs.getChildren(),function(child){
            child.setInteractive()
            child.on('pointerdown',function(){
                // console.log('you distroy ' + child.texture.key)
                this.getItemTimer = new WordDisappearTimer(this,child)
                this.getItemTimer.fingerStart(this.getItemTimer.fingerStop(),1000)
                child.disableInteractive()
            },this)
        }, this)
    }


}
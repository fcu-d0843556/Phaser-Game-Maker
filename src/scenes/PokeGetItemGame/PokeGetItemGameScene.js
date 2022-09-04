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
        // this.jsonData = this.cache.json.get('jsonData');
        // console.log("find jsonData")
        // console.log(this.jsonData)

        this.load.image('box','/img/Games/PokeGetItemGame/chuochuobox.png')
        this.load.image('smallBox','/img/Games/PokeGetItemGame/smallBoxStar.png')
        this.load.image('smallBoxBreak','/img/Games/PokeGetItemGame/smallBoxStarBreak.png')
        this.load.image('finger','/img/Games/PokeGetItemGame/finger.png')
        this.load.image('heart','/img/Games/PokeGetItemGame/heartRed.png')

        this.load.image('background','/img/Games/background.png')

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
        this.allJsonData.boxObject = {
            items: [
            {
                modifyTitle: "左 上 方 塊",
                name: "balloons",
                text: "你獲得了balloons！",
                src: "/img/Games/PokeGetItemGame/balloons.png",
                position: {
                x: 80,
                y: 300
                },
                size: 100
            },
            {
                modifyTitle: "中 上 方 塊",
                name: "moonYellow",
                text: "你獲得了moonYellow！",
                src: "/img/Games/PokeGetItemGame/moonYellow.png",
                position: {
                x: 180,
                y: 300
                },
                size: 100
            },
            {
                modifyTitle: "右 上 方 塊",
                name: "heartRed",
                text: "你獲得了heartRed！",
                src: "/img/Games/PokeGetItemGame/heartRed.png",
                position: {
                x: 280,
                y: 300
                },
                size: 100
            },
            {
                modifyTitle: "左 中 方 塊",
                name: "heartYellow",
                text: "你獲得了heartYellow！",
                src: "/img/Games/PokeGetItemGame/heartYellow.png",
                position: {
                x: 80,
                y: 400
                },
                size: 100
            },
            {
                modifyTitle: "正 中 方 塊",
                name: "heartAqua",
                text: "你獲得了heartAqua！",
                src: "/img/Games/PokeGetItemGame/heartAqua.png",
                position: {
                x: 180,
                y: 400
                },
                size: 100
            },
            {
                modifyTitle: "右 中 方 塊",
                name: "heartOrange",
                text: "你獲得了heartOrange！",
                src: "/img/Games/PokeGetItemGame/heartOrange.png",
                position: {
                x: 280,
                y: 400
                },
                size: 100
            },
            {
                modifyTitle: "左 下 方 塊",
                name: "heartPink",
                text: "你獲得了heartPink！",
                src: "/img/Games/PokeGetItemGame/heartPink.png",
                position: {
                x: 80,
                y: 500
                },
                size: 100
            },
            {
                modifyTitle: "中 下 方 塊",
                name: "starYellow",
                text: "你獲得了starYellow！",
                src: "/img/Games/PokeGetItemGame/starYellow.png",
                position: {
                x: 180,
                y: 500
                },
                size: 100
            },
            {
                modifyTitle: "右 下 方 塊",
                name: "smile",
                text: "你獲得了smile！",
                src: "/img/Games/PokeGetItemGame/smile.png",
                position: {
                x: 280,
                y: 500
                },
                size: 100
            }
            ]
        }

        for(let s=0; s<this.allJsonData.boxObject.items.length; s++){
            this.load.image(this.allJsonData.boxObject.items[s].name, this.allJsonData.boxObject.items[s].src)
        }
    }

    create(){
        this.add.image(400,320 ,'background').setScale(1)
        this.add.image(180,400,'box')
        // this.add.text(20,70,'選個洞戳戳看有什麼獎品吧！',{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})
        this.add.text(20,70,'選個洞戳戳看要吃什麼！',{fontSize:25,fill:'#fff',backgroundColor:'rgba(0,255,0,0.25)'})


        let smallBoxs = this.physics.add.group()
        let smallBoxsTimes = 0
        for(let y = 300,timesY = 0;timesY<3; y+= 100,timesY++){
            for(let x = 80,timesX = 0;timesX<3; x+= 100,timesX++){
                let smallBox = this.physics.add.sprite(x,y,'smallBox')
                smallBox.setData('text',this.allJsonData.boxObject.items[smallBoxsTimes].text)
                smallBox.setData('name',this.allJsonData.boxObject.items[smallBoxsTimes].name)
                smallBox.setData('size',this.allJsonData.boxObject.items[smallBoxsTimes].size)
                smallBox.setData('x',this.allJsonData.boxObject.items[smallBoxsTimes].position.x)
                smallBox.setData('y',this.allJsonData.boxObject.items[smallBoxsTimes].position.y)
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
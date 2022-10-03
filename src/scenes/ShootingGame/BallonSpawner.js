import Phaser from "phaser"

import ShowMessage from "../CommonSystem/ShowMessage"

export default class ballonSpawner{
    constructor(scene,score,data) {
        this.scene = scene
        this.score = score
        this.data = data
        this.number = 0
    }

    get group(){
        return this._group
    }
    getNumber(){
        return this.number
    }
    spawn(){
        let x = Phaser.Math.Between(40,300)
        let type = Phaser.Math.Between(1,5)
        let speed = Phaser.Math.Between(-150,-300)
        
        let balloonChild = this.scene.physics.add.sprite(x,700,'balloon'+type ).setScale(this.data[type-1].img.size/100).setGravity(0, speed);
        balloonChild.setInteractive().on('pointerdown',function(){
            balloonChild.setData('text',this.data[type-1].text.content)
            this.getItemMessage = new ShowMessage(this.scene,balloonChild.getData('text'))
            this.getItemMessage.start(this.getItemMessage.stop(),500)//5s
            this.score.addScore(this.data[type-1].score.content)
            balloonChild.destroy(true,true)
        },this)

        this.number++
    }

}
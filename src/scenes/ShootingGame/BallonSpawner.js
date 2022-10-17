import Phaser from "phaser"

import ShowMessage from "../CommonSystem/ShowMessage"

export default class ballonSpawner{
    constructor(scene,score,data) {
        this.scene = scene
        this.score = score
        this.data = data

        this.balloonPriority = []
        let total = 0
        data.forEach(balloon => {
            total += balloon.priority
            this.balloonPriority.push(total)
        });        

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

        let ramdomPriority = Phaser.Math.Between(1,this.balloonPriority[this.balloonPriority.length - 1])
        let type
        for(let i=this.balloonPriority.length - 1 ;i >= 0;i--){
            if(i === 0){
                type = 1
                break
            }else if(ramdomPriority <= this.balloonPriority[i] && ramdomPriority > this.balloonPriority[i - 1]){
                type = (i + 1)
                break
            }
        }
        // console.log(ramdomPriority ,type);

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
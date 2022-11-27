import Phaser from "phaser"

import ShowMessage from "../CommonSystem/ShowMessage"

const speedArr = [
    {x: -50, y: -100},
    {x: -75, y: -125},
    {x: -125, y: -175},
    {x: -150, y: -225},
    {x: -200, y: -300},
]

export default class ballonSpawner{
    constructor(scene,score,balloons,balloonSpeed) {
        this.scene = scene
        this.score = score
        this.speed = balloonSpeed.priority.selected

        this.balloons = balloons
        this.balloonPriority = []
        let total = 0
        balloons.forEach(balloon => {
            total += balloon.priority.selected
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


        //set balloon type( 1 - 5 )
        let type
        let ramdomPriority = Phaser.Math.Between(1,this.balloonPriority[this.balloonPriority.length - 1])
        for(let i=this.balloonPriority.length - 1 ;i >= 0;i--){
            if(i === 0){
                type = 1
                break
            }else if(ramdomPriority <= this.balloonPriority[i] && ramdomPriority > this.balloonPriority[i - 1]){
                type = (i + 1)
                break
            }
        }
        // console.log(type);
        
        //set balloon speed
        let balloonSpeed = Phaser.Math.Between(speedArr[this.speed - 1].x,speedArr[this.speed - 1].y) // very fast



        //render balloon(set interactive)
        let balloonChild = this.scene.physics.add.sprite(x,700,'balloon'+type ).setScale(this.balloons[type-1].img.size/100).setGravity(0, balloonSpeed);
        balloonChild.setInteractive().on('pointerdown',function(){
            balloonChild.setData('text',this.balloons[type-1].text.content)
            this.getItemMessage = new ShowMessage(this.scene,balloonChild.getData('text'))
            this.getItemMessage.start(this.getItemMessage.stop(),500)//5s
            this.score.addScore(this.balloons[type-1].score.content)
            balloonChild.destroy(true,true)
        },this)
        
        this.number++
    }

}
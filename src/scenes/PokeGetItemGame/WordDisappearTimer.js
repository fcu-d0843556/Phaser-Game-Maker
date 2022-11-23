export default class WordDisappearTimer {
    constructor(scene,child){
        this.scene = scene
        this.child = child
        this.getItemKey = this.child.getData('getItemKey')
        // console.log(this.getItemKey);
        this.text = this.child.getData('text')
        this.size = this.child.getData('size')/100
        this.x = child.x
        this.y = child.y

    }



    fingerStart(callback,duration){
        this.finger = this.scene.physics.add.sprite(this.x,this.y-250,'finger').setScale(0.75,0.75)

        this.fingerStop()
        this.finger.setGravity(0,200)
        this.fingerTimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.fingerStop()
                this.breakStart(this.breakStop(),2000)
                if(callback){
                    callback()
                }
            }
        })
    }

    fingerStop(){
        if(this.fingerTimerEvent){
            this.scene.add.image(this.x,this.y, 'smallBoxBreak').setDepth(5)
            this.fingerTimerEvent.destroy()
            this.fingerTimerEvent = undefined
            this.finger.destroy(true,true)
        }
    }

    breakStart(callback,duration){
        

        this.heart = this.scene.physics.add.image(this.x,this.y,this.getItemKey).setScale(this.size).setDepth(7)

        this.scene.physics.moveToObject(this.heart, {x:this.x,y:0}, 50);
        const textTimerStyle = {
            fontSize: 20,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2,
            wordWrap: { width: 320, useAdvancedWrap: true }
        }
        this.textTimer = this.scene.add.text(20,130,'\n' + this.text,textTimerStyle)
        this.BreakTimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.breakStop()
                if(callback){
                    callback()
                }
            }
        })

    }

    breakStop(){
        if(this.BreakTimerEvent){
            this.BreakTimerEvent.destroy()
            this.heart.destroy()
            this.BreakTimerEvent = undefined
            this.textTimer.destroy(true,true)
        }
    }

}
export default class ShowMessage {
    constructor(scene,text){
        this.scene = scene
        this.text = text
    }

    start(callback,duration){
        const style = {
            fontSize: 24,
            fill: "#fff",
            stroke: "#000",
            strokeThickness: 2,
            wordWrap: { width: 350, useAdvancedWrap: true }
        }

        this.textTimer = this.scene.add.text(20,100,'\n' + this.text, style)
        this.disapperTimerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: ()=>{
                this.stop()
                if(callback){
                    callback()
                }
            }
        })

    }

    stop(){
        if(this.disapperTimerEvent){
            this.disapperTimerEvent.destroy()
            this.disapperTimerEvent = undefined
            this.textTimer.destroy(true,true)
        }
    }

}

// this.add.text(xSpot,455, `\n${pinballGoal.items[i].score.content}`, )
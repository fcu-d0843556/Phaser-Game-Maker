
export default class TimeBar {
    constructor(scene,label){
        this.scene = scene
        this.label = label
    }

    start(){ //1s 預設值

        this.timerEvent = this.scene.time.addEvent(
            { 
                delay: 1000, 
                loop: true,
                paused: false
            }
        );


    }

    restart(){
        this.stop()
        this.start()
    }

    pause(){
        this.timerEvent.paused = true
    }

    stop(){
        if(this.timerEvent){
            this.timerEvent.destroy()
            this.timerEvent = undefined
        }
    }

    isPause(){
        return this.timerEvent.paused
    }
    
}
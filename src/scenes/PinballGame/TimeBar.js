
export default class TimeBar {
    constructor(scene,label,time){
        this.scene = scene
        this.label = label
        switch(time){
            case 1:
                this.time = 2000
                break
            case 2:
                this.time = 1500
                break
            case 3:
                this.time = 1000
                break
            case 4:
                this.time = 750
                break
            case 5:
                this.time = 500
                break
        }
    }

    start(){ //1s 預設值

        this.timerEvent = this.scene.time.addEvent(
            { 
                delay: this.time,
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
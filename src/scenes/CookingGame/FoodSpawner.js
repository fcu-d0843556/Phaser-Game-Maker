import CookingTimer from "./CookingTimer"


export default class foodSpawner{
    constructor(scene,data) {
        this.scene = scene
        this.data = data
        this.foodcountdown = 1
        this.timer = undefined

    }

    getTimer(){
        return this.timer
    }

    spawn(){
        this.food = this.scene.add.sprite(200,350,'rawFood').setScale(this.data.img.size/100).setDepth(1).setInteractive();  
        this.scene.input.setDraggable(this.food);
        this.food.on('pointerover', function () {this.setTint(0x00ff00);});
        this.food.on('pointerout', function () {this.clearTint();});
        
        const cookTimeLabel = this.scene.add.text(200,350,'',{fontSize:32,fill:'#000'})

        this.timer = new CookingTimer(this.scene,cookTimeLabel)
        this.timer.start(this.countEnd.bind(this),2000)

        return this
       
    }

    countEnd(){
        switch (this.foodcountdown) {
            case 1:
                this.food.setTexture('halfFood')
                break;
            case 2:
                this.food.setTexture('wellFood')
                break
            default:
                break;
        }
        if(this.foodcountdown===3){
            this.timer.stop()
        }else{
            this.timer.start(this.countEnd.bind(this),2000)
            this.timer.keepStart()
            this.foodcountdown++
        }
    }

}
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
        this.food = this.scene.add.image(200,350,'rawFood').setScale(this.data[1].img.size/100).setDepth(2).setInteractive();  
        // this.food.setTint(0x808080)
        this.scene.input.setDraggable(this.food);
        // this.food.on('pointerover', function () {this.setTint(0x00ff00);});
        // this.food.on('pointerout', function () {this.clearTint();});
        
        const cookTimeLabel = this.scene.add.text(200,350,'',{fontSize:32,fill:'#000'})

        this.timer = new CookingTimer(this.scene,cookTimeLabel)
        this.timer.start(this.countEnd.bind(this),2000)

        this.scene.input.on('drag',function (pointer,gameObject,dragX,dragY){
            gameObject.x=dragX;
            gameObject.y=dragY;
        });

        return this
       
    }

    countEnd(){
        switch (this.foodcountdown) {
            case 1:
                this.food.setTint(0xe3c0ad)
                this.food.setData('type', 'halfFood')
                break;
            case 2:
                // console.log('wellFood',this.food);
                this.food.setData('type', 'wellFood')
                // this.food.setTint(0x5C4033)
                this.food.clearTint()

                this.food.setScale(this.data[3].img.size/100).setDepth(10).setInteractive(); 
                this.food.setTexture('wellFood')
                
                // this.scene.add.image(200,350,'wellFood').setScale(this.data[1].img.size/100).setDepth(2).setInteractive();
                // this.scene.input.setDraggable(this.food);

                break
            case 3:
                this.food.setTint(0x5C4033)
                this.food.setData('type', 'overcookedFood')
                break
            default:
                break;
        }
        if(this.foodcountdown===3){
            this.timer.stop()
        }else{
            this.timer.start(this.countEnd.bind(this),3000)
            this.timer.keepStart()
            this.foodcountdown++
        }
    }

}
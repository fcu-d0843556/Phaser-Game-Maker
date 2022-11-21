import CookingTimer from "./CookingTimer"


export default class foodSpawner{
    constructor(scene,id,data) {
        this.scene = scene
        this.id = id
        this.data = data
        console.log("data", this.data);
        this.foodcountdown = 1
        // const cookTimeLabel = this.scene.add.text(200,350,'',{fontSize:32,fill:'#000'})

        // this.timer = new CookingTimer(scene,cookTimeLabel)

    }

    getTimer(){
        return this.timer
    }

    spawn(){
        // this.food = this.scene.add.sprite(200,550,'rawFood').setScale(this.data.img.size/100).setDepth(1);    
        this.food = this.scene.add.sprite(200,550,'rawFood').setInteractive();

        // this.food.setName(this.id)
        // this.timer.start(this.countEnd.bind(this),2000)

        return this.food
       
    }

    // countEnd(){
    //     switch (this.foodcountdown) {
    //         case 1:
    //             this.food.setTexture('halfFood')
    //             break;
    //         case 2:
    //             this.food.setTexture('wellFood')
    //             break
    //         default:
    //             break;
    //     }
    //     if(this.foodcountdown===3){
    //         this.timer.stop()
    //     }else{
    //         this.timer.start(this.countEnd.bind(this),2000)
    //         this.timer.keepStart()
    //         this.foodcountdown++
    //     }


    // }

}
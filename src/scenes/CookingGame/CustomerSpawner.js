export default class CustomerSpawner{
    constructor(scene, score, food,customer) {
        this.scene = scene
        this.score = score
        this.food = food
        this.customer = customer
    }

    spawn(){
        this.hitBox = this.scene.physics.add.sprite(150,180,'wantedItem').setFlipX(true).setScale(0.7).setDepth(1);
        this.hitBox.setInteractive()
        this.hitBox.input.dropZone = true

        this.customer = this.scene.physics.add.sprite(this.customer[1].img.position.x,this.customer[1].img.position.y,'neturalCustomer').setScale(this.customer[1].img.size/100)

        this.scene.physics.add.sprite(150,160,'wellFood').setScale(this.food.img.size/100).setDepth(2);
        
        return this.customer

    }

}
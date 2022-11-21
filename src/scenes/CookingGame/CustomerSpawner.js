export default class CustomerSpawner{
    constructor(scene, score) {
        this.scene = scene
        this.score = score
    }

    spawn(){
        this.hitBox = this.scene.physics.add.sprite(150,180,'wantedItem').setFlipX(true).setScale(0.7);
        this.hitBox.setInteractive()
        this.hitBox.input.dropZone = true

        this.customer = this.scene.physics.add.sprite(250,250,'neturalCustomer').setScale(0.7)

        // this.scene.physics.add.sprite(150,160,'well').setScale(0.15);
        this.scene.physics.add.sprite(150,160,'wellFood');

        return this.customer

    }

}
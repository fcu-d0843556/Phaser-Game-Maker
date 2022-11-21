import Phaser from "phaser"
import CookingTimer from "./CookingTimer"


export default class maskManSpawner{
    constructor(scene, score) {
        this.scene = scene
        this.score = score

    }

    spawn(){
        this.hitBox = this.scene.physics.add.sprite(150,180,'wantedItem').setFlipX(true).setScale(0.7);
        this.hitBox.setInteractive()
        this.hitBox.input.dropZone = true

        this.maskMan = this.scene.physics.add.sprite(250,250,'neturalCustomer').setScale(0.7)

        this.scene.input.on('drop', function (pointer, gameObject, dropZone) {
            if(dropZone.texture.key === "wantedItem"){
                switch(gameObject.texture.key){
                    case 'rawFood':
                        this.maskMan.setTexture('angryCustomer')
                        this.score.addScore(-10)
                        break
                    case 'halfFood':
                        this.maskMan.setTexture('neturalCustomer')
                        this.score.addScore(5)
                        break
                    case 'wellFood':
                        this.maskMan.setTexture('happyCustomer')
                        this.score.addScore(10)
                        break
                }
                gameObject.destroy(true,true)
            }
        },this);
        
        // this.scene.physics.add.sprite(150,160,'well').setScale(0.15);
        this.scene.physics.add.sprite(150,160,'wellFood');



    }

}
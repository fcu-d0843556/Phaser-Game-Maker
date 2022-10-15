export default class GameTutorial{
    constructor(scene){
        this.scene = scene
    }

    startGame(){

    }
    
    create(){
        this.scene.add.image(180,330,'tutorial').setDepth(2);

    }
    
}
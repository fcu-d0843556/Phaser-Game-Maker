import Phaser from "phaser"
import TimeBar from "./TimeBar"

export default class PinballGameScene extends Phaser.Scene{
    constructor(userID,appSpot){
        super("Pinball")
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot

    }


    preload(){

        this.load.image('star','/img/Games/CatchFruitGame/star.png');

    }

    create(){
        this.player = this.physics.add.image(180,300,'star')
        this.cameras.main.startFollow(this.player);

        this.timer = new TimeBar(this,"")
        this.timer.start()

        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics({ x: 50, y: 36 }).setDepth(2);

        this.cursors = this.input.keyboard.createCursorKeys();
        
    }

    update(time, delta){
        this.graphics.clear();
        for (var i = 0; i < 1; i++)
        {
            this.graphics.fillStyle(this.hsv[30].color, 1);
            this.graphics.fillRect(0, 0, 200 * this.timer.timerEvent.getProgress(), 50);
        }

        this.player.setVelocity(0,0);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-500);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(500);
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-500);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(500);
        }
    }

}
import Phaser from "phaser"
import TimeBar from "./TimeBar"

var player
export default class PinballGameScene extends Phaser.Scene{
    constructor(userID,appSpot){
        super("Pinball")
        this.userID = userID
        this.allJsonData = []
        this.appSpot = appSpot
        this.balls = []
    }


    preload(){

        this.load.image('star','/img/Games/CatchFruitGame/star.png');


        this.load.image('background','/img/Games/PinballGame/woodenBG.png');
        this.load.svg('pinballReadyTable','/img/Games/PinballGame/pinballReadyTable.svg')
        this.load.svg('bottomWall','/img/Games/PinballGame/bottomWall.svg')
        this.load.svg('scoreWall','/img/Games/PinballGame/scoreWall.svg')
        this.load.svg('rightWall','/img/Games/PinballGame/rightWall.svg')
        this.load.svg('pin','/img/Games/PinballGame/pin.svg')



        
    }

    create(){
        this.nowBallNum = 0

        this.matter.world.setGravity(0,0.98).setBounds()

        this.cursors = this.input.keyboard.createCursorKeys();

        



        this.add.image(180,320,'background').setScale(0.57,0.50)
        
        

        for(let x =0;x<10;x++){
            let ball = this.matter.add.image(200 - x * 20, 520, 'pin').setBody({
                type: 'circle',
                radius: 11,
            },{
                label: 'pinball'
            })
            this.balls.push(ball)
        }
        this.setPinballToReady()
        // console.log(this.balls);
        
        // this.ball = this.matter.add.image(320, 500, 'pin').setBody({
        //     type: 'circle',
        //     radius: 11,
        // },{
        //     label: 'pinball'
        // })
        // console.log(this.ball);



        this.createPins()
        this.createWalls()

        this.createPowerBar()
       


        //射出按鈕
        this.powerButton = this.add.circle(320 ,590,30,{
            isStatic: true
        }).setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            if(this.balls.length > this.nowBallNum){
                this.powerTimer.pause()
                this.balls[this.nowBallNum].setVelocity(-5,-20);
            }
        }, this);

        


        //判斷是否換球的方塊
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;

        var rect = Bodies.rectangle(0, 0, 275, 100, { isSensor: true, label: 'pinballGoal' });

        var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rect ],
            inertia: Infinity
        });

        player = this.matter.add.image(0, 0, 'pin');

        player.setExistingBody(compoundBody);
        player.setPosition(130, 448)
        player.setIgnoreGravity(true)
        



        //用來偵測碰撞物體的function
        this.matter.world.on('collisionstart', function (event) {
            //  Loop through all of the collision pairs
            var pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++)
            {
                let bodyA = pairs[i].bodyA;
                let bodyB = pairs[i].bodyB;
                
                //  We only want sensor collisions
                if (pairs[i].isSensor)
                {
                    let inObject;
                    let detectHitBox;
    
                    if (bodyA.isSensor)
                    {
                        inObject = bodyB;
                        detectHitBox = bodyA;
                        // console.log("\ninObject: ",inObject.label, '\nHitBox: ', detectHitBox.label);
                    }else if (bodyB.isSensor){
                        inObject = bodyA;
                        detectHitBox = bodyB;
                        // console.log("\ninObject: ",inObject.label, '\nHitBox: ', detectHitBox.label);
                    }

                    if(detectHitBox.label === 'pinballGoal' && inObject.label === 'pinball'){
                        console.log('next',this.nowBallNum);
                        this.powerTimer.restart()
                        this.nowBallNum++
                        this.setPinballToReady()
                    }
                }
            }
        }, this);
    }

    update(time, delta){
        this.graphics.clear();
        for (var i = 0; i < 1; i++)
        {
            this.graphics.fillStyle(this.hsv[30].color, 1);
            this.graphics.fillRect(0, 0, 200 * this.powerTimer.timerEvent.getProgress(), 20);
        }

        if (this.cursors.left.isDown)
        {
            player.setVelocityX(-10);
        }
        else if (this.cursors.right.isDown)
        {
            player.setVelocityX(10);
        }
        else
        {
            player.setVelocityX(0);
        }

        if (this.cursors.up.isDown)
        {
            player.setVelocityY(-10);
        }
        else if (this.cursors.down.isDown)
        {
            player.setVelocityY(10);
        }
        else
        {
            player.setVelocityY(0);
        }
    }

    setPinballToReady(){
        if(this.balls.length > this.nowBallNum){
            this.balls[this.nowBallNum].setPosition(320,500)
        }
    }

    //生成遊戲所有擋板的function，包括分數擋板，放球擋板，射擊柱子，和分隔板子（下面、右邊）
    createWalls(){
        //下面擋板和右邊擋板
        this.matter.add.sprite(140,500,'bottomWall','',{
            isStatic: true
        }); 
        this.matter.add.sprite(270,370,'rightWall','',{
            isStatic: true
        }); 

        for(let x =0;x<6;x++){
            this.matter.add.sprite(5 + x*51,440,'scoreWall','',{
                isStatic: true
            }); 
        }

        //射擊的柱子
        var shootTable = '0 0, 44 0, 44 23, 33 23, 33 91, 10.5 91, 10.5 46, 10.5 23, 0 23, 0 0'
        var shootTablePoly = this.add.polygon(320, 576, shootTable, 0xffffff, 1);
        this.matter.add.gameObject(shootTablePoly, { 
            shape: { type: 'fromVerts', verts: shootTable, flagInternal: true },
            isStatic: true
        }); 

        //放球的地方
        var pinballReadyTable = '0 0, 258 67.808, 258 104, 0 104'
        var pinballReadyTablePoly = this.add.polygon(109, 602, pinballReadyTable, 0xffffff, 1);
        this.matter.add.gameObject(pinballReadyTablePoly, { 
            shape: { type: 'fromVerts', verts: pinballReadyTable, flagInternal: true },
            isStatic: true
        });

    }

    //生成圖釘
    createPins(){
        for(let y=0;y<3; y++){
            for(let x =0;x<5;x++){
                this.matter.add.image(30 + x * 50, 150 + y * 100, 'pin').setBody({
                    type: 'circle',
                    radius: 4,
                }).setStatic(true);
            }
        }
        for(let y=0;y<2; y++){
            for(let x =0;x<4;x++){
                this.matter.add.image(55 + x * 50, 200 + y * 100, 'pin').setBody({
                    type: 'circle',
                    radius: 4,
                }).setStatic(true);
            }
        }
    }

    createPowerBar(){
        this.powerTimer = new TimeBar(this,"")
        this.powerTimer.start()
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics({ x: 10, y: 610 }).setDepth(2);

        this.add.text(16,570, "\n力 道 : ", {
            "fontSize": 16,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })
    }
}
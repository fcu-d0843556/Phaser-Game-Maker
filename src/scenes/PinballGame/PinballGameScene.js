import Phaser from "phaser"
import TimeBar from "./TimeBar"
import Score from "../CommonSystem/Score"


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
        this.load.svg('pinWall','/img/Games/PinballGame/pinWall.svg')
        this.load.svg('pinball','/img/Games/PinballGame/pinball.svg')
        this.load.svg('shootButton','/img/Games/PinballGame/shootButton.svg')





        
    }

    create(){
        this.nowBallNum = 0

        this.matter.world.setGravity(0,0.98).setBounds()

        this.cursors = this.input.keyboard.createCursorKeys();

        



        this.add.image(180,320,'background').setScale(0.57,0.50)
        
        

        for(let x =0;x<10;x++){
            let ball = this.matter.add.image(200 - x * 20, 520, 'pinball').setBody({
                type: 'circle',
                radius: 11,
            },{
                label: 'pinball'
            })
            this.balls.push(ball)
        }
        this.setPinballToReady()

        this.createPins()
        this.createWalls()

        this.createPowerBar()
       

        this.createPowerButton()
        

        
        //判斷是否換球的方塊
        // this.pinballGoal = this.createRectHitBox({x: 0, y: 90, label: 'pinballGoal'}, {x: 130, y: 448}, 'pinWall')

        //判斷是否換球的方塊
        this.pinballGoal1 = this.createRectHitBox({x: 46, y: 90, label: 'pinballGoal1'}, {x: 30, y: 448}, 'pinWall')
        this.pinballGoal2 = this.createRectHitBox({x: 46, y: 90, label: 'pinballGoal2'}, {x: 81, y: 448}, 'pinWall')
        this.pinballGoal3 = this.createRectHitBox({x: 46, y: 90, label: 'pinballGoal3'}, {x: 133, y: 448}, 'pinWall')
        this.pinballGoal4 = this.createRectHitBox({x: 46, y: 90, label: 'pinballGoal4'}, {x: 183, y: 448}, 'pinWall')
        this.pinballGoal5 = this.createRectHitBox({x: 46, y: 90, label: 'pinballGoal5'}, {x: 235, y: 448}, 'pinWall')



        //新球碰到這個hitbox後會開啟時間
        this.shootHitBox = this.createRectHitBox({x: 60, y: 3, label: 'shootHitBox'}, {x: 305, y: 549}, 'pinWall')



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

                    if(detectHitBox.label.includes('pinballGoal') && inObject.label === 'pinball'){
                        console.log('next',this.nowBallNum);
                        this.nowBallNum++
                        this.setPinballToReady()
                    }else if(detectHitBox.label === 'shootHitBox' && inObject.label === 'pinball'){
                        this.powerTimer.restart()
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
            this.graphics.fillRect(0, 0, 170 * this.powerTimer.timerEvent.getProgress(), 20);
        }
    }

    setPinballToReady(){
        if(this.balls.length > this.nowBallNum){
            this.balls[this.nowBallNum].setPosition(305,500)
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
        this.matter.add.sprite(340,370,'rightWall','',{
            isStatic: true
        }); 

        for(let x =0;x<6;x++){
            this.matter.add.sprite(5 + x*51,440,'scoreWall','',{
                isStatic: true
            }); 
        }

        

        //三角形擋板
        var topWall = '140 100, 0 0, 140 0'
        var topWallPoly = this.add.polygon(314, 16, topWall, 0x361500, 1);
        this.matter.add.gameObject(topWallPoly, { 
            shape: { type: 'fromVerts', verts: topWall, flagInternal: true },
            isStatic: true
        }); 




        //射擊的柱子
        var shootTable = '0 0, 44 0, 44 23, 33 23, 33 91, 10.5 91, 10.5 46, 10.5 23, 0 23, 0 0'
        var shootTablePoly = this.add.polygon(304, 576, shootTable, 0x361500, 1);
        this.matter.add.gameObject(shootTablePoly, { 
            shape: { type: 'fromVerts', verts: shootTable, flagInternal: true },
            isStatic: true
        }); 

        //放球的地方
        var pinballReadyTable = '0 0, 258 67.808, 258 104, 0 104'
        var pinballReadyTablePoly = this.add.polygon(109, 602, pinballReadyTable, 0x361500, 1);
        this.matter.add.gameObject(pinballReadyTablePoly, { 
            shape: { type: 'fromVerts', verts: pinballReadyTable, flagInternal: true },
            isStatic: true
        });

    }

    //生成圖釘
    createPins(){

        //畫面的釘子
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

        //三角形擋板下面釘子
        for(let x =0;x<4;x++){
            this.matter.add.image(350 , 85 + x*15, 'pinWall').setBody({
                type: 'circle',
                radius: 6,
            }).setStatic(true);
        }

        //射出的擋板釘子
        for(let x =0;x<2;x++){
            this.matter.add.image(260 + x * 10, 125 + x*7, 'pinWall').setBody({
                type: 'circle',
                radius: 6,
            }).setStatic(true);
        }

        //左上角釘子
        for(let x =0;x<9;x++){
            this.matter.add.image(0 + x * 11, 2 + x*7, 'pinWall').setBody({
                type: 'circle',
                radius: 6,
            }).setStatic(true);
        }
    }

    createPowerBar(){
        this.powerTimer = new TimeBar(this,"")
        this.powerTimer.start()
        this.powerTimer.pause()
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics({ x: 80, y: 610 }).setDepth(2);

        this.add.text(10,595, "\n力 道 : ", {
            "fontSize": 16,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })

        this.createScoreBoard()
        this.scoreText.showScoreText()
    }

    createScoreBoard(){
        //Score
        const scoreTextLabel = this.add.text(10,570, "\n得 分: ", {
            "fontSize": 16,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })
        this.scoreText = new Score(this,scoreTextLabel,"\n得 分",0)
        
    }

    createPowerButton(){
        //射出按鈕
        this.powerButton = this.add.image(305 ,590, 'shootButton').setScale(0.5).setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            // console.log("ok");
            if(this.balls.length > this.nowBallNum && !this.powerTimer.isPause()){
                this.powerTimer.pause()
                let power = this.powerTimer.timerEvent.getProgress() * -45
                // console.log(power);
                if(power > -2){
                    power = -2
                }
                this.balls[this.nowBallNum].setVelocity(0, power);
            }
        }, this);
    }

    createRectHitBox(hitBox, createSpot, imageKey){
        let Bodies = Phaser.Physics.Matter.Matter.Bodies;

        let rect = Bodies.rectangle(0, 0, hitBox.x, hitBox.y, { isSensor: true, label: hitBox.label });

        let compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [ rect ],
            inertia: Infinity
        });

        let newHitBox = this.matter.add.image(0, 0, imageKey).setAlpha(0);;

        newHitBox.setExistingBody(compoundBody);
        newHitBox.setPosition(createSpot.x, createSpot.y)
        newHitBox.setIgnoreGravity(true)

        return newHitBox
    }
}
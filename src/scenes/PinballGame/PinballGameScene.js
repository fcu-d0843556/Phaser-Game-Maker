import Phaser from "phaser"

//Common System Scripts
import Score from "../CommonSystem/Score"
import GameoverMessage from "../CommonSystem/GameOverMessage"

//pinball Game Scripts
import GameTutorial from "./GameTutorial"
import TimeBar from "./TimeBar"

export default class PinballGameScene extends Phaser.Scene{
    constructor(){
        super("Pinball")
        this.balls = []
        this.isGameStart = false
        
    }


    preload(){

        this.modifyDatas = this.scene.settings.data
        // console.log("modifyDatas: ", this.modifyDatas);

        //load image
        Object.keys(this.modifyDatas).forEach((key)=>{
            this.modifyDatas[key].items.forEach((itemObj)=>{
                if( itemObj.img ) {
                    if(this.textures.list[itemObj.name]){
                        // console.log("remove");
                        this.textures.remove(itemObj.name)
                    }
                    // console.log("add", itemObj);
                    this.load.image( itemObj.name, itemObj.img.src )
                }
            })
        })

        this.load.image('startGameLabel','/img/Games/Common/gameover/startGameLabel.png')
        this.load.image('startGameButton', '/img/Games/Common/gameover/startGameButton.png')
        this.load.image('gameoverLabel','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgainButton', '/img/Games/Common/gameover/playAgainButton.png')


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
        this.balls = []
        this.matter.world.setGravity(0,0.98).setBounds()
        this.cursors = this.input.keyboard.createCursorKeys();

    

        //background custom OK.
        const {background} = this.modifyDatas
        this.add.image(background.items[0].img.position.x, background.items[0].img.position.y ,'background').setScale(background.items[0].img.size/100)
        
        
        const {pinball} = this.modifyDatas
        for(let x =0;x<pinball.items[0].text.content;x++){
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

        //判斷是否換球的方塊，並得分
        const {pinballGoal} = this.modifyDatas
        this.pinballGoal1 = this.createRectHitBox({x: 46, y: 80, label: 'pinballGoal1'}, {x: 30, y: 453}, 'pinWall', {score: pinballGoal.items[0].score.content})
        this.pinballGoal2 = this.createRectHitBox({x: 46, y: 80, label: 'pinballGoal2'}, {x: 81, y: 453}, 'pinWall', {score: pinballGoal.items[1].score.content})
        this.pinballGoal3 = this.createRectHitBox({x: 46, y: 80, label: 'pinballGoal3'}, {x: 133, y: 453}, 'pinWall', {score: pinballGoal.items[2].score.content})
        this.pinballGoal4 = this.createRectHitBox({x: 46, y: 80, label: 'pinballGoal4'}, {x: 183, y: 453}, 'pinWall', {score: pinballGoal.items[3].score.content})
        this.pinballGoal5 = this.createRectHitBox({x: 46, y: 80, label: 'pinballGoal5'}, {x: 235, y: 453}, 'pinWall', {score: pinballGoal.items[4].score.content})
        for(let i=0;i< 5;i++){
            let xSpot = 20 + i * 51
            if(pinballGoal.items[i].score.content === null){
                pinballGoal.items[i].score.content = 0
            }
            if(pinballGoal.items[i].score.content.toString().length === 3){
                xSpot -= 5
            }else if(pinballGoal.items[i].score.content.toString().length === 4){
                xSpot -= 10
            }else if(pinballGoal.items[i].score.content.toString().length === 1){
                xSpot += 5
            }
            this.add.text(xSpot,455, `\n${pinballGoal.items[i].score.content}`, {
                "fontSize": 16,
                "fill": "#fff",
                "stroke": "#000",
                "strokeThickness": 2
            })
        }
        


        //新球碰到這個hitbox後會開啟時間
        this.shootHitBox = this.createRectHitBox({x: 60, y: 3, label: 'shootHitBox'}, {x: 305, y: 549}, 'pinWall')

        //gameStart Tutorial
        const {gameTutorialText} = this.modifyDatas
        this.gameTutorialMessage = new GameTutorial(this,gameTutorialText.items[0])
        this.gameTutorialMessage.create()


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
                        this.scoreText.addScore(detectHitBox.gameObject.getData('score'))
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
        if(this.isGameStart){
            this.graphics.clear();
            for (var i = 0; i < 1; i++)
            {
                this.graphics.fillStyle(this.hsv[30].color, 1);
                this.graphics.fillRect(0, 0, 170 * this.powerTimer.timerEvent.getProgress(), 20);
            }
        }
    }

    startGame = () => {
        this.createPowerButton()
    }

    gameover(){
        console.log("gameover!");
        const {gameoverMessage} = this.modifyDatas
        this.gameOver = true
        this.gameoverMessage = new GameoverMessage(this,this.scoreText.getScore(),gameoverMessage.items[0])
        this.gameoverMessage.create()
    }

    setPinballToReady(){
        if(this.balls.length > this.nowBallNum){
            this.balls[this.nowBallNum].setPosition(305,500)
        }else{
            this.gameover()
        }
    }

    //生成遊戲所有擋板的function，包括分數擋板，放球擋板，射擊柱子，和分隔板子（下面、右邊）
    createWalls(){
        //下面擋板和右邊擋板
        this.matter.add.sprite(140,500,'bottomWall','',{
            isStatic: true
        }); 
        this.matter.add.sprite(270,395,'rightWall','',{
            isStatic: true
        }).setScale(1,1.1); ; 
        this.matter.add.sprite(350,340,'rightWall','',{
            isStatic: true
        }).setScale(2,1.3); 

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

    //力量條的顯示
    createPowerBar(){
        const {gameRule} = this.modifyDatas
        this.powerTimer = new TimeBar(this,"", gameRule.items[0].priority.selected)
        this.powerTimer.start()
        this.powerTimer.pause()
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.graphics = this.add.graphics({ x: 80, y: 610 }).setDepth(29);

        this.add.text(10,595, "\n力 道 : ", {
            "fontSize": 16,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        })

        this.createScoreBoard()
        this.scoreText.showScoreText()
    }

    //創建分數板
    createScoreBoard(){
        //Score
        const scoreTextLabel = this.add.text(10,570, "\n得 分: ", {
            "fontSize": 16,
            "fill": "#fff",
            "stroke": "#000",
            "strokeThickness": 2
        }).setDepth(20)
        this.scoreText = new Score(this,scoreTextLabel,"\n得 分",0)
        
    }


    //射出按鈕
    createPowerButton(){
        
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


    //方便建造hitbox的function
    createRectHitBox(hitBox, createSpot, imageKey, datas){
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
        if(datas !== undefined){
            newHitBox.setData('score', datas.score)
        }
        return newHitBox
    }
}
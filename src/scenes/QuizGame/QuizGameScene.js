import Phaser from "phaser"

//Common System Scripts
import Score from "../CommonSystem/Score"
import GameoverMessage from "../CommonSystem/GameOverMessage"
import UsefulMath from "../CommonSystem/UsefulMath";


//Quiz Game Scripts
import GameTutorial from "./GameTutorial"
import ImgControl from "./ImgControl"

export default class QuizGameScene extends Phaser.Scene{
    constructor(){
        super("Quiz")
    }


    preload(){
        this.modifyDatas = this.scene.settings.data
        // console.log("modifyDatas : ", this.modifyDatas)

        //load image
        Object.keys(this.modifyDatas).forEach((key)=>{
            this.modifyDatas[key].items.forEach((itemObj)=>{
                if( itemObj.img ) {
                    if(this.textures.list[itemObj.name]){
                        this.textures.remove(itemObj.name)
                    }
                    this.load.image( itemObj.name, itemObj.img.src )
                }
            })
        })

        this.load.image('startGameLabel','/img/Games/Common/gameover/startGameLabel.png')
        this.load.image('startGameButton', '/img/Games/Common/gameover/startGameButton.png')
        this.load.image('gameoverLabel','/img/Games/Common/gameover/gameoverLabel.png')
        this.load.image('playAgainButton', '/img/Games/Common/gameover/playAgainButton.png')

        this.load.image('correct','/img/Games/QuizGame/correct.png')
        this.load.image('incorrect','/img/Games/QuizGame/incorrect.png')
       
    }

    create(){
        this.questionNumber = 0
        
        this.correct = new ImgControl(this,'correct') 
        this.incorrect = new ImgControl(this,'incorrect')
        
        let scoreStyle = {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: 'black',
            
        }
        const scoreTextLabel = this.add.text(0,0, '得分', scoreStyle)
        this.scoreText = new Score(this,scoreTextLabel,'得分',0)
        this.scoreText.showScoreText()




        const {questions,gameTutorialText} = this.modifyDatas
        this.questions = []
        for(let i=0;i<questions.items.length;i++){
            this.questions.push(questions.items[i])
        }

        const {gameRule} = this.modifyDatas
        if(gameRule.items[0].selection.selected === 'random'){
            const usefulMath = new UsefulMath(this)
            usefulMath.shuffle(this.questions)
        }

        //gameStart Tutorial
        this.gameTutorialMessage = new GameTutorial(this,gameTutorialText.items[0])
        this.gameTutorialMessage.create()
    }

    startGame = () => {
        //create score board
        this.createScoreBoard()
        this.scoreText.showScoreText()

        this.createQuestion(this.questions[this.questionNumber],this.questionNumber+1)        
        
    }

    createScoreBoard(){
        //Score
        const style = {
            fontSize: 24,
            fill: "#fff",
            stroke: "#000",
            backgroundColor: 'white',
            strokeThickness: 2,
            fixedWidth: 360,
            fixedHeight: 55
        }
        const scoreTextLabel = this.add.text(0,-15, "", style).setDepth(20)
        this.scoreText = new Score(this,scoreTextLabel,"\n得分",0)
    }

    createQuestion(item,index){
        let fontSize = item.question.size || 32
        let questionStyle = {
            fontSize: 28,
            fontFamily: 'Arial',
            color: 'white',
            backgroundColor: '#000000',
            fixedWidth: 360,
            fixedHeight: 250,
            wordWrap: { width: 350, useAdvancedWrap: true }
        }

        this.questionText = this.add.text(0,45, `問題 ${index}: \n` + item.question.question,questionStyle)


        let answerStyle = [
            {
                x: 0,
                y: 295,
                backgroundColor: '#43B522',
                text: 'A'
            },{
                x: 185,
                y: 295,
                backgroundColor: '#538CF5',
                text: 'B'
            },{
                x: 0,
                y: 470,
                backgroundColor: '#F5A86C',
                text: 'C'
            },{
                x: 185,
                y: 470,
                backgroundColor: '#7B5FF5',
                text: 'D'
            }
        ]
        let selectionList = []

        const usefulMath = new UsefulMath(this)
        let randomSelections = [...item.question.content]
        usefulMath.shuffle(randomSelections)
        
        for(let i=0;i<4;i++){
            // console.log(item);
            let text = this.add.text(answerStyle[i].x,answerStyle[i].y,answerStyle[i].text + '\n' + randomSelections[i].text ,{
                fontSize: fontSize,
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: answerStyle[i].backgroundColor,
                fixedWidth: 180,
                fixedHeight: 170,
                align: 'center',
                wordWrap: { width: 150, useAdvancedWrap: true }
            })
            text.setData('answer', randomSelections[i].answer)
            text.setData('score',item.score.content)
            text.setInteractive().on('pointerdown',function(){
                // console.log(item.question.content[i]);
                for(let i=0;i<4;i++){
                    selectionList[i].disableInteractive()
                }
                if(text.getData('answer')==='O'){
                    this.correct.setImgVisible(true)
                    this.incorrect.setImgVisible(false)
                    this.scoreText.addScore(text.getData('score'))
                    
                }else if(text.getData('answer')==='X'){
                    this.incorrect.setImgVisible(true)
                    this.correct.setImgVisible(false)
                    this.scoreText.addScore(-text.getData('score'))
                }
                if(this.questions.length > this.questionNumber + 1){
                    this.questionNumber++
                    this.createQuestion(this.questions[this.questionNumber], this.questionNumber+1)  
                }else{
                    this.gameover()
                }
                
            },this)
            selectionList.push(text)
            // text.disableInteractive()
        }
    }

    gameover(){
        const {gameoverMessage} = this.modifyDatas
        
        this.physics.pause()
        this.gameoverMessage = new GameoverMessage(this,this.scoreText.getScore(),gameoverMessage.items[0])
        this.gameoverMessage.create()
    }


    update(){

    }

}
import Phaser from "phaser"

import Score from "../CommonSystem/Score"
import ImgControl from "./ImgControl"

export default class QuizGameScene extends Phaser.Scene{
    constructor(){
        super("Quiz")
    }


    preload(){
        this.modifyDatas = this.scene.settings.data
        console.log("modifyDatas : ", this.modifyDatas)

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
            backgroundColor: 'white',
            fixedWidth: 360,
            fixedHeight: 45
        }
        const scoreTextLabel = this.add.text(0,0, '得分', scoreStyle)
        this.scoreText = new Score(this,scoreTextLabel,'得分',0)
        this.scoreText.showScoreText()




        const {questions} = this.modifyDatas
        this.questions = []
        for(let i=0;i<questions.items.length;i++){
            this.questions.push(questions.items[i].question)
        }
        console.log(this.questions);

        this.createQuestion(this.questions[this.questionNumber],this.questionNumber+1)        
    }

    createQuestion(question,index){
        let questionStyle = {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: 'white',
            backgroundColor: '#000000',
            fixedWidth: 360,
            fixedHeight: 250,
            wordWrap: { width: 350, useAdvancedWrap: true }
        }

        this.questionText = this.add.text(0,45, `問題 ${index}: \n` + question.question,questionStyle)


        let answerStyle = [
            {
                x: 0,
                y: 295,
                backgroundColor: '#43B522',
                text: 'A'
            },{
                x: 185,
                y: 295,
                backgroundColor: '#4DC9DB',
                text: 'B'
            },{
                x: 0,
                y: 470,
                backgroundColor: '#F2C052',
                text: 'C'
            },{
                x: 185,
                y: 470,
                backgroundColor: '#9e66ff',
                text: 'D'
            }
        ]

        for(let i=0;i<4;i++){
            let text = this.add.text(answerStyle[i].x,answerStyle[i].y,answerStyle[i].text + '\n' + question.content[i].text ,{
                fontSize: '32px',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: answerStyle[i].backgroundColor,
                fixedWidth: 180,
                fixedHeight: 170,
                align: 'center',
                wordWrap: { width: 150, useAdvancedWrap: true }
            })
            text.setData('answer', question.content[i].answer)
            text.setInteractive().on('pointerdown',function(){

                if(text.getData('answer')==='O'){
                    this.correct.setImgVisible(true)
                    this.incorrect.setImgVisible(false)
                    this.scoreText.addScore(10)
                    
                }else if(text.getData('answer')==='X'){
                    this.incorrect.setImgVisible(true)
                    this.correct.setImgVisible(false)
                    this.scoreText.addScore(-10)
                }
                if(this.questions.length > this.questionNumber + 1){
                    this.questionNumber++
                    this.createQuestion(this.questions[this.questionNumber], this.questionNumber+1)  
                }else{
                    console.log('gameover');
                }
                
            },this)
        }
    }

    update(){

    }

}
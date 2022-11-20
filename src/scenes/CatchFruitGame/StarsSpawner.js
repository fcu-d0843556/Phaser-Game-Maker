import Phaser from "phaser"

export default class StarsSpawner{
    constructor(scene, stars) {
        this.scene = scene
        this.stars = stars
        this.starPriority = []
        let total = 0
        stars.forEach(star => {
            total += star.priority.selected
            this.starPriority.push(total)
        });        
        this._group = this.scene.physics.add.group()
        this.number = 0
    }

    get group(){
        return this._group
    }
    getNumber(){
        return this.number
    }

    spawn(){
        let x = Phaser.Math.Between(40,300)
        let type
        let ramdomPriority = Phaser.Math.Between(1,this.starPriority[this.starPriority.length - 1])
        for(let i=this.starPriority.length - 1 ;i >= 0;i--){
            if(i === 0){
                type = 1
                break
            }else if(ramdomPriority <= this.starPriority[i] && ramdomPriority > this.starPriority[i - 1]){
                type = (i + 1)
                break
            }
        }

        let stars = this.group.create(x, 10,'star' + type).setGravity(0, 150).setScale(this.stars[type-1].img.size/100);
        
        stars.setData('score',this.stars[type-1].score.content)
        stars.setData('text',this.stars[type-1].text.content)
        this.number++
        return stars
    }
}
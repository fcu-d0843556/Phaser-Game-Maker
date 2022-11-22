import Phaser from 'phaser'

import QuizGameScene from './scenes/QuizGame/QuizGameScene';
import ShootingGameScene from './scenes/ShootingGame/ShootingGameScene';
import PokeGetItemGameScene from './scenes/PokeGetItemGame/PokeGetItemGameScene';
import CatchFruitGameScene from './scenes/CatchFruitGame/CatchFruitGameScene';
import CookingGameScene from './scenes/CookingGame/CookingGameScene';
import PinballGameScene from './scenes/PinballGame/PinballGameScene';

// eslint-disable-next-line import/no-anonymous-default-export
const modifyGameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser-container',
	width:  360, //800
	height: 640, //600
	backgroundColor: '#000111',
	dom: {
		createContainer: true,
	},
	scale:{
		mode:Phaser.Scale.FIT,
	},
	physics: {
		default: 'arcade',
		arcade: {
			// debug: true,
			gravity: { x: 0, y: 0 },
		},
	},
	scene: []
};

const playGameConfig = {
	type: Phaser.AUTO,
	parent: 'phaser-play-screen',
	width:  360, 
	height: 640, 
	backgroundColor: '#000111',
	dom: {
		createContainer: true,
	},
	scale:{
		mode:Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 },
		},
	},
	scene: []
};

const modifyGameConfigMatter = {
	type: Phaser.AUTO,
	parent: 'phaser-container',
	width:  360, //800
	height: 640, //600
	backgroundColor: '#000111',
	dom: {
		createContainer: true,
	},
	scale:{
		mode:Phaser.Scale.FIT,
	},
	physics: {
		default: 'matter',
		matter: {
			// debug: true,
			gravity: { x: 0, y: 0 },
		},
	},
	scene: [],
};

//phaser-play-screen
const playGameConfigMatter = {
	type: Phaser.AUTO,
	parent: 'phaser-play-screen',
	width:  360, 
	height: 640, 
	backgroundColor: '#000111',
	dom: {
		createContainer: true,
	},
	scale:{
		mode:Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'matter',
		matter: {
			gravity: { x: 0, y: 0 },
		},
	},
	scene: []
};



export default function startGame(gameId,gameModifyDatas,type){
	let game;
	if(type === "playGame"){
		switch(gameId){
			case "Quiz":
			case "Shooting":
			case "PokeGetItem":
			case "CatchFruit":
			case "Cooking":
				game = new Phaser.Game(playGameConfig)
				break
			default:
				game = new Phaser.Game(playGameConfigMatter)
				break
		}
	}else if(type === "modifyGame"){
		switch(gameId){
			case "Quiz":
			case "Shooting":
			case "PokeGetItem":
			case "CatchFruit":
			case "Cooking":
				game = new Phaser.Game(modifyGameConfig)
				break
			default:
				game = new Phaser.Game(modifyGameConfigMatter)
				break
		}
	}	
	
	switch(gameId){
		case "Quiz":
			game.scene.add(gameId, new QuizGameScene())
			break
		case "Shooting":
			game.scene.add(gameId, new ShootingGameScene())
			break
		case "PokeGetItem":
			game.scene.add(gameId, new PokeGetItemGameScene())
			break
		case "CatchFruit":
			game.scene.add(gameId, new CatchFruitGameScene())
			break
		case "Cooking":
			game.scene.add(gameId, new CookingGameScene())
			break
		case "Pinball":
			game.scene.add(gameId, new PinballGameScene())
			break
		default:
			console.log("error!");
	}
	game.scene.start(gameId,gameModifyDatas)
	return game
}
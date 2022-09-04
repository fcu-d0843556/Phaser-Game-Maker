import Phaser from 'phaser'

import QuizGameScene from './scenes/QuizGame/QuizGameScene';
import ShootingGameScene from './scenes/ShootingGame/ShootingGameScene';

// eslint-disable-next-line import/no-anonymous-default-export
export const config = {
	type: Phaser.AUTO,
	// type: Phaser.CANVAS,
	parent: 'phaser-container',
	width:  360, //800
	height: 640, //600
	// width:  window.innerWidth * window.devicePixelRatio, //800
	// height: window.innerHeight * window.devicePixelRatio, //600
	backgroundColor: '#000111',
	dom: {
		createContainer: true,
	},
	scale:{
		//autoCenter: Phaser.Scale.CENTER_BOTH,
		// mode:Phaser.Scale.RESIZE,
	},
	physics: {
		default: 'arcade',
		arcade: {
		gravity: { x: 0, y: 0 },

		},
	},
	scene: [QuizGameScene,ShootingGameScene],
	// scene: {
	// 	pack: {
	// 		files: [
	// 			{ type: 'image', key: 'foodCan', url: `src/static/upload/${userPath}/btn_login_hover.png` },
	// 		]
	// 	}
	// }
};

export default function startGame(){
	return new Phaser.Game(config)
}
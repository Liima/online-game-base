import PIXI from 'pixi.js'

import Application from '../Application'
import GameScreen from './GameScreen'


export default class EndGameScreen extends PIXI.Container {

  constructor (options = {}) {
    super()

    let titleText = "Draw game!"

    if (options.draw) {
      titleText = "Draw game!"

    } else if (options.won) {
      titleText = "You win!"

    } else {
      titleText = "You lose"
    }


    this.title = new PIXI.Text(titleText, {
      font: "132px Arial",
      fill: 0x000,
      textAlign: 'center'
    })
    this.title.pivot.x = this.title.width / 2
    this.addChild(this.title)

    this.instructionText = new PIXI.Text("touch to play again", {
      font: "52px Arial",
      fill: 0x000,
      textAlign: 'center'
    })
    this.instructionText.pivot.x = this.instructionText.width / 2
    this.instructionText.pivot.y = this.instructionText.height / 2
    this.addChild(this.instructionText)

    this.interactive = true
    this.once('click', this.startGame.bind(this))
    this.once('touchstart', this.startGame.bind(this))

    this.on('dispose', this.onDispose.bind(this))
  }

  transitionIn () {
    tweener.add(this.title).from({y: this.title.y - 10, alpha: 0}, 300, Tweener.ease.quintOut)
    return tweener.add(this.instructionText).from({ alpha: 0 }, 300, Tweener.ease.quintOut)
  }

  transitionOut () {
    tweener.remove(this.title)
    tweener.remove(this.instructionText)

    tweener.add(this.title).to({y: this.title.y - 10, alpha: 0}, 300, Tweener.ease.quintOut)
    return tweener.add(this.instructionText).to({ alpha: 0 }, 300, Tweener.ease.quintOut)
  }

  startGame () {
    this.emit('goto', GameScreen)
  }

  onResize () {
    this.MARGIN = (Application.WIDTH / 100) * 8 // 5%

    this.title.x = Application.WIDTH / 2;
    this.title.y = this.MARGIN

    this.instructionText.x = Application.WIDTH / 2
    this.instructionText.y = Application.HEIGHT / 2 - this.instructionText.height / 3.8

    this.colyseus.x = Application.WIDTH / 2
    this.colyseus.y = Application.HEIGHT - this.colyseus.height - this.MARGIN
  }

  onDispose () {
  }

}

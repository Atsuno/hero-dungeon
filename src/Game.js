import Promise from 'bluebird'
import Dungeon from './Dungeon'

export default class Game {
  static play() {
    return Promise
      .try(() => Dungeon.login())
      .then(() => Dungeon.playDungeon1())
      .then(() => Dungeon.playDungeon2())
      .then(() => Dungeon.playDungeon3())
  }
}


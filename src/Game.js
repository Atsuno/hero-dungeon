 import Promise from 'bluebird'
import Dungeon from './Dungeon'

export default class Game {
  static play() {
    return Promise
      .try(() => Dungeon.login())
  }
}


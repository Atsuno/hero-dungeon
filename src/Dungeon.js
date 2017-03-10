import Promise from 'bluebird'
import Server from './Server'

export default class Dungeon {

  static login() {
    return Promise
      .try(() => Server.connect())
      .catch(error => {
        if (error.message.includes('server')) {
          return { hp: 1000, item: {}, gold: 0 }
        }
        throw error
      })
  }

  static logOut() {
    return Promise
      .try(() => Server.disConnect())
      .catch(error => {
        if (error.message.includes('server error')) {
          return 'fulfilled'
        }
        throw error
      })
  }

  static playDungeon1(hero) {
    const hero1 = hero
    return hero1
  }
}


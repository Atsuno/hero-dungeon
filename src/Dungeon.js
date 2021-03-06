import Promise from 'bluebird'
import Server from './Server'
import Hero from './Hero'


export default class Dungeon {

  static login() {
    return Promise
      .try(() => Server.connect())
      .then(() => ({ hp: 1000, item: {}, gold: 0 }))
      .catch(() => ({ hp: 1000, item: {}, gold: 0 }))
  }

  static logout() {
    return Promise
      .try(() => Server.disconnect())
      .then(success => {
        if (!success) {
          throw new Error('server error')
        }
        return true
      })
      .catch(error => {
        if (error.message.includes('server error')) {
          return true
        }
        throw error
      })
  }

  static playDungeon1(hero) {
    const reward = { hp: -200, item: { chestbox: 1 }, gold: 2 }
    return Hero.reward(hero, reward)
  }

  static playDungeon2(hero) {
    const reward = { hp: 0, item: { chestbox: 1, sword: 1 }, gold: 3 }
    return Hero.reward(hero, reward)
  }

  static playDungeon3(hero) {
    const reward = { hp: 0, item: { steel: 5 }, gold: 10 }
    return Hero.reward(hero, reward)
  }
}


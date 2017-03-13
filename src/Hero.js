export default class Hero {

  static born() {
    return { hp: 1000, item: {}, gold: 0 }
  }

  static reward(hero, reward) {
    return {
      hp: hero.hp + reward.hp,
      item: this.combineItem(hero.item, reward.item),
      gold: hero.gold + reward.gold,
    }
  }

  static combineItem(heroItem, rewardItem) {
    const recieveItem = {
      ...heroItem,
      ...rewardItem,
    }
    Object.keys(recieveItem).forEach(item => {
      if (heroItem[item] && rewardItem[item]) {
        recieveItem[item] = heroItem[item] + rewardItem[item]
      }
    })
    return recieveItem
  }
}

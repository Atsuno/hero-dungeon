export default class Hero {
  static born() {
    return { hp: 1000, item: {}, gold: 0 }
  }

  static reward(hero, reward) {
    return {
      hp: hero.hp + reward.hp,
      gold: hero.gold + reward.gold,
      item: this.combineItem(hero.item, reward.item),
    }
  }
  static combineItem(heroItem, rewardItem) {
    const reviceItem = { ...heroItem, ...rewardItem }
    Object.keys(reviceItem).forEach(item => {
      if (heroItem[item] && rewardItem[item]) {
        reviceItem[item] = heroItem[item] + rewardItem[item]
      }
    })
    return reviceItem
  }
}

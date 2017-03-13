/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Hero from '../src/Hero'

describe('Hero', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('born()', function () {
    it('should be hero born hp, item, gold ', function () {
      return expect(Hero.born())
        .to.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })

  describe('reward()', function () {
    it('should be hero reward inside dungeon hp: 1800, item: chestbox: 1, gold: 10', function () {
      const hero = { hp: 2000, item: {}, gold: 5 }
      const reward = { hp: -200, item: { chestbox: 1 }, gold: 5 }

      return expect(Hero.reward(hero, reward))
        .to.eqls({ hp: 1800, item: { chestbox: 1 }, gold: 10 })
    })

    it('should be hero reward inside dungeon hp: 1600, item:  chestbox: 3, gold: 20', function () {
      const hero = { hp: 1800, item: { chestbox: 2 }, gold: 5 }
      const reward = { hp: -200, item: { chestbox: 1 }, gold: 15 }

      return expect(Hero.reward(hero, reward))
        .to.eqls({ hp: 1600, item: { chestbox: 3 }, gold: 20 })
    })

    it('should be hero reward inside dungeon hp: 1800, item: chestbox: 3, sword: 2, gold: 5', function () {
      const hero = { hp: 1800, item: { chestbox: 2, sword: 2 }, gold: 5 }
      const reward = { hp: 0, item: { chestbox: 1 }, gold: 0 }

      return expect(Hero.reward(hero, reward))
        .to.eqls({ hp: 1800, item: { chestbox: 3, sword: 2 }, gold: 5 })
    })
  })

  describe('combineItem()', function () {
    it('should be combineitem chestbo = 2 ', function () {
      const heroItem = { chestbox: 1 }
      const rewardItem = { chestbox: 1 }

      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ chestbox: 2 })
    })

    it('should be combineitem chestbo = 1 and sword = 1  ', function () {
      const heroItem = { chestbox: 1 }
      const rewardItem = { sword: 1 }

      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ chestbox: 1, sword: 1 })
    })
  })
})

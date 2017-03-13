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
      const stubCombineItem = this.sinon.stub(Hero, 'combineItem').returns({ chestbox: 1 })

      const hero = { hp: 2000, item: {}, gold: 5 }
      const reward = { hp: -200, item: { chestbox: 1 }, gold: 5 }

      return expect(Hero.reward(hero, reward))
        .to.eqls({ hp: 1800, item: { chestbox: 1 }, gold: 10 })
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubCombineItem)
        ) == null)
    })

    it('should be hero reward inside dungeon hp: 1600, item:  chestbox: 3, gold: 20', function () {
      const stubCombineItem = this.sinon.stub(Hero, 'combineItem').returns({ chestbox: 3 })

      const hero = { hp: 1800, item: { chestbox: 2 }, gold: 5 }
      const reward = { hp: -200, item: { chestbox: 1 }, gold: 15 }

      return expect(Hero.reward(hero, reward))
        .to.eqls({ hp: 1600, item: { chestbox: 3 }, gold: 20 })
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubCombineItem)
        ) == null)
    })

    it('should be hero reward inside dungeon hp: 1800, item: chestbox: 3, sword: 2, gold: 5', function () {
      const stubCombineItem = this.sinon.stub(Hero, 'combineItem').returns({ chestbox: 3, sword: 2 })

      const hero = { hp: 1800, item: { chestbox: 2, sword: 2 }, gold: 5 }
      const reward = { hp: 0, item: { chestbox: 1 }, gold: 0 }

      return expect(Hero.reward(hero, reward))
        .to.eqls({ hp: 1800, item: { chestbox: 3, sword: 2 }, gold: 5 })
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubCombineItem)
        ) == null)
    })
  })

  describe('combineItem()', function () {
    it('should be empty when both empty', function () {
      const heroItem = {}
      const rewardItem = {}
      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({})
    })

    it('should be still have item even reward empty ', function () {
      const heroItem = { item: 1 }
      const rewardItem = {}
      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ item: 1 })
    })

    it('should be add new item even hero empty', function () {
      const heroItem = {}
      const rewardItem = { item: 1 }
      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ item: 1 })
    })

    it('should be have both of item', function () {
      const heroItem = { item: 1 }
      const rewardItem = { item2: 1 }
      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ item: 1, item2: 1 })
    })

    it('should be combine both of item', function () {
      const heroItem = { item: 1 }
      const rewardItem = { item: 1 }
      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ item: 2 })
    })

    it('should be combine, still have , add new item', function () {
      const heroItem = { item: 1, item2: 1 }
      const rewardItem = { item: 1, item3: 1 }
      return expect(Hero.combineItem(heroItem, rewardItem))
        .to.eqls({ item: 2, item2: 1, item3: 1 })
    })
  })
})

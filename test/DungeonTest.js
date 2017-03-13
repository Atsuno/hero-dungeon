/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import ChaiAsPromised from 'chai-as-promised'
import Dungeon from '../src/Dungeon'
import Server from '../src/Server'

chai.use(ChaiAsPromised)

describe('Dungeon', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('login()', function () {
    it('should be true is show status hero', function () {
      this.sinon.stub(Server, 'connect').returns(true)

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })

    it('should be false if show status hero', function () {
      this.sinon.stub(Server, 'connect').returns(false)

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })

    it('should be throw error server is show status hero', function () {
      this.sinon.stub(Server, 'connect').throws(new Error('server error'))

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })

    it('should be throw server down is show status hero', function () {
      this.sinon.stub(Server, 'connect').throws(new Error('server down'))

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })

  describe('logout()', function () {
    it('should be true is true', function () {
      this.sinon.stub(Server, 'disconnect').returns(true)

      return expect(Dungeon.logout())
        .to.eventually.be.fulfilled
        .and.that.equal(true)
    })

    it('should be false is throw server error', function () {
      this.sinon.stub(Server, 'disconnect').returns(false)

      return expect(Dungeon.logout())
        .to.eventually.be.fulfilled
        .and.to.be.true
    })

    it('should be throw server error is fulfilled', function () {
      this.sinon.stub(Server, 'disconnect').throws(new Error('server error'))

      return expect(Dungeon.logout())
        .to.eventually.be.fulfilled
        .and.that.equal(true)
    })

    it('should be throw server down is reject server down', function () {
      this.sinon.stub(Server, 'disconnect').throws(new Error('server down'))

      return expect(Dungeon.logout())
        .to.eventually.rejectedWith('server down')
    })
  })
  describe('playDungeon1()', function () {
    it('should be hero hp reduce 200', function () {
      const hero = { hp: 1000, item: {}, gold: 0 }

      return expect(Dungeon.playDungeon1(hero))
        .and.satisfy(expectHero => expect(expectHero.hp).to.be.equal(800))
    })

    it('should be hero gold incress 2 ', function () {
      const hero = { hp: 1000, item: {}, gold: 0 }

      return expect(Dungeon.playDungeon1(hero))
        .and.satisfy(expectHero => expect(expectHero.gold).to.be.equal(2))
    })

    it('should be hero item incress chestbox 1 ', function () {
      const hero = { hp: 1000, item: {}, gold: 0 }

      return expect(Dungeon.playDungeon1(hero))
        .and.satisfy(expectHero => expect(expectHero.item).to.be.eqls({ chestbox: 1 }))
    })

    it('should be hero { hp: 800, item: { chestbox: 1 }, gold: 2 } ', function () {
      const hero = { hp: 1000, item: {}, gold: 0 }
      const expectHero = { hp: 800, item: { chestbox: 1 }, gold: 2 }

      return expect(Dungeon.playDungeon1(hero))
        .to.be.eqls(expectHero)
    })
  })

  describe('playDungeon2()', function () {
    it('should be hero hp same before', function () {
      const expectHero = { hp: 800, item: { chestbox: 0 }, gold: 2 }

      return expect(Dungeon.playDungeon2(expectHero))
        .and.satisfy(expectHero2 => expect(expectHero2.hp).to.be.equal(800))
    })

    it('should be hero hp same before', function () {
      const expectHero = { hp: 800, item: { chestbox: 1 }, gold: 2 }

      return expect(Dungeon.playDungeon2(expectHero))
        .and.satisfy(expectHero2 => expect(expectHero2.hp).to.be.equal(800))
    })

    it('should be hero gold incress 5', function () {
      const expectHero = { hp: 800, item: { chestbox: 1 }, gold: 2 }

      return expect(Dungeon.playDungeon2(expectHero))
        .and.satisfy(expectHero2 => expect(expectHero2.gold).to.be.equal(5))
    })

    it('should be hero item incress chestbox 2 and sword 1', function () {
      const expectHero = { hp: 800, item: { chestbox: 1 }, gold: 2 }

      return expect(Dungeon.playDungeon2(expectHero))
        .and.satisfy(expectHero2 => expect(expectHero2.item).to.be.eqls({ chestbox: 2, sword: 1 }))
    })

    it('should be hero { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }', function () {
      const expectHero = { hp: 800, item: { chestbox: 1 }, gold: 2 }
      const expectHero2 = { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }

      return expect(Dungeon.playDungeon2(expectHero))
        .to.be.eqls(expectHero2)
    })
  })

  describe('playDungeon3()', function () {
    it('should be hero hp same before', function () {
      const expectHero2 = { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }

      return expect(Dungeon.playDungeon3(expectHero2))
        .and.satisfy(expectHero3 => expect(expectHero3.hp).to.be.equal(800))
    })

    it('should be hero gold incress 15', function () {
      const expectHero2 = { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }

      return expect(Dungeon.playDungeon3(expectHero2))
        .and.satisfy(expectHero3 => expect(expectHero3.gold).to.be.equal(15))
    })

    it('should be hero item chestbox 2 sword 1 incress steel 5', function () {
      const expectHero2 = { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }

      return expect(Dungeon.playDungeon3(expectHero2))
        .and.satisfy(expectHero3 => expect(expectHero3.item).to.be.eqls({ chestbox: 2, sword: 1, steel: 5 }))
    })

    it('should be hero { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }', function () {
      const expectHero2 = { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }
      const expectHeor3 = { hp: 800, item: { chestbox: 2, sword: 1, steel: 5 }, gold: 15 }

      return expect(Dungeon.playDungeon3(expectHero2))
        .to.be.eqls(expectHeor3)
    })
  })

  describe('playDungeon0()', function () {
    it('should be hero { hp: 800, item: { chestbox: 1 }, gold: 2 } ', function () {
      const expectHero = { gold: 2, hp: 800, item: { chestbox: 1 } }

      return expect(Dungeon.playDungeon0())
        .to.be.eqls(expectHero)
    })
  })
})

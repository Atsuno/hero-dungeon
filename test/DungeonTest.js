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
    it('should be catch but resolve 0', function () {
      this.sinon.stub(Server, 'connect').returns(Promise.resolve({ hp: 1000, item: {}, gold: 0 }))

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })

  describe('playDungeon1()', function () {
    it('should be catch but resolve 0', function () {
      return expect(Dungeon.playDungeon1({ hp: 1000, item: {}, gold: 0 }))
        .to.be.eqls({ hp: 800, item: { chestbox: 1 }, gold: 2 })
    })
  })
})

/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import ChaiAsPromised from 'chai-as-promised'
import Game from '../src/Game'
import Dungeon from '../src/Dungeon'

chai.use(ChaiAsPromised)

describe('Game', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('play()', function () {
    it('should be server reject and server down ', function () {
      this.sinon.stub(Dungeon, 'login').throws(new Error('server down'))
      return expect(Game.play())
        .to.eventually.rejectedWith('server down')
    })

    it('should be spy 1 round ', function () {
      const stubLogin = this.sinon.stub(Dungeon, 'login')
      const stubPlayDungeon1 = this.sinon.stub(Dungeon, 'playDungeon1')
      const stubPlayDungeon2 = this.sinon.stub(Dungeon, 'playDungeon2')
      const stubPlayDungeon3 = this.sinon.stub(Dungeon, 'playDungeon3')

      return expect(Game.play())
        .to.eventually.fulfilled
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubLogin),
          sinon.assert.calledOnce(stubPlayDungeon1),
          sinon.assert.calledOnce(stubPlayDungeon2),
          sinon.assert.calledOnce(stubPlayDungeon3)
        ) == null)
    })
  })
})


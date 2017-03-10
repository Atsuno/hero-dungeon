/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Server from '../src/Server'

describe('Server', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('connect()', function () {
    it('should be true is show status hero', function () {
      return expect(Server.connect(true))
        .to.eqls({ hp: 1000, item: {}, gold: 0 })
    })

    it('should be reject is thow server down', function () {
      return expect(function () {
        Server.connect(false)
      })
        .to.throw(/server down/)
    })
  })

  describe('disConnect()', function () {
    it('should be true is Successful', function () {
      return expect(Server.disConnect(true))
        .to.eqls('Successful')
    })

    it('should be reject is thow server down', function () {
      return expect(function () {
        Server.disConnect(false)
      })
        .to.throw(/server error/)
    })
  })
})

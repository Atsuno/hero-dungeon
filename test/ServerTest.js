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
    it('should be true is true', function () {
      return expect(Server.connect(true))
        .to.equal(true)
    })

    it('should be true is true', function () {
      return expect(Server.connect(false))
        .to.equal(true)
    })
  })

  describe('disconnect()', function () {
    it('should be true is true', function () {
      return expect(Server.disconnect(true))
        .to.equal(true)
    })

    it('should be true is true', function () {
      return expect(Server.disconnect(false))
        .to.equal(true)
    })
  })
})

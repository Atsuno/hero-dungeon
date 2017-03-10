export default class Server {
  static connect(serverLogin) {
    if (serverLogin === true) {
      return { hp: 1000, item: {}, gold: 0 }
    }
    throw new Error('server down')
  }
  static disConnect(serverLogOut) {
    if (serverLogOut === true) {
      return true
    }
    throw new Error('server error')
  }
}


import config from './config.json'

export default {
  name: 'ItemList',
  data() {
    return {
      items: config.artists,
    }
  }
}

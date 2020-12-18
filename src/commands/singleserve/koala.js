const APICommand = require('../../apiCommand');

module.exports = class Koala extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'koala',
      url: 'https://some-random-api.ml/img/koala',
      credit: 'some-random-api.ml',
      emoji: '🐨'
    });
  }
}

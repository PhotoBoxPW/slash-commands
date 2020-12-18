const APICommand = require('../../apiCommand');

module.exports = class Panda extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'panda',
      url: 'https://some-random-api.ml/img/panda',
      credit: 'some-random-api.ml',
      emoji: '🐼'
    });
  }
}

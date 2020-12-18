const APICommand = require('../../apiCommand');

module.exports = class Hug extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'hug',
      description: '*hug*',
      url: 'https://some-random-api.ml/animu/hug',
      credit: 'some-random-api.ml'
    });
  }
}

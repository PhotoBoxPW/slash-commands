const APICommand = require('../../apiCommand');

module.exports = class Pikachu extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'pikachu',
      description: 'Get a random picture of the pokémon Pikachu.',
      url: 'https://some-random-api.ml/img/pikachu',
      credit: 'some-random-api.ml'
    });
  }
}

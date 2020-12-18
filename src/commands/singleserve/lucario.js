const APICommand = require('../../apiCommand');

module.exports = class Lucario extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'lucario',
      description: 'Get a random picture of the pokémon Lucario.',
      url: 'http://pics.floofybot.moe/image?token=lucario&category=sfw'
    });
  }
}

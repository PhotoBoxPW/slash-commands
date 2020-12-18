const APICommand = require('../../apiCommand');

module.exports = class Lizard extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'lizard',
      url: 'https://nekos.life/api/v2/img/lizard',
      emoji: '🦎'
    });
  }
}

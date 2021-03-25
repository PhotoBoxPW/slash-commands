const APICommand = require('../../apiCommand');

module.exports = class Bunny extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'bunny',
      url: 'https://hi.snaz.in/api/v1/bunnies/random.json',
      credit: 'hi.snaz.in & bunnies.media',
      emoji: '🐰'
    });
  }
}

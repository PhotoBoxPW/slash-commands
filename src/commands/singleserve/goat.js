const APICommand = require('../../apiCommand');

module.exports = class Goat extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'goat',
      url: 'https://hi.snaz.in/api/v1/goat/random.json',
      credit: 'hi.snaz.in',
      emoji: '🐐'
    });
  }
}

const APICommand = require('../../apiCommand');

module.exports = class Snake extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'snake',
      url: 'https://hi.snaz.in/api/v1/snek/random.json',
      credit: 'hi.snaz.in',
      emoji: '🐍'
    });
  }
}

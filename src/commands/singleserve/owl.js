const APICommand = require('../../apiCommand');

module.exports = class Owl extends APICommand {
  constructor(creator) {
    super(creator, {
      name: 'owl',
      url: 'http://pics.floofybot.moe/owl',
      emoji: '🦉'
    });
  }
}
